import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { brandOptionsMap, categoryOptionsMap } from "@/config";
import { Badge } from "../ui/badge";

function ShoppingProductTile({
    product,
    handleGetProductDetails,
    handleAddtoCart,
}) {
    return (
        <Card className="mx-auto w-full max-w-sm overflow-hidden border-0 bg-white/85 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl">
            <div onClick={() => handleGetProductDetails(product?._id)}>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="h-[300px] w-full object-cover"
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
                <CardContent className="p-4">
                    <h2 className="mb-2 line-clamp-1 text-xl">
                        {product?.title}
                    </h2>
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-[15px] text-muted-foreground">
                            {categoryOptionsMap[product?.category]}
                        </span>
                        <span className="text-[15px] text-muted-foreground">
                            {brandOptionsMap[product?.brand]}
                        </span>
                    </div>
                    <div className="mb-2 flex items-center justify-between">
                        <span
                            className={`${
                                product?.salePrice > 0 ? "line-through" : ""
                            } text-lg font-semibold text-muted-foreground`}
                        >
                            ${product?.price}
                        </span>
                        {product?.salePrice > 0 ? (
                            <span className="text-lg font-bold text-primary">
                                ${product?.salePrice}
                            </span>
                        ) : null}
                    </div>
                </CardContent>
            </div>
            <CardFooter className="pt-0">
                {product?.totalStock === 0 ? (
                    <Button className="w-full cursor-not-allowed rounded-xl opacity-60">
                        Out Of Stock
                    </Button>
                ) : (
                    <Button
                        onClick={() =>
                            handleAddtoCart(product?._id, product?.totalStock)
                        }
                        className="w-full rounded-xl"
                    >
                        Add to cart
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}

export default ShoppingProductTile;
