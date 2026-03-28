import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-transparent">
            <ShoppingHeader />
            <main className="app-shell flex w-full flex-1 flex-col px-4 pb-8 pt-6 md:px-6">
                <Outlet />
            </main>
        </div>
    );
}

export default ShoppingLayout;
