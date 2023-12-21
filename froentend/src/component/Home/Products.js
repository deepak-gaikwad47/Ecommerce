import { Pagination, Slider, Typography } from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Actions/productAction";
import Loader from "../layout/Loader/Loader";
import { SnackContext } from "../SnackbarContext/Snackbar";
import ProductCard from "./ProductCard";
import './products.css'

const Products = () => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000])

    const { products, loading, error, productCount, resultPerPage, filteredProductCount } = useSelector((state) => state.products
    );
    const { error: userError } = useSelector((state) => state.user
    );

    const count = productCount / resultPerPage;

    const setCurrentPageNo = (e, page) => {
        setCurrentPage(page)
    }

    const priceHandler = (e, newPrice) => {
        setPrice(newPrice)
    }

    const openSnackbar = useContext(SnackContext)
    useEffect(() => {
        if (userError) {
            openSnackbar({ message: userError, status: 'error' });
        }
        if (error) {
            openSnackbar({ message: error, status: 'error' });
        }
        dispatch(getProducts(currentPage, price))
    }, [dispatch, currentPage, price, error, userError])

    return (<Fragment>
        {loading ? <Loader /> :
            <Fragment>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {products && products.map((product) => {
                        return <ProductCard key={product._id} product={product} />
                    })}
                </div>
                <div className="filterBox">
                    <Typography>Price</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                </div>
                {resultPerPage < filteredProductCount &&
                    (<div className="pagination">
                        <Pagination
                            count={Math.ceil(count)}
                            size='large'
                            page={currentPage}
                            onChange={setCurrentPageNo}
                            sx={{
                                justifyContent: 'center',
                                display: 'flex',
                                width: '800px'
                            }} />
                    </div>)
                }

            </Fragment>}
    </Fragment>)

}

export default Products;