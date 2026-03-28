import { Outlet } from "react-router-dom";
import AdminSideBar from "./sidebar";
import AdminHeader from "./header";
import { useState } from "react";

function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false);

    return (
        <div className="flex min-h-screen w-full bg-transparent">
            <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col">
                <AdminHeader setOpen={setOpenSidebar} />
                <main className="flex flex-1 flex-col p-4 md:p-7">
                    <div className="app-shell flex w-full flex-1 flex-col">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
