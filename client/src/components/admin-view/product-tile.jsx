import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";

function AdminProductTile({
    product,
    setFormData,
    setOpenCreateProductsDialog,
    setCurrentEditedId,
    handleDelete,
}) {
    return (
        <Card className="mx-auto w-full max-w-sm overflow-hidden border-0 bg-white/90 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl">
            <div>
                <div className="relative">
                    <img
                        src={product?.image}
                        alt={product?.title}
                        className="h-[300px] w-full object-cover"
                    />
                </div>
                <CardContent>
                    <h2 className="mb-2 mt-3 line-clamp-1 text-xl">
                        {product?.title}
                    </h2>
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
                <CardFooter className="flex items-center justify-between pt-0">
                    <Button
                        onClick={() => {
                            setOpenCreateProductsDialog(true);
                            setCurrentEditedId(product?._id);
                            setFormData(product);
                        }}
                        className="rounded-xl"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(product?._id)}
                        className="rounded-xl"
                    >
                        Delete
                    </Button>
                </CardFooter>
            </div>
        </Card>
    );
}

export default AdminProductTile;
