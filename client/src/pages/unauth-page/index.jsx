function UnauthPage() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="glass-panel fade-up max-w-xl p-8 text-center sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Access Restricted
                </p>
                <h1 className="mt-3 text-4xl">You do not have permission</h1>
                <p className="mt-3 text-muted-foreground">
                    This route is only available for the required role.
                </p>
            </div>
        </div>
    );
}

export default UnauthPage;
