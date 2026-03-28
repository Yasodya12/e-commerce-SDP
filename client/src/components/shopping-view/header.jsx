import { Gem, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { useEffect, useState } from "react";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    function handleNavigate(getCurrentMenuItem) {
        sessionStorage.removeItem("filters");
        const currentFilter =
            getCurrentMenuItem.id !== "home" &&
            getCurrentMenuItem.id !== "products" &&
            getCurrentMenuItem.id !== "search"
                ? {
                      category: [getCurrentMenuItem.id],
                  }
                : null;

        sessionStorage.setItem("filters", JSON.stringify(currentFilter));

        location.pathname.includes("listing") && currentFilter !== null
            ? setSearchParams(
                  new URLSearchParams(`?category=${getCurrentMenuItem.id}`),
              )
            : navigate(getCurrentMenuItem.path);
    }

    return (
        <nav className="flex flex-col gap-5 pb-4 lg:flex-row lg:items-center lg:pb-0">
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Label
                    onClick={() => handleNavigate(menuItem)}
                    className="cursor-pointer text-xs font-bold uppercase tracking-[0.08em] text-foreground/80 transition-colors hover:text-primary"
                    key={menuItem.id}
                >
                    {menuItem.label}
                </Label>
            ))}
        </nav>
    );
}

function HeaderRightContent() {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.shopCart);
    const [openCartSheet, setOpenCartSheet] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutUser());
    }

    useEffect(() => {
        if (user?.id) dispatch(fetchCartItems(user.id));
    }, [dispatch, user?.id]);

    console.log(cartItems, "sangam");

    return (
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <Sheet
                open={openCartSheet}
                onOpenChange={() => setOpenCartSheet(false)}
            >
                <Button
                    onClick={() => setOpenCartSheet(true)}
                    variant="outline"
                    size="icon"
                    className="relative rounded-full border-primary/40"
                >
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -right-1 -top-1 rounded-full bg-accent px-1.5 py-0.5 text-xs font-bold text-accent-foreground">
                        {cartItems?.items?.length || 0}
                    </span>
                    <span className="sr-only">User cart</span>
                </Button>
                <UserCartWrapper
                    setOpenCartSheet={setOpenCartSheet}
                    cartItems={
                        cartItems &&
                        cartItems.items &&
                        cartItems.items.length > 0
                            ? cartItems.items
                            : []
                    }
                />
            </Sheet>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className="border border-primary/40 bg-primary/90">
                        <AvatarFallback className="bg-primary text-sm font-extrabold text-primary-foreground">
                            {user?.userName[0].toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    side="bottom"
                    align="end"
                    sideOffset={10}
                    collisionPadding={12}
                    className="z-50 w-56 max-w-[calc(100vw-1.5rem)] overflow-auto"
                >
                    <DropdownMenuLabel>
                        Logged in as {user?.userName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/shop/account")}>
                        <UserCog className="mr-2 h-4 w-4" />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

function ShoppingHeader() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (!isAuthenticated) return null;

    return (
        <header className="sticky top-0 z-40 w-full pb-4 pt-2">
            <div className="app-shell px-4 md:px-6">
                <div className="glass-panel flex h-16 w-full items-center justify-between px-4 md:px-6">
                    <Link to="/shop/home" className="flex items-center gap-2">
                        <span className="rounded-full bg-primary p-2 text-primary-foreground shadow-lg shadow-primary/30">
                            <Gem className="h-4 w-4" />
                        </span>
                        <span className="text-lg font-semibold tracking-tight">
                            UrbanNest
                        </span>
                    </Link>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="lg:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">
                                    Toggle header menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="w-full max-w-xs bg-background/95"
                        >
                            <MenuItems />
                            <HeaderRightContent />
                        </SheetContent>
                    </Sheet>
                    <div className="hidden lg:block">
                        <MenuItems />
                    </div>

                    <div className="hidden lg:block">
                        <HeaderRightContent />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default ShoppingHeader;
