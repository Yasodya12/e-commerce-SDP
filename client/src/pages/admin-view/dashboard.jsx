import ProductImageUpload from "@/components/admin-view/image-upload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, getFeatureImages } from "@/store/common-slice";
import { fetchAllProducts } from "@/store/admin/products-slice";
import { getAllOrdersForAdmin } from "@/store/admin/order-slice";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    ShoppingBasket,
    BadgeCheck,
    DollarSign,
    ImageIcon,
    ArrowRight,
    Package,
    Layers3,
    TrendingUp,
    Clock,
    Upload,
    BarChart3,
    CalendarDays,
    Sparkles,
    Activity,
    Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ── helper: tiny CSS-only bar chart ── */
function MiniBarChart({ data, maxVal }) {
    const peak = maxVal || Math.max(...data.map((d) => d.value), 1);
    return (
        <div className="flex items-end gap-[6px]">
            {data.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                    <div
                        className="w-8 rounded-lg bg-primary/85 transition-all hover:bg-primary sm:w-9"
                        style={{
                            height: `${Math.max((d.value / peak) * 120, 8)}px`,
                        }}
                    />
                    <span className="text-[10px] font-medium text-muted-foreground">
                        {d.label}
                    </span>
                </div>
            ))}
        </div>
    );
}

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { featureImageList } = useSelector((state) => state.commonFeature);
    const { productList } = useSelector((state) => state.adminProducts);
    const { orderList } = useSelector((state) => state.adminOrder);

    /* ── derived stats ── */
    const totalRevenue = useMemo(() => {
        if (!orderList || orderList.length === 0) return 0;
        return orderList.reduce(
            (acc, o) => acc + (Number(o.totalAmount) || 0),
            0,
        );
    }, [orderList]);

    const confirmedOrders = useMemo(() => {
        if (!orderList) return 0;
        return orderList.filter((o) => o.orderStatus === "confirmed").length;
    }, [orderList]);

    const recentOrders = useMemo(() => {
        if (!orderList || orderList.length === 0) return [];
        return [...orderList]
            .sort(
                (a, b) =>
                    new Date(b.orderDate).getTime() -
                    new Date(a.orderDate).getTime(),
            )
            .slice(0, 5);
    }, [orderList]);

    /* pseudo weekly data for the bar chart (derived from orders) */
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const chartData = useMemo(() => {
        const counts = new Array(7).fill(0);
        (orderList || []).forEach((o) => {
            const d = new Date(o.orderDate).getDay(); // 0=Sun
            const idx = d === 0 ? 6 : d - 1;
            counts[idx]++;
        });
        return weekDays.map((label, i) => ({ label, value: counts[i] }));
    }, [orderList]);

    const fulfillmentRate = useMemo(() => {
        if (!orderList || orderList.length === 0) return 0;
        return Math.round((confirmedOrders / orderList.length) * 100);
    }, [orderList, confirmedOrders]);

    function handleUploadFeatureImage() {
        dispatch(addFeatureImage(uploadedImageUrl)).then((data) => {
            if (data?.payload?.success) {
                dispatch(getFeatureImages());
                setImageFile(null);
                setUploadedImageUrl("");
            }
        });
    }

    useEffect(() => {
        dispatch(getFeatureImages());
        dispatch(fetchAllProducts());
        dispatch(getAllOrdersForAdmin());
    }, [dispatch]);

    const greeting = (() => {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 17) return "Good afternoon";
        return "Good evening";
    })();

    const today = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const monthYear = new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    return (
        <div className="fade-up space-y-4">
            {/* ═══════════════════ ROW 1 ═══════════════════ */}
            <div className="stagger grid gap-4 grid-cols-1 lg:grid-cols-3">
                {/* ── Sales Overview  (2 / 3) ── */}
                <div className="glass-panel col-span-1 overflow-hidden p-6 sm:p-8 lg:col-span-2">
                    {/* card header */}
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                                <BarChart3 size={20} className="text-foreground" />
                            </span>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Sales Overview
                                </h2>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    Monitor orders and track overall store
                                    performance.
                                </p>
                            </div>
                        </div>
                        <span className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                            {monthYear}
                        </span>
                    </div>

                    {/* big stats + chart */}
                    <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                        <div className="space-y-5">
                            {/* primary stat */}
                            <div>
                                <div className="flex items-baseline gap-1.5">
                                    <span className="text-5xl font-extrabold tracking-tight">
                                        {orderList?.length || 0}
                                    </span>
                                    <span className="text-lg font-medium text-muted-foreground">
                                        /{productList?.length || 0}
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Total Orders / Products Listed
                                </p>
                            </div>
                            {/* secondary stat */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="text-4xl font-extrabold tracking-tight">
                                        {fulfillmentRate}%
                                    </span>
                                    {fulfillmentRate >= 80 && (
                                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                                            Great!
                                        </span>
                                    )}
                                </div>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Order Fulfillment Rate
                                </p>
                            </div>
                        </div>

                        {/* bar chart */}
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <Activity size={13} />
                                <span>Orders by Day</span>
                            </div>
                            <MiniBarChart data={chartData} />
                        </div>
                    </div>
                </div>

                {/* ── Recent Activity sidebar  (1 / 3) ── */}
                <div className="glass-panel col-span-1 flex flex-col overflow-hidden p-0">
                    {/* header */}
                    <div className="border-b px-6 pb-4 pt-6">
                        <div className="flex items-center gap-2">
                            <CalendarDays
                                size={18}
                                className="text-muted-foreground"
                            />
                            <h2 className="text-xl font-semibold">
                                {monthYear}
                            </h2>
                        </div>
                    </div>

                    {/* recent orders schedule-list */}
                    <div className="flex flex-1 flex-col">
                        <div className="flex items-center justify-between px-6 pb-2 pt-5">
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                                Recent Orders
                            </p>
                            <button
                                onClick={() => navigate("/admin/orders")}
                                className="flex items-center gap-1 text-xs font-medium text-primary transition-colors hover:text-primary/70"
                            >
                                View all
                                <ArrowRight size={12} />
                            </button>
                        </div>

                        {recentOrders.length > 0 ? (
                            <ul className="flex-1 divide-y px-2">
                                {recentOrders.map((order) => (
                                    <li
                                        key={order._id}
                                        className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-secondary/50"
                                    >
                                        <span
                                            className={`h-2 w-2 shrink-0 rounded-full ${
                                                order.orderStatus ===
                                                "confirmed"
                                                    ? "bg-emerald-500"
                                                    : order.orderStatus ===
                                                        "rejected"
                                                      ? "bg-red-500"
                                                      : "bg-amber-400"
                                            }`}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                Order #…{order._id?.slice(-6)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {order.orderDate?.split(
                                                    "T",
                                                )[0]}{" "}
                                                · ${order.totalAmount}
                                            </p>
                                        </div>
                                        <Badge
                                            className={`shrink-0 px-2 py-0.5 text-[10px] font-semibold text-white ${
                                                order.orderStatus ===
                                                "confirmed"
                                                    ? "bg-emerald-500"
                                                    : order.orderStatus ===
                                                        "rejected"
                                                      ? "bg-red-500"
                                                      : "bg-primary"
                                            }`}
                                        >
                                            {order.orderStatus}
                                        </Badge>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-1 flex-col items-center justify-center py-10 text-muted-foreground">
                                <Package
                                    size={28}
                                    className="mb-2 opacity-30"
                                />
                                <p className="text-sm">No orders yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════════════════ ROW 2 — stat strip ═══════════════════ */}
            <div className="stagger grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {/* Revenue */}
                <div className="glass-panel p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(23_86%_62%/0.15)]">
                            <DollarSign
                                size={18}
                                className="text-[hsl(23_86%_62%)]"
                            />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Total Revenue
                            </p>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold tracking-tight">
                            ${totalRevenue.toLocaleString()}
                        </span>
                        {totalRevenue > 0 && (
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                                +{((confirmedOrders / (orderList?.length || 1)) * 100).toFixed(0)}%
                                confirmed
                            </span>
                        )}
                    </div>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                        Across {orderList?.length || 0} total orders
                    </p>
                </div>

                {/* Store Health */}
                <div className="glass-panel p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(173_58%_39%/0.15)]">
                            <Sparkles
                                size={18}
                                className="text-[hsl(173_58%_39%)]"
                            />
                        </span>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Store Health Score
                            </p>
                        </div>
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">
                        Monitor catalog completeness and order processing
                        efficiency.
                    </p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold tracking-tight">
                            {productList?.length > 0
                                ? Math.min(
                                      100,
                                      Math.round(
                                          ((productList?.length || 0) / 10) * 20 +
                                              fulfillmentRate * 0.5,
                                      ),
                                  )
                                : 0}
                            %
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            Overall
                        </span>
                        {productList?.length >= 5 && (
                            <span className="ml-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
                                Healthy
                            </span>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-panel p-6">
                    <div className="mb-4 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                            <Users
                                size={18}
                                className="text-foreground"
                            />
                        </span>
                        <p className="text-sm font-medium text-muted-foreground">
                            Quick Actions
                        </p>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        {[
                            {
                                label: "Manage Products",
                                icon: ShoppingBasket,
                                path: "/admin/products",
                                color: "hsl(195 69% 34%)",
                            },
                            {
                                label: "View Orders",
                                icon: BadgeCheck,
                                path: "/admin/orders",
                                color: "hsl(173 58% 39%)",
                            },
                            {
                                label: "Features",
                                icon: Layers3,
                                path: "/admin/features",
                                color: "hsl(23 86% 62%)",
                            },
                        ].map((action) => (
                            <button
                                key={action.path}
                                onClick={() => navigate(action.path)}
                                className="group/btn flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all hover:bg-secondary"
                            >
                                <span
                                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-transform group-hover/btn:scale-110"
                                    style={{ background: action.color }}
                                >
                                    <action.icon
                                        size={14}
                                        className="text-white"
                                    />
                                </span>
                                {action.label}
                                <ArrowRight
                                    size={13}
                                    className="ml-auto text-muted-foreground opacity-0 transition-opacity group-hover/btn:opacity-100"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══════════════════ ROW 3 — Banner management ═══════════════════ */}
            <div className="stagger grid gap-4 grid-cols-1">
                <div className="glass-panel p-6 sm:p-8">
                    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
                                <Upload
                                    size={18}
                                    className="text-foreground"
                                />
                            </span>
                            <div>
                                <h2 className="text-xl font-semibold">
                                    Homepage Hero Banners
                                </h2>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    Upload and manage the banner images shown on
                                    the storefront homepage.
                                </p>
                            </div>
                        </div>
                        <span className="rounded-full border bg-white px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
                            {featureImageList?.length || 0} items
                        </span>
                    </div>
                    <ProductImageUpload
                        imageFile={imageFile}
                        setImageFile={setImageFile}
                        uploadedImageUrl={uploadedImageUrl}
                        setUploadedImageUrl={setUploadedImageUrl}
                        setImageLoadingState={setImageLoadingState}
                        imageLoadingState={imageLoadingState}
                        isCustomStyling={true}
                    />
                    <Button
                        onClick={handleUploadFeatureImage}
                        className="mt-5 h-11 w-full rounded-xl sm:w-40"
                    >
                        Upload
                    </Button>
                </div>

                {/* gallery */}
                {featureImageList && featureImageList.length > 0 && (
                    <div className="stagger grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {featureImageList.map((featureImgItem) => (
                            <div
                                className="glass-panel overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-2xl"
                                key={featureImgItem._id}
                            >
                                <img
                                    src={featureImgItem.image}
                                    className="h-[200px] w-full object-cover"
                                    alt="Hero banner"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
