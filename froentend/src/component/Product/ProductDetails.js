import React, { Fragment, useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Carousel from 'react-material-ui-carousel';
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../Actions/productAction";
import Loader from "../layout/Loader/Loader";
import { SnackContext } from "../SnackbarContext/Snackbar";
import "./ProductDetail.css";
import ReviewCard from "./ReviewCard.js"

const ProductDetails = (props) => {
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetails);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const openSnackBar = useContext(SnackContext)
    useEffect(() => {
        if (error) {
            openSnackBar({ message: error, status: 'error' })
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, id]);
    const options = {
        edit: false,
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };
    const decreaseQuantity = () => {
        if (1 >= quantity) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };
    const addToCartHandler = () => {
        // dispatch(addItemsToCart(match.params.id, quantity));
        // alert.success("Item Added To Cart");
    };

    const submitReviewToggle = () => {

    }
    return (
        <>
            {loading ? (<Loader />) :
                (<Fragment>
                    <div className="ProductDetails">
                        <Carousel>
                            {product.images &&
                                product.images.map((item, i) => (
                                    <img
                                        className="CarouselImage"
                                        key={i}
                                        src={item.url}
                                        alt={`${i} Slide`}
                                    />
                                ))}
                        </Carousel>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{product.name}</h2>
                                <p>Product # {product._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStars {...options} />
                                <span className="detailsBlock-2-span">
                                    {" "}
                                    ({product.numOfReviews} Reviews)
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        {quantity}
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.Stock < 1 ? true : false}
                                        onClick={addToCartHandler}
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                <p>
                                    Status:
                                    <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                                    </b>
                                </p>
                            </div>

                            <div className="detailsBlock-4">
                                Description : <p>{product.description}</p>
                            </div>

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>
                    <h3 className="reviewsHeading">REVIEWS</h3>
                    {product.reviews && product.reviews[0] ? (
                        <div className="reviews">
                            {product.reviews.map(review => <ReviewCard review={review} />)}
                        </div>) : (<p className="noReviews">No reviews yet</p>)}

                </Fragment >)}
        </>
    )
}

export default ProductDetails;