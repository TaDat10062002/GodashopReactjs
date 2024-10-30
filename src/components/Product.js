import React from 'react';
import { Link } from 'react-router-dom';
import { getProductDetailLinks } from '../helper/utils';
import axios from 'axios';
import { ADD_TO_CART } from '../constant/CartConstant';
import { useDispatch } from 'react-redux';

export default function Product({ product }) {
    const dispatch = useDispatch();
    const handleAddToCart = async (id) => {
        const response = await axios.get(`http://api.godashopk106.com/api/v1/products/${id}`);
        const product = response.data;
        const action = {
            type: ADD_TO_CART,
            payload: {
                id: product.id,
                name: product.name,
                featured_image: product.featured_image,
                sale_price: product.sale_price,
                qty: 1
            }
        }
        dispatch(action);
    }
    return (
        <>
            <div className="product-container">
                <div className="image">
                    <img className="img-responsive" src={product.featured_image} alt="" />
                </div>
                <div className="product-meta">
                    <h5 className="name">
                        <Link className="product-name" to={getProductDetailLinks(product)} title="Kem làm trắng da 5 trong 1 Beaumore Secret Whitening Cream">{product.name}</Link>
                    </h5>
                    <div className="product-item-price">
                        {
                            product.price !== product.sale_price ?
                                <>
                                    <span className="product-item-regular"> {Number(product.price).toLocaleString('vi-VN')}₫</span>
                                    <span className="product-item-discount">{Number(product.sale_price).toLocaleString('vi-VN')}₫</span>
                                </>
                                : <span className="product-item-discount"> {Number(product.price).toLocaleString('vi-VN')}₫</span>
                        }
                    </div>
                </div>
                <div className="button-product-action clearfix">
                    {
                        product.inventory_qty > 0 ?
                            <div className="cart icon">
                                <Link className="btn btn-outline-inverse buy" product-id={2} to="javascript:void(0)" title="Thêm vào giỏ" onClick={() => handleAddToCart(product.id)}>
                                    Thêm vào giỏ <i className="fa fa-shopping-cart" />
                                </Link>
                            </div> : null
                    }
                    <div className="quickview icon">
                        <Link className="btn btn-outline-inverse" to={getProductDetailLinks(product)} title="Xem nhanh">
                            Xem chi tiết <i className="fa fa-eye" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
