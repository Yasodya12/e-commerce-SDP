import { Button } from "@/components/ui/button";
import {
    Airplay,
    BabyIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CloudLightning,
    Heater,
    Images,
    Shirt,
    ShirtIcon,
    ShoppingBasket,
    UmbrellaIcon,
    WashingMachine,
    WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
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
    { id: "men", label: "Men", icon: ShirtIcon },
    { id: "women", label: "Women", icon: CloudLightning },
    { id: "kids", label: "Kids", icon: BabyIcon },
    { id: "accessories", label: "Accessories", icon: WatchIcon },
    { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
    { id: "nike", label: "Nike", icon: Shirt },
    { id: "adidas", label: "Adidas", icon: WashingMachine },
    { id: "puma", label: "Puma", icon: ShoppingBasket },
    { id: "levi", label: "Levi's", icon: Airplay },
    { id: "zara", label: "Zara", icon: Images },
    { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
    const [currentSlide, setCurrentSlide] = useState(0);
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
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                {featureImageList && featureImageList.length > 0
                    ? featureImageList.map((slide, index) => (
                          <img
                              src={slide?.image}
                              key={index}
                              className={`${
                                  index === currentSlide
                                      ? "opacity-100"
                                      : "opacity-0"
                              } absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-700`}
                          />
                      ))
                    : null}
                <div className="absolute bottom-6 left-6 z-20 max-w-lg text-white sm:bottom-10 sm:left-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/90">
                        New Season Drop
                    </p>
                    <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
                        Crafted essentials for every day and every mood.
                    </h1>
                    <p className="mt-3 text-sm text-white/85 sm:text-base">
                        Explore clean silhouettes, comfort-first fits, and
                        accessories that elevate your look instantly.
                    </p>
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
                    className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85"
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
                    className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/85"
                >
                    <ChevronRightIcon className="w-4 h-4" />
                </Button>
            </div>
            <section className="glass-panel p-6 sm:p-8">
                <div className="mx-auto px-1">
                    <h2 className="mb-8 text-3xl text-center">
                        Shop by category
                    </h2>
                    <div className="stagger grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                        {categoriesWithIcon.map((categoryItem) => (
                            <Card
                                key={categoryItem.id}
                                onClick={() =>
                                    handleNavigateToListingPage(
                                        categoryItem,
                                        "category",
                                    )
                                }
                                className="cursor-pointer border-0 bg-secondary/70 transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <categoryItem.icon className="mb-4 h-12 w-12 text-primary" />
                                    <span className="font-semibold">
                                        {categoryItem.label}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="glass-panel p-6 sm:p-8">
                <div className="mx-auto px-1">
                    <h2 className="mb-8 text-center text-3xl">Shop by Brand</h2>
                    <div className="stagger grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                        {brandsWithIcon.map((brandItem) => (
                            <Card
                                key={brandItem.id}
                                onClick={() =>
                                    handleNavigateToListingPage(
                                        brandItem,
                                        "brand",
                                    )
                                }
                                className="cursor-pointer border-0 bg-secondary/70 transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    <brandItem.icon className="mb-4 h-12 w-12 text-primary" />
                                    <span className="font-semibold">
                                        {brandItem.label}
                                    </span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-2">
                <div className="mx-auto px-1">
                    <h2 className="mb-8 text-center text-3xl">
                        Feature Products
                    </h2>
                    <div className="stagger grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {productList && productList.length > 0
                            ? productList.map((productItem) => (
                                  <ShoppingProductTile
                                      key={productItem._id}
                                      handleGetProductDetails={
                                          handleGetProductDetails
                                      }
                                      product={productItem}
                                      handleAddtoCart={handleAddtoCart}
                                  />
                              ))
                            : null}
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
