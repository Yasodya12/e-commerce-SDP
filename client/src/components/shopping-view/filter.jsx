import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
    return (
        <div className="glass-panel h-fit">
            <div className="border-b p-4">
                <h2 className="text-xl">Filters</h2>
            </div>
            <div className="space-y-4 p-4">
                {Object.keys(filterOptions).map((keyItem) => (
                    <Fragment key={keyItem}>
                        <div>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-foreground/80">
                                {keyItem}
                            </h3>
                            <div className="grid gap-2 mt-2">
                                {filterOptions[keyItem].map((option) => (
                                    <Label
                                        key={option.id}
                                        className="flex items-center gap-2 rounded-xl px-2 py-1.5 font-medium transition-colors hover:bg-secondary"
                                    >
                                        <Checkbox
                                            checked={
                                                filters &&
                                                Object.keys(filters).length >
                                                    0 &&
                                                filters[keyItem] &&
                                                filters[keyItem].indexOf(
                                                    option.id,
                                                ) > -1
                                            }
                                            onCheckedChange={() =>
                                                handleFilter(keyItem, option.id)
                                            }
                                        />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export default ProductFilter;
