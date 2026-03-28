import ProductDetailsDialog from "@/components/shopping-view/product-details";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { fetchProductDetails } from "@/store/shop/products-slice";
import {
    getSearchResults,
    resetSearchResults,
} from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function SearchProducts() {
    const [keyword, setKeyword] = useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { searchResults } = useSelector((state) => state.shopSearch);
    const { productDetails } = useSelector((state) => state.shopProducts);

    const { user } = useSelector((state) => state.auth);

    const { cartItems } = useSelector((state) => state.shopCart);
    const { toast } = useToast();
    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
            setTimeout(() => {
                setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);
        } else {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(resetSearchResults());
        }
    }, [keyword]);

    function handleAddtoCart(getCurrentProductId, getTotalStock) {
        console.log(cartItems);
        let getCartItems = cartItems.items || [];

        if (getCartItems.length) {
            const indexOfCurrentItem = getCartItems.findIndex(
                (item) => item.productId === getCurrentProductId,
            );
            if (indexOfCurrentItem > -1) {
                const getQuantity = getCartItems[indexOfCurrentItem].quantity;
                if (getQuantity + 1 > getTotalStock) {
                    toast({
                        title: `Only ${getQuantity} quantity can be added for this item`,
                        variant: "destructive",
                    });

                    return;
                }
            }
        }

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

    function handleGetProductDetails(getCurrentProductId) {
        console.log(getCurrentProductId);
        dispatch(fetchProductDetails(getCurrentProductId));
    }

    useEffect(() => {
        if (productDetails !== null) setOpenDetailsDialog(true);
    }, [productDetails]);

    console.log(searchResults, "searchResults");

    return (
        <div className="fade-up mx-auto w-full px-1 py-2">
            <div className="glass-panel mb-8 flex justify-center p-4 sm:p-6">
                <div className="flex w-full max-w-4xl items-center">
                    <Input
                        value={keyword}
                        name="keyword"
                        onChange={(event) => setKeyword(event.target.value)}
                        className="h-12 rounded-xl border-primary/30 bg-white"
                        placeholder="Search Products..."
                    />
                </div>
            </div>
            {!searchResults.length ? (
                <div className="glass-panel py-12 text-center">
                    <h1 className="text-4xl">No result found</h1>
                    <p className="mt-3 text-muted-foreground">
                        Try a different keyword with at least 4 characters.
                    </p>
                </div>
            ) : null}
            <div className="stagger grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {searchResults.map((item) => (
                    <ShoppingProductTile
                        key={item._id}
                        handleAddtoCart={handleAddtoCart}
                        product={item}
                        handleGetProductDetails={handleGetProductDetails}
                    />
                ))}
            </div>
            <ProductDetailsDialog
                open={openDetailsDialog}
                setOpen={setOpenDetailsDialog}
                productDetails={productDetails}
            />
        </div>
    );
}

export default SearchProducts;
