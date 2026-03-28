const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
    try {
        const {
            category = [],
            brand = [],
            sortBy = "price-lowtohigh",
        } = req.query;

        let filters = {};

        if (category.length) {
            filters.category = { $in: category.split(",") };
        }

        if (brand.length) {
            filters.brand = { $in: brand.split(",") };
        }

        const sortByEffectivePrice =
            sortBy === "price-lowtohigh" || sortBy === "price-hightolow";

        const sortDirection = sortBy === "price-hightolow" ? -1 : 1;

        let sort = {};

        switch (sortBy) {
            case "title-atoz":
                sort.title = 1;

                break;

            case "title-ztoa":
                sort.title = -1;

                break;

            default:
                break;
        }

        if (sortByEffectivePrice) {
            const products = await Product.aggregate([
                { $match: filters },
                {
                    $addFields: {
                        effectivePrice: {
                            $cond: [
                                { $gt: ["$salePrice", 0] },
                                "$salePrice",
                                "$price",
                            ],
                        },
                    },
                },
                { $sort: { effectivePrice: sortDirection } },
            ]);

            return res.status(200).json({
                success: true,
                data: products,
            });
        }

        const products = await Product.find(filters).sort(sort);

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product)
            return res.status(404).json({
                success: false,
                message: "Product not found!",
            });

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (e) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { getFilteredProducts, getProductDetails };
