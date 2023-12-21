import ErrorHandler from "../utils/errorHandler.js";
import Product from "../models/productModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import ApiFeatures from "../utils/apiFeatures.js";

class Products {
    GetAllProduct = catchAsyncErrors(async (req, res, next) => {
        const resultPerPage = 8;
        const productCount = await Product.countDocuments();
        const apiFeatures = new ApiFeatures(Product.find(), req.query)
            .search()
            .filter()
        let products = await apiFeatures.query;

        let filteredProductCount = products.length;

        apiFeatures.pagination(resultPerPage)

        products = await apiFeatures.query;
        return res.status(200).send({
            success: true,
            products,
            productCount,
            resultPerPage,
            filteredProductCount,
        })
    })
    createProduct = catchAsyncErrors(async (req, res, next) => {
        req.body.user = req.user.id;
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        });
    })
    editProduct = catchAsyncErrors(async (req, res, next) => {
        let product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false })
        res.status(200).json({
            success: true,
            product
        })
    })
    deleteProduct = catchAsyncErrors(async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }
        await product.remove();
        res.status(200).json({
            success: true,
            messgae: "Product Deleted succesfuuly"
        })
    })
    getProductDetails = catchAsyncErrors(async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }
        return res.status(200).json({
            success: true,
            product
        })
    })
    createProductReview = catchAsyncErrors(async (req, res, next) => {
        const { rating, comment, productId } = req.body;
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }
        const product = await Product.findById(productId)

        const isReviewed = product.reviews.find(
            (rev) => rev.user.toString() === req.user._id.toString()
        );
        if (isReviewed) {
            product.reviews.forEach(rev => {
                if (rev.user.toString() === req.user._id.toString()) {
                    (rev.rating = rating), (rev.comment = comment);
                }
            })
        }
        else {
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }


        let avg = 0;
        product.reviews.forEach(rev => {
            avg += rev.rating
        })
        product.ratings = avg / product.reviews.length;
        await product.save({ validateBeforeSave: false });
        res.status(200).json({
            success: true
        })
    })
    getProductReviews = catchAsyncErrors(async (req, res, next) => {
        const product = await Product.findById(req.query.id);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }
        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    })
    deleteProductReview = catchAsyncErrors(async (req, res, next) => {
        const product = await Product.findById(req.query.productId);
        if (!product) {
            return next(new ErrorHandler("Product not found", 404))
        }
        const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());
        let avg = 0;
        reviews.forEach(rev => {
            avg += rev.rating
        })

        let ratings = 0;

        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = avg / reviews.length;
        }
        const numOfReviews = reviews.length;
        await Product.findByIdAndUpdate(req.query.productId, {
            reviews,
            ratings,
            numOfReviews
        },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            })
        res.status(200).json({
            success: true,
        })
    })
}

export default new Products();