import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";

function App() {
    const { user, isAuthenticated, isLoading } = useSelector(
        (state) => state.auth,
    );
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    if (isLoading)
        return (
            <div className="min-h-screen p-6 md:p-10">
                <Skeleton className="mx-auto h-[78vh] w-full max-w-6xl rounded-3xl bg-muted/80" />
            </div>
        );

    console.log(isLoading, user);

    return (
        <div className="flex min-h-screen flex-col bg-transparent">
            <Routes>
                <Route
                    path="/"
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        ></CheckAuth>
                    }
                />
                <Route
                    path="/auth"
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        >
                            <AuthLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="login" element={<AuthLogin />} />
                    <Route path="register" element={<AuthRegister />} />
                </Route>
                <Route
                    path="/admin"
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        >
                            <AdminLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="features" element={<AdminFeatures />} />
                </Route>
                <Route
                    path="/shop"
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        >
                            <ShoppingLayout />
                        </CheckAuth>
                    }
                >
                    <Route path="home" element={<ShoppingHome />} />
                    <Route path="listing" element={<ShoppingListing />} />
                    <Route path="checkout" element={<ShoppingCheckout />} />
                    <Route path="account" element={<ShoppingAccount />} />
                    <Route
                        path="paypal-return"
                        element={<PaypalReturnPage />}
                    />
                    <Route
                        path="payment-success"
                        element={<PaymentSuccessPage />}
                    />
                    <Route path="search" element={<SearchProducts />} />
                </Route>
                <Route path="/unauth-page" element={<UnauthPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

            {!location.pathname.startsWith("/auth") ? (
                <footer className="mt-10 border-t border-border/60 bg-white/70 py-4">
                    <div className="app-shell px-4 text-center text-sm text-muted-foreground md:px-6">
                        © {new Date().getFullYear()} UrbanNest. All rights
                        reserved.
                    </div>
                </footer>
            ) : null}
        </div>
    );
}

export default App;
