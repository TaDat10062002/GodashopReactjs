import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { axiosAuthInstance, getProductDetailLinks } from '../helper/utils';
import DeliveryInfo from '../components/DeliveryInfo';
import { useNavigate } from 'react-router-dom';
import { EMPTY_CART } from '../constant/CartConstant';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);
    const sub_total = cartItems.reduce((total, item) => total + Number(item.sale_price * item.qty), 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitOrder = async (values) => {
        try {
            const data = {
                loggedUser: loggedUser,
                deliveryInfo: values,
                cartItems: cartItems
            }

            await axiosAuthInstance().post(`http://api.godashopk106.com/api/v1/orders`, JSON.stringify(data));

            const action = {
                type: EMPTY_CART
            }
            dispatch(action);
            toast.success('Đặt hàng thành công');
            navigate('/don-hang-cua-toi.html');
        } catch (error) {

        }
    }

    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Giỏ hàng</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Thông tin giao hàng</span></li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <aside className="col-md-6 cart-checkout">
                            {
                                cartItems.map((cartItem, index) =>
                                    <Fragment>
                                        <div className="row" key={index}>
                                            <div className="col-xs-2">
                                                <img className="img-responsive" src={cartItem.featured_image} alt="Sữa rửa mặt nghệ Beaumore Mới- 100g" />
                                            </div>
                                            <div className="col-xs-7">
                                                <a className="product-name" href={getProductDetailLinks(cartItem)}>{cartItem.name}</a>
                                                <br />
                                                <span>{cartItem.qty}</span> x <span>{Number(cartItem.sale_price).toLocaleString('vi-VN')}₫</span>
                                            </div>
                                            <div className="col-xs-3 text-right">
                                                <span>{Number(cartItem.sale_price * cartItem.qty).toLocaleString('vi-VN')}₫</span>
                                            </div>
                                        </div>
                                        <hr />
                                    </Fragment>
                                )
                            }
                            <div className="row">
                                <div className="col-xs-6">
                                    Tạm tính
                                </div>
                                <div className="col-xs-6 text-right">
                                    {Number(sub_total).toLocaleString('vi-VN')}₫
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-6">
                                    Phí vận chuyển
                                </div>
                                <div className="col-xs-6 text-right">
                                    <span className="shipping-fee" data>50,000₫</span>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-xs-6">
                                    Tổng cộng
                                </div>
                                <div className="col-xs-6 text-right">
                                    <span className="payment-total" data={1230000}>{Number(sub_total + 50000).toLocaleString('vi-VN')}₫</span>
                                </div>
                            </div>
                        </aside>
                        <div className="ship-checkout col-md-6">
                            <h4>Thông tin giao hàng</h4>
                            <br />
                            <DeliveryInfo handleSubmit={handleSubmitOrder} />
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
