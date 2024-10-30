import React from 'react';
import DeliveryInfo from '../components/DeliveryInfo';
import { axiosAuthInstance } from '../helper/utils';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UPDATE_LOGGED_USER } from '../constant/AuthConstant';

export default function ShippingDefaultPage() {
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);
    const dispatch = useDispatch();
    const handleShippingAddress = async (values) => {
        try {
            const response = await axiosAuthInstance().patch(`http://api.godashopk106.com/api/v1/customers/${loggedUser.id}/shipping`, JSON.stringify(values));
            toast.success('Cập nhật địa chỉ giao hàng thành công');
            const action = {
                type: UPDATE_LOGGED_USER,
                payload: {
                    loggedUser: response.data
                }
            }
            dispatch(action);
        } catch (error) {

        }
    }
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
                        <aside className="col-md-3">
                            <div className="inner-aside">
                                <div className="category">
                                    <ul>
                                        <li>
                                            <a href="thong-tin-tai-khoan.html" title="Thông tin tài khoản" target="_self">Thông tin tài khoản
                                            </a>
                                        </li>
                                        <li className="active">
                                            <a href="dia-chi-giao-hang-mac-dinh.html" title="Địa chỉ giao hàng mặc định" target="_self">Địa chỉ giao hàng mặc định
                                            </a>
                                        </li>
                                        <li className>
                                            <a href="don-hang-cua-toi.html" target="_self">Đơn hàng của tôi
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </aside>
                        <div className="col-md-9 account">
                            <div className="row">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Địa chỉ giao hàng mặc định</h4>
                                </div>
                                <div className="clearfix" />
                                <div className="col-md-12">
                                    <DeliveryInfo handleSubmit={handleShippingAddress} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
