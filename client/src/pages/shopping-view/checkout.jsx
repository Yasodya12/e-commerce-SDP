import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

function ShoppingCheckout() {
    const { cartItems } = useSelector((state) => state.shopCart);
    const { user } = useSelector((state) => state.auth);
    const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
    const [isPaymentStart, setIsPaymentStart] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();

    const totalCartAmount =
        cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.reduce(
                  (sum, currentItem) =>
                      sum +
                      (currentItem?.salePrice > 0
                          ? currentItem?.salePrice
                          : currentItem?.price) *
                          currentItem?.quantity,
                  0,
              )
            : 0;

    function handlePlaceOrder() {
        if (!cartItems || !cartItems.items || cartItems.items.length === 0) {
            toast({
                title: "Your cart is empty. Please add items to proceed",
                variant: "destructive",
            });
            return;
        }

        if (currentSelectedAddress === null) {
            toast({
                title: "Please select one address to proceed.",
                variant: "destructive",
            });
            return;
        }

        const orderData = {
            userId: user?.id,
            cartId: cartItems?._id,
            cartItems: cartItems.items.map((singleCartItem) => ({
                productId: singleCartItem?.productId,
                title: singleCartItem?.title,
                image: singleCartItem?.image,
                price:
                    singleCartItem?.salePrice > 0
                        ? singleCartItem?.salePrice
                        : singleCartItem?.price,
                quantity: singleCartItem?.quantity,
            })),
            addressInfo: {
                addressId: currentSelectedAddress?._id,
                address: currentSelectedAddress?.address,
                city: currentSelectedAddress?.city,
                pincode: currentSelectedAddress?.pincode,
                phone: currentSelectedAddress?.phone,
                notes: currentSelectedAddress?.notes,
            },
            orderStatus: "pending",
            paymentMethod: "mock",
            paymentStatus: "pending",
            totalAmount: totalCartAmount,
            orderDate: new Date(),
            orderUpdateDate: new Date(),
            paymentId: "",
            payerId: "",
        };

        setIsPaymentStart(true);

        dispatch(createNewOrder(orderData)).then((data) => {
            if (data?.payload?.success) {
                sessionStorage.removeItem("currentOrderId");
                navigate("/shop/payment-success");
            } else {
                setIsPaymentStart(false);
                toast({
                    title: "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            }
        });
    }

    return (
        <div className="fade-up flex flex-col gap-6">
            <div className="relative h-[240px] w-full overflow-hidden rounded-3xl border shadow-lg sm:h-[300px]">
                <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/50 to-transparent" />
                <img
                    src={img}
                    className="h-full w-full object-cover object-center"
                />
                <div className="absolute bottom-6 left-6 z-20 text-white sm:left-8">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                        Checkout
                    </p>
                    <h1 className="mt-2 text-4xl">Secure Your Order</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Address
                    selectedId={currentSelectedAddress}
                    setCurrentSelectedAddress={setCurrentSelectedAddress}
                />
                <div className="glass-panel flex h-fit flex-col gap-4 p-4 sm:p-5">
                    <h2 className="text-2xl">Your Cart</h2>
                    {cartItems && cartItems.items && cartItems.items.length > 0
                        ? cartItems.items.map((item) => (
                              <UserCartItemsContent
                                  key={item.productId}
                                  cartItem={item}
                              />
                          ))
                        : null}
                    <div className="mt-6 space-y-4 border-t pt-4">
                        <div className="flex justify-between text-lg">
                            <span className="font-semibold">Total</span>
                            <span className="font-semibold text-primary">
                                ${totalCartAmount}
                            </span>
                        </div>
                    </div>
                    <div className="mt-2 w-full">
                        <Button
                            onClick={handlePlaceOrder}
                            className="h-11 w-full rounded-xl"
                        >
                            {isPaymentStart
                                ? "Processing Order..."
                                : "Place Order"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCheckout;
