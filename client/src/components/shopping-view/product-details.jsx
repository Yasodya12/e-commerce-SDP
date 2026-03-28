import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/star-rating";
import { useEffect, useState } from "react";
import { addReview, getReviews } from "@/store/shop/review-slice";

function ProductDetailsDialog({ open, setOpen, productDetails }) {
    const [reviewMsg, setReviewMsg] = useState("");
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const { reviews } = useSelector((state) => state.shopReview);

    const { toast } = useToast();

    function handleRatingChange(getRating) {
        console.log(getRating, "getRating");

        setRating(getRating);
    }

    function handleAddToCart(getCurrentProductId, getTotalStock) {
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

    function handleDialogClose() {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
    }

    function handleAddReview() {
        dispatch(
            addReview({
                productId: productDetails?._id,
                userId: user?.id,
                userName: user?.userName,
                reviewMessage: reviewMsg,
                reviewValue: rating,
            }),
        ).then((data) => {
            if (data.payload.success) {
                setRating(0);
                setReviewMsg("");
                dispatch(getReviews(productDetails?._id));
                toast({
                    title: "Review added successfully!",
                });
            }
        });
    }

    useEffect(() => {
        if (productDetails !== null) dispatch(getReviews(productDetails?._id));
    }, [productDetails]);

    console.log(reviews, "reviews");

    const averageReview =
        reviews && reviews.length > 0
            ? reviews.reduce(
                  (sum, reviewItem) => sum + reviewItem.reviewValue,
                  0,
              ) / reviews.length
            : 0;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className="left-1/2 top-1/2 z-50 grid h-[92dvh] max-h-[92dvh] w-[min(96vw,1280px)] max-w-none translate-x-[-50%] translate-y-[-50%] grid-cols-1 gap-0 overflow-hidden rounded-3xl border border-border/60 bg-white p-0 shadow-2xl lg:grid-cols-[1.05fr_0.95fr]">
                <div className="relative h-full min-h-0 overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/40 to-white">
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        width={600}
                        height={600}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="h-full min-h-0 overflow-y-auto bg-white px-5 pb-6 pt-10 sm:px-7 lg:px-8">
                    <div className="space-y-6">
                        <div>
                            <p className="inline-flex rounded-full border border-primary/20 bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-foreground/75">
                                Product Details
                            </p>
                            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                {productDetails?.title}
                            </h1>
                            <p className="mb-5 mt-4 text-base leading-relaxed text-foreground/75 sm:text-lg">
                                {productDetails?.description}
                            </p>
                        </div>
                        <div className="flex flex-wrap items-end justify-between gap-4 rounded-2xl border border-border/60 bg-secondary/30 p-4">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">
                                    Price
                                </p>
                                <div className="mt-1 flex items-baseline gap-3">
                                    <p
                                        className={`text-3xl font-bold text-primary ${
                                            productDetails?.salePrice > 0
                                                ? "line-through"
                                                : ""
                                        }`}
                                    >
                                        ${productDetails?.price}
                                    </p>
                                    {productDetails?.salePrice > 0 ? (
                                        <p className="text-2xl font-bold text-primary">
                                            ${productDetails?.salePrice}
                                        </p>
                                    ) : null}
                                </div>
                            </div>
                            <div className="rounded-full border border-border/60 bg-white px-3 py-1 text-sm font-semibold text-foreground/75">
                                {productDetails?.totalStock} in stock
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <StarRatingComponent rating={averageReview} />
                            </div>
                            <span className="text-sm text-foreground/65">
                                ({averageReview.toFixed(2)})
                            </span>
                        </div>
                        <div className="mt-5 mb-2">
                            {productDetails?.totalStock === 0 ? (
                                <Button className="w-full cursor-not-allowed rounded-xl border border-primary/25 bg-secondary/70 text-foreground opacity-60">
                                    Out of Stock
                                </Button>
                            ) : (
                                <Button
                                    className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                                    onClick={() =>
                                        handleAddToCart(
                                            productDetails?._id,
                                            productDetails?.totalStock,
                                        )
                                    }
                                >
                                    Add to Cart
                                </Button>
                            )}
                        </div>
                        <Separator />
                        <div className="pr-1">
                            <h2 className="mb-4 text-xl font-semibold tracking-tight text-foreground">
                                Reviews
                            </h2>
                            <div className="grid gap-6">
                                {reviews && reviews.length > 0 ? (
                                    reviews.map((reviewItem) => (
                                        <div
                                            className="flex gap-4 rounded-2xl border border-border/60 bg-secondary/30 p-4"
                                            key={reviewItem._id}
                                        >
                                            <Avatar className="h-10 w-10 border border-primary/20 bg-white">
                                                <AvatarFallback>
                                                    {reviewItem?.userName[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-foreground">
                                                        {reviewItem?.userName}
                                                    </h3>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <StarRatingComponent
                                                        rating={
                                                            reviewItem?.reviewValue
                                                        }
                                                    />
                                                </div>
                                                <p className="text-sm leading-relaxed text-foreground/70">
                                                    {reviewItem.reviewMessage}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <h1 className="text-foreground/60">
                                        No Reviews
                                    </h1>
                                )}
                            </div>
                            <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-border/60 bg-white p-4 shadow-sm">
                                <Label className="font-semibold text-foreground">
                                    Write a review
                                </Label>
                                <div className="flex gap-1">
                                    <StarRatingComponent
                                        rating={rating}
                                        handleRatingChange={handleRatingChange}
                                    />
                                </div>
                                <Input
                                    name="reviewMsg"
                                    value={reviewMsg}
                                    onChange={(event) =>
                                        setReviewMsg(event.target.value)
                                    }
                                    placeholder="Write a review..."
                                />
                                <Button
                                    onClick={handleAddReview}
                                    disabled={reviewMsg.trim() === ""}
                                    className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;
