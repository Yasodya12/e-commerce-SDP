function NotFound() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="glass-panel fade-up max-w-xl p-8 text-center sm:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    404
                </p>
                <h1 className="mt-3 text-4xl">Page does not exist</h1>
                <p className="mt-3 text-muted-foreground">
                    The page you requested may have been moved or removed.
                </p>
            </div>
        </div>
    );
}

export default NotFound;
