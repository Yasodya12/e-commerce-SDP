import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden overflow-hidden lg:flex lg:items-end lg:justify-start">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0d4d63] via-[#1f7894] to-[#f39b61]" />
                <div className="absolute -left-12 top-20 h-44 w-44 rounded-full bg-white/30 blur-xl" />
                <div className="absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-[#f7e5d5]/40 blur-2xl" />
                <div className="relative z-10 p-14 text-white">
                    <p className="fade-up text-sm uppercase tracking-[0.24em] text-white/85">
                        Curated Commerce
                    </p>
                    <h1 className="fade-up mt-4 max-w-xl text-5xl leading-tight">
                        Discover products that feel made for your lifestyle.
                    </h1>
                    <p className="fade-up mt-5 max-w-lg text-base text-white/90">
                        From everyday essentials to statement pieces, this store
                        experience is designed for speed, clarity, and
                        confidence.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="glass-panel fade-up w-full max-w-lg p-8 sm:p-10">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
