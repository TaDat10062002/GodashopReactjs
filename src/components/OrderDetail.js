import React, { Fragment } from 'react';

export default function OrderDetail({ order }) {
    // let total = 0;
    // for (const item of order.order_items) {
    //     total += Number(item.total_price);
    // }

    const sub_total = order.order_items.reduce((total, item) => total + Number(item.total_price * item.qty), 0)

    console.log(order.payment_method);
    return (
        <>
            <div className="col-md-9 order-info">
                <div className="row">
                    <div className="col-xs-6">
                        <h4 className="home-title">Đơn hàng #{order.id}</h4>
                    </div>
                    <div className="clearfix" />
                    <aside className="col-md-7 cart-checkout">
                        {
                            order.order_items.map((order_item, index) =>
                                <Fragment key={index}>
                                    <div className="row">
                                        <div className="col-xs-2">
                                            <img className="img-responsive" src={order_item.product.featured_image} alt="Sữa tắm Sandras Mỹ chai 250ml" />
                                        </div>
                                        <div className="col-xs-7">
                                            <a className="product-name" href="chi-tiet-san-pham.html">{order_item.product.name}</a>
                                            <br />
                                            <span>{order_item.qty}</span> x <span>{Number(order_item.unit_price).toLocaleString('vi-VN')}₫</span>
                                        </div>
                                        <div className="col-xs-3 text-right">
                                            <span>{Number(order_item.total_price).toLocaleString('vi-VN')}₫</span>
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
                                {Number(order.shipping_fee).toLocaleString('vi-VN')}₫
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-xs-6">
                                Tổng cộng
                            </div>
                            <div className="col-xs-6 text-right">
                                {Number(sub_total + Number(order.shipping_fee)).toLocaleString('vi-VN')}₫
                            </div>
                        </div>
                    </aside>
                    <div className="ship-checkout col-md-5">
                        <h4>Thông tin giao hàng</h4>
                        <div>
                            Họ và tên: {order.shipping_fullname}
                        </div>
                        <div>
                            Số điện thoại: {order.shipping_mobile}
                        </div>
                        <div>
                            {order.province_name}
                        </div>
                        <div>
                            {order.district_name}
                        </div>
                        <div>
                            {order.ward_name}
                        </div>
                        <div>
                            {order.shipping_housenumber_street}
                        </div>
                        <div>
                            Phương thức thanh toán: {order.payment_method === '0' ? 'COD' : 'BANK'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
