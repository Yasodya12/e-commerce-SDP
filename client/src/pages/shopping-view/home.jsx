import { Button } from "@/components/ui/button";
import {
    BabyIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    Footprints,
    Sparkles,
    ShirtIcon,
    WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchAllFilteredProducts,
    fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
    {
        id: "men",
        label: "Men",
        icon: ShirtIcon,
        image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "women",
        label: "Women",
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "kids",
        label: "Kids",
        icon: BabyIcon,
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "accessories",
        label: "Accessories",
        icon: WatchIcon,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "footwear",
        label: "Footwear",
        icon: Footprints,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    },
];

const brandsWithIcon = [
    {
        id: "nike",
        label: "Nike",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nike.svg",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "adidas",
        label: "Adidas",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/adidas.svg",
        image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "puma",
        label: "Puma",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/puma.svg",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "levi",
        label: "Levi's",
        logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Levi%27s_logo.svg",
        image: "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "zara",
        label: "Zara",
        logo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/zara.svg",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "h&m",
        label: "H&M",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg",
        image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80",
    },
];
function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const featuredProductsRef = useRef(null);
    const { productList, productDetails } = useSelector(
        (state) => state.shopProducts,
    );
    const { featureImageList } = useSelector((state) => state.commonFeature);

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const { user } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    function handleNavigateToListingPage(getCurrentItem, section) {
        sessionStorage.removeItem("filters");
        const currentFilter = {
            [section]: [getCurrentItem.id],
        };

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));
        navigate(`/shop/listing`);
    }

    function handleGetProductDetails(getCurrentProductId) {
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    function handleAddtoCart(getCurrentProductId) {
        dispatch(
            addToCart({
                userId: user?.id,
                productId: getCurrentProductId,
                quantity: 1,
            }),
        ).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchCartItems(user?.id));
                toast({
                    title: "Product is added to cart",
                });
            }
        });
    }

    function scrollFeaturedProducts(direction) {
        if (!featuredProductsRef.current) return;

        featuredProductsRef.current.scrollBy({
            left: direction * 420,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(
                (prevSlide) => (prevSlide + 1) % featureImageList.length,
            );
        }, 15000);

        return () => clearInterval(timer);
    }, [featureImageList]);

    useEffect(() => {
        dispatch(
            fetchAllFilteredProducts({
                filterParams: {},
                sortParams: "price-lowtohigh",
            }),
        );
    }, [dispatch]);

    console.log(productList, "productList");

    useEffect(() => {
        dispatch(getFeatureImages());
    }, [dispatch]);

    return (
        <div className="fade-up flex min-h-screen flex-col gap-12">
            <div className="relative h-[420px] w-full overflow-hidden rounded-3xl border shadow-2xl sm:h-[560px]">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/45 to-black/10" />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                {featureImageList && featureImageList.length > 0
                    ? featureImageList.map((slide, index) => (
                          <img
                              src={slide?.image}
                              key={index}
                              className={`${
                                  index === currentSlide
                                      ? "opacity-100"
                                      : "opacity-0"
                              } absolute left-0 top-0 h-full w-full scale-[1.03] object-cover transition-opacity duration-700`}
                          />
                      ))
                    : null}
                <div className="absolute bottom-6 left-6 z-20 w-[calc(100%-3rem)] max-w-3xl text-white sm:bottom-10 sm:left-10 sm:w-[calc(100%-5rem)]">
                    <p className="inline-flex rounded-full border border-white/35 bg-black/25 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white/95 backdrop-blur-sm">
                        New Season Drop
                    </p>
                    <h1 className="mt-4 text-4xl leading-tight sm:text-6xl md:text-7xl">
                        Dress bold. Move easy. Own every room.
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm font-medium text-white/90 sm:text-lg">
                        Explore clean silhouettes, comfort-first fits, and
                        accessories that elevate your look instantly.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                            onClick={() => navigate("/shop/listing")}
                            className="h-11 rounded-full bg-accent px-6 text-sm font-bold text-accent-foreground hover:bg-accent/90"
                        >
                            Shop Collection
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => navigate("/shop/search")}
                            className="h-11 rounded-full border-white/55 bg-white/12 px-6 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-black"
                        >
                            Explore Trends
                        </Button>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide(
                            (prevSlide) =>
                                (prevSlide - 1 + featureImageList.length) %
                                featureImageList.length,
                        )
                    }
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border-0 bg-white/90"
                >
                    <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        setCurrentSlide(
                            (prevSlide) =>
                                (prevSlide + 1) % featureImageList.length,
                        )
                    }
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border-0 bg-white/90"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>
            <section className="relative">
                <div className="relative mx-auto">
                    <h2 className="mb-8 text-center text-3xl">
                        Shop by category
                    </h2>
                    <div className="stagger grid grid-cols-2 gap-4 md:grid-cols-6">
                        {categoriesWithIcon.map((categoryItem, index) => (
                            <Card
                                key={categoryItem.id}
                                onClick={() =>
                                    handleNavigateToListingPage(
                                        categoryItem,
                                        "category",
                                    )
                                }
                                className={`cursor-pointer border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/45 hover:bg-white/20 hover:shadow-2xl ${
                                    index === 0
                                        ? "md:col-span-3"
                                        : index === 1
                                          ? "md:col-span-3"
                                          : "md:col-span-2"
                                } overflow-hidden rounded-3xl`}
                            >
                                <CardContent className="relative flex min-h-[140px] flex-col items-start justify-end overflow-hidden rounded-3xl p-6 md:min-h-[180px]">
                                    <img
                                        src={categoryItem.image}
                                        alt={categoryItem.label}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
                                    <div className="relative mb-4 rounded-full bg-white/15 p-2.5 backdrop-blur-sm">
                                        <categoryItem.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <span className="relative text-lg font-bold tracking-tight text-white">
                                        {categoryItem.label}
                                    </span>
                                    <span className="relative mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                                        Explore Now
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-2">
                <div className="mx-auto px-1">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <h2 className="text-3xl">Featured Products</h2>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scrollFeaturedProducts(-1)}
                                className="rounded-full border-primary/30"
                            >
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => scrollFeaturedProducts(1)}
                                className="rounded-full border-primary/30"
                            >
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div
                        ref={featuredProductsRef}
                        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {productList && productList.length > 0
                            ? productList.map((productItem) => (
                                  <div
                                      key={productItem._id}
                                      className="w-[320px] shrink-0 snap-start sm:w-[360px]"
                                  >
                                      <ShoppingProductTile
                                          handleGetProductDetails={
                                              handleGetProductDetails
                                          }
                                          product={productItem}
                                          handleAddtoCart={handleAddtoCart}
                                          variant="featured"
                                      />
                                  </div>
                              ))
                            : null}
                    </div>
                </div>
            </section>

            <section className="relative">
                <div className="relative mx-auto">
                    <h2 className="mb-8 text-center text-3xl">Shop by Brand</h2>
                    <div className="stagger grid grid-cols-2 gap-4 md:grid-cols-6">
                        {brandsWithIcon.map((brandItem) => (
                            <Card
                                key={brandItem.id}
                                onClick={() =>
                                    handleNavigateToListingPage(
                                        brandItem,
                                        "brand",
                                    )
                                }
                                className="cursor-pointer border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/45 hover:bg-white/20 hover:shadow-2xl md:col-span-2 overflow-hidden rounded-3xl"
                            >
                                <CardContent className="relative flex min-h-[140px] flex-col items-start justify-end overflow-hidden rounded-3xl p-6 md:min-h-[180px]">
                                    <img
                                        src={brandItem.image}
                                        alt={brandItem.label}
                                        className="absolute inset-0 h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/10" />
                                    <div className="relative mb-4 rounded-full bg-white/90 p-2.5 backdrop-blur-sm">
                                        <img
                                            src={brandItem.logo}
                                            alt={`${brandItem.label} logo`}
                                            className="h-7 w-7 object-contain"
                                        />
                                    </div>
                                    <span className="relative text-lg font-bold tracking-tight text-white">
                                        {brandItem.label}
                                    </span>
                                    <span className="relative mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
                                        Explore Now
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default ShoppingHome;
