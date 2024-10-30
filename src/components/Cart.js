import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CART, POPUP_CLOSE } from '../constant/PopupConstant';
import { getProductDetailLinks } from '../helper/utils';
import { Link } from 'react-router-dom';
import { DELETE_FROM_CART, UPDATE_TO_CART } from '../constant/CartConstant';

export default function Cart() {
    const popup_type = useSelector(state => state.PopupReducer.popup_type);
    const fade = popup_type === POPUP_CART ? '' : 'fade';
    const display = popup_type === POPUP_CART ? 'block' : 'none';
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const totalPrice = cartItems.reduce((total, item) => total + Number(item.sale_price * item.qty), 0);
    const handleClosePopup = () => {
        const action = { type: POPUP_CLOSE };
        dispatch(action);
    }

    const handleUpdateToCart = async (id, number) => {
        const action = {
            type: UPDATE_TO_CART,
            payload: {
                id: id,
                qty: number
            }
        }
        dispatch(action);
    }

    const handleDeleteProductInCart = (id) => {
        const action = {
            type: DELETE_FROM_CART,
            payload: { id: id }
        }
        dispatch(action);
    }

    return (
        <>
            <div className={'modal' + fade} id="modal-cart-detail" role="dialog" style={{ display: display }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-color">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => handleClosePopup()}>x</button>
                            <h3 className="modal-title text-center">Giỏ hàng</h3>
                        </div>
                        <div className="modal-body">
                            <div className="page-content">
                                <div className="clearfix hidden-sm hidden-xs">
                                    <div className="col-xs-1">
                                    </div>
                                    <div className="col-xs-3">
                                        <div className="header">
                                            Sản phẩm
                                        </div>
                                    </div>
                                    <div className="col-xs-2">
                                        <div className="header">
                                            Đơn giá
                                        </div>
                                    </div>
                                    <div className="label_item col-xs-3">
                                        <div className="header">
                                            Số lượng
                                        </div>
                                    </div>
                                    <div className="col-xs-2">
                                        <div className="header">
                                            Thành tiền
                                        </div>
                                    </div>
                                    <div className="lcol-xs-1">
                                    </div>
                                </div>
                                <div className="cart-product">
                                    {
                                        cartItems.map((cartItem, index) =>
                                            <Fragment>
                                                <hr />
                                                <div className="clearfix text-left">
                                                    <div className="row">
                                                        <div className="col-sm-6 col-md-1">
                                                            <div><img className="img-responsive" src={cartItem.featured_image} alt="Kem làm trắng da 5 trong 1 Beaumore Secret Whitening Cream " /></div>
                                                        </div>
                                                        <div className="col-sm-6 col-md-3"><Link className="product-name" to={getProductDetailLinks(cartItem)} onClick={() => handleClosePopup()}>{cartItem.name}</Link></div>
                                                        <div className="col-sm-6 col-md-2"><span className="product-item-discount">{Number(cartItem.sale_price).toLocaleString('vi-VN')}₫</span></div>
                                                        <div className="col-sm-6 col-md-3"><input type="number" onChange={(e) => handleUpdateToCart(cartItem.id, e.target.value)} min={1} value={cartItem.qty} /></div>
                                                        <div className="col-sm-6 col-md-2"><span>{Number(cartItem.sale_price * cartItem.qty).toLocaleString('vi-VN')}₫</span></div>
                                                        <div className="col-sm-6 col-md-1"><Link className="remove-product" to="#" onClick={() => handleDeleteProductInCart(cartItem.id)}><span className="glyphicon glyphicon-trash" /></Link></div>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <div className="clearfix">
                                <div className="col-xs-12 text-right">
                                    <p>
                                        <span>Tổng tiền</span>
                                        <span className="price-total">{Number(totalPrice).toLocaleString('vi-VN')}₫</span>
                                    </p>
                                    <Link to='/san-pham.html' name="back-shopping" className="btn btn-default" onClick={() => handleClosePopup()} >Tiếp tục mua sắm</Link>
                                    {
                                        cartItems.length === 0 ? '' :
                                            <Link to='dat-hang.html' name="checkout" className="btn btn-primary" onClick={() => handleClosePopup()}>Đặt hàng</Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}
