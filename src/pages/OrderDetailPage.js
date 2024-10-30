import React, { useEffect, useState } from 'react';
import AccountSideBar from '../components/AccountSideBar';
import { useParams } from 'react-router-dom';
import { axiosAuthInstance, getOrderId } from '../helper/utils';
import OrderDetail from '../components/OrderDetail';
import Loading from '../components/Loading';

export default function OrderDetailPage() {
    const { slug } = useParams();
    const [order, setOrder] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const orderId = getOrderId(slug);
    const getOrder = async () => {
        const response = await axiosAuthInstance().get(`http://api.godashopk106.com/api/v1/orders/${orderId}`);
        setOrder(response.data);
        setIsLoaded(true);
    }

    useEffect(() => {
        getOrder();
        // eslint-disable-next-line
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
                        {
                            isLoaded ?
                                <OrderDetail order={order} />
                                : <Loading />
                        }
                    </div>
                </div>
            </main>

        </>
    );
}
