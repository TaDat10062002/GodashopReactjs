import React, { useEffect, useState } from 'react';
import AccountSideBar from '../components/AccountSideBar';
import { axiosAuthInstance } from '../helper/utils';
import OrderList from '../components/OrderList';

export default function OrderPage() {
    const [orders, setOrders] = useState([]);

    const getOrders = async () => {
        const resposne = await axiosAuthInstance().get(`http://api.godashopk106.com/api/v1/orders`);
        setOrders(resposne.data);
    }

    useEffect(() => {
        getOrders();
    }, [])

    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Trang chủ</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Tài khoản</span></li>
                            </ol>
                        </div>
                        <div className="clearfix" />
                        <AccountSideBar />
                        <div className="col-md-9 order">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Đơn hàng của tôi</h4>
                                </div>
                                <div className="clearfix" />
                                <div className="col-md-12">
                                    {/* Mỗi đơn hàng */}
                                    <OrderList orders={orders} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
