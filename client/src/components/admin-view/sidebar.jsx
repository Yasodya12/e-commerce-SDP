import {
    BadgeCheck,
    ChartNoAxesCombined,
    Layers3,
    LayoutDashboard,
    ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: <LayoutDashboard />,
    },
    {
        id: "products",
        label: "Products",
        path: "/admin/products",
        icon: <ShoppingBasket />,
    },
    {
        id: "orders",
        label: "Orders",
        path: "/admin/orders",
        icon: <BadgeCheck />,
    },
    {
        id: "features",
        label: "Features",
        path: "/admin/features",
        icon: <Layers3 />,
    },
];

function MenuItems({ setOpen }) {
    const navigate = useNavigate();

    return (
        <nav className="mt-8 flex flex-col gap-2">
            {adminSidebarMenuItems.map((menuItem) => (
                <div
                    key={menuItem.id}
                    onClick={() => {
                        navigate(menuItem.path);
                        setOpen ? setOpen(false) : null;
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
                >
                    {menuItem.icon}
                    <span>{menuItem.label}</span>
                </div>
            ))}
        </nav>
    );
}

function AdminSideBar({ open, setOpen }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-72 bg-background/95">
                    <div className="flex flex-col h-full">
                        <SheetHeader className="border-b pb-5">
                            <SheetTitle className="mt-5 flex items-center gap-2">
                                <span className="rounded-xl bg-primary p-2 text-primary-foreground">
                                    <ChartNoAxesCombined size={20} />
                                </span>
                                <h1 className="text-2xl">Control Center</h1>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>
            <aside className="glass-panel sticky top-4 hidden h-[calc(100vh-2rem)] w-72 flex-col p-6 lg:flex">
                <div
                    onClick={() => navigate("/admin/dashboard")}
                    className="flex cursor-pointer items-center gap-2"
                >
                    <span className="rounded-xl bg-primary p-2 text-primary-foreground">
                        <ChartNoAxesCombined size={20} />
                    </span>
                    <h1 className="text-2xl">Control Center</h1>
                </div>
                <MenuItems />
            </aside>
        </Fragment>
    );
}

export default AdminSideBar;
