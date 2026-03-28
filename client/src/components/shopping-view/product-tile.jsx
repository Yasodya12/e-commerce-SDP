import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
    product,
    handleGetProductDetails,
    handleAddtoCart,
    variant = "default",
}) {
    const isFeaturedVariant = variant === "featured";

    if (isFeaturedVariant) {
        return (
            <Card className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-primary/15 bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-sm">
                <div
                    onClick={() => handleGetProductDetails(product?._id)}
                    className="relative cursor-pointer"
                >
                    <div className="relative h-[290px] overflow-hidden bg-white">
                        <img
                            src={product?.image}
                            alt={product?.title}
                            className="h-full w-full object-cover"
                        />

                        {product?.totalStock === 0 ? (
                            <Badge className="absolute left-3 top-3 bg-destructive hover:bg-destructive">
                                Out Of Stock
                            </Badge>
                        ) : product?.totalStock < 10 ? (
                            <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground hover:bg-accent">
                                {`Only ${product?.totalStock} items left`}
                            </Badge>
                        ) : product?.salePrice > 0 ? (
                            <Badge className="absolute left-3 top-3 bg-primary hover:bg-primary">
                                Sale
                            </Badge>
                        ) : null}
                    </div>

                    <div className="relative bg-white px-5 pb-3 pt-5">
                        <h2 className="line-clamp-1 text-[26px] font-semibold tracking-tight text-foreground">
                            {product?.title}
                        </h2>

                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-foreground/75">
                                {categoryOptionsMap[product?.category] ||
                                    product?.category}
                            </span>
                            <span className="rounded-md border border-border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-foreground/75">
                                {brandOptionsMap[product?.brand] ||
                                    product?.brand}
                            </span>
                        </div>

                        <p className="mt-4 line-clamp-3 min-h-[72px] text-sm leading-relaxed text-foreground/75">
                            {product?.description ||
                                "Premium quality product curated for everyday style and comfort."}
                        </p>
                    </div>
                </div>

                <CardFooter className="flex items-end justify-between gap-3 bg-white px-5 pb-5 pt-1">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">
                            Price
                        </p>
                        <div className="mt-1 flex items-baseline gap-2">
                            {product?.salePrice > 0 ? (
                                <>
                                    <span className="text-2xl font-bold text-primary">
                                        ${product?.salePrice}
                                    </span>
                                    <span className="text-base font-semibold text-foreground/45 line-through">
                                        ${product?.price}
                                    </span>
                                </>
                            ) : (
                                <span className="text-2xl font-bold text-primary">
                                    ${product?.price}
                                </span>
                            )}
                        </div>
                    </div>

                    {product?.totalStock === 0 ? (
                        <Button className="h-12 min-w-[170px] cursor-not-allowed rounded-xl border border-primary/25 bg-secondary/70 px-6 text-base font-semibold text-foreground opacity-60">
                            Out Of Stock
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                handleAddtoCart(
                                    product?._id,
                                    product?.totalStock,
                                )
                            }
                            className="h-12 min-w-[170px] rounded-xl border border-primary/35 bg-primary px-6 text-base font-semibold text-primary-foreground hover:bg-primary/90"
                        >
                            Add to cart
                        </Button>
                    )}
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card
            className={`mx-auto w-full max-w-sm overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
                isFeaturedVariant
                    ? "border-primary/20 bg-white text-foreground shadow-none hover:shadow-lg"
                    : "border-border/60 bg-white shadow-lg"
            }`}
        >
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="h-[280px] w-full object-cover"
                    />
                    {isFeaturedVariant ? (
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent" />
                    ) : null}
                    {product?.totalStock === 0 ? (
                        <Badge className="absolute left-3 top-3 bg-destructive hover:bg-destructive">
                            Out Of Stock
                        </Badge>
                    ) : product?.totalStock < 10 ? (
                        <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground hover:bg-accent">
                            {`Only ${product?.totalStock} items left`}
                        </Badge>
                    ) : product?.salePrice > 0 ? (
                        <Badge className="absolute left-3 top-3 bg-primary hover:bg-primary">
                            Sale
                        </Badge>
                    ) : null}
                </div>
                <CardContent
                    className={`p-4 ${
                        isFeaturedVariant ? "relative bg-white" : ""
                    }`}
                >
                    <h2 className="mb-3 line-clamp-1 text-xl font-semibold tracking-tight">
                        {product?.title}
                    </h2>
                    <div className="mb-3 flex items-center gap-2">
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-foreground/75">
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-foreground/75">
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>
                    <div className="mb-1 flex items-end justify-between">
                        <span
                            className={`${
                                product?.salePrice > 0 ? "line-through" : ""
                            } text-base font-semibold ${
                                isFeaturedVariant
                                    ? "text-foreground/70"
                                    : "text-muted-foreground"
                            }`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span
                                className={`text-lg font-bold ${
                                    isFeaturedVariant
                                        ? "text-primary"
                                        : "text-primary"
                                }`}
                            >
                                ${product?.salePrice}
                            </span>
                        ) : (
                            <span className="text-lg font-bold text-primary">
                                ${product?.price}
                            </span>
                        )}
                    </div>
                </CardContent>
            </div>
            <CardFooter
                className={`pt-0 ${isFeaturedVariant ? "bg-white pb-4" : "pb-4"}`}
            >
                {product?.totalStock === 0 ? (
                    <Button
                        className={`w-full cursor-not-allowed rounded-xl opacity-60 ${
                            isFeaturedVariant
                                ? "border border-primary/25 bg-secondary/70 text-foreground"
                                : ""
                        }`}
                    >
                        Out Of Stock
                    </Button>
                ) : (
                    <Button
                        onClick={() =>
                            handleAddtoCart(product?._id, product?.totalStock)
                        }
                        className={`w-full rounded-xl ${
                            isFeaturedVariant
                                ? "border border-primary/35 bg-secondary/70 text-foreground hover:bg-primary hover:text-primary-foreground"
                                : ""
                        }`}
                    >
                        Add to cart
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default ShoppingProductTile;
