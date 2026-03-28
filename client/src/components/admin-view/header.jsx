import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
    const dispatch = useDispatch();

    function handleLogout() {
        dispatch(logoutUser());
    }

    return (
        <header className="sticky top-0 z-30 pb-4 pt-2">
            <div className="app-shell glass-panel flex items-center justify-between px-4 py-3 md:px-5">
                <Button
                    onClick={() => setOpen(true)}
                    variant="outline"
                    className="lg:hidden sm:block"
                >
                    <AlignJustify />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                <div className="flex flex-1 items-center justify-between gap-4 lg:justify-end">
                    <div className="hidden lg:block">
                        <p className="text-sm font-medium text-muted-foreground">
                            Admin Workspace
                        </p>
                    </div>
                    <Button
                        onClick={handleLogout}
                        className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium shadow"
                    >
                        <LogOut />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
