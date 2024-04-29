import React, { Fragment, useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import ProductCard from './ProductCard';
import './Home.css';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';
import { Link, Element } from 'react-scroll'; // Import Link and Element from react-scroll
import {Api} from '../../constants/apiLink'
const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProduct());
        
    }, [dispatch, error, alert]);
console.log(Api,"api")
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="ECOMMERCE" />
                    <div className="banner">
                        <p>Welcome To Ecommerce</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <Link to="container" smooth={true} duration={800}> {/* Use Link for smooth scrolling */}
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </Link>
                    </div>
                    <h2 className="homeHeading"> Featured Products</h2>
                    <Element name="container" className="container"> {/* Use Element to define the scrollable container */}
                        {products &&
                            products?.map(product => (
                                <ProductCard product={product} key={product?._id} />
                            ))}
                    </Element>
                </Fragment>
            )}
        </Fragment>
    );
};

export default Home;
