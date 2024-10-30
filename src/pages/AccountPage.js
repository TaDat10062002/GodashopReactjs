import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { UPDATE_LOGGED_USER } from '../constant/AuthConstant';
import { toast } from 'react-toastify';
import { axiosAuthInstance } from '../helper/utils';
import { useNavigate } from 'react-router-dom';

export default function AccountPage() {
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            fullname: loggedUser.name,
            mobile: loggedUser.mobile,
            current_password: '',
            password: '',
            password_confirmation: '',
        },

        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng nhập họ tên của bạn'),
            mobile: Yup.string().required('Vui lòng nhập số điện thoại').matches(/^0([0-9]{9,9})$/, 'Vui lòng nhập đúng số điện thoại vd: 0927982499'),
            password: Yup.string().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Vui lòng nhập ít nhất 8 kí tự hoa, kí tự thường, số và kí tự đặc biệt'),
            password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),

            // current password
            current_password: Yup.string().when('password', {
                // kiem tra trong password co gia tri khong 
                is: (password) => password && password.length > 0,
                // neu co password thi vao then, va hien thi vui long nhap mat khau hien tai
                then: (schema) => schema.required('Vui lòng nhập mật khẩu hiện tại'),
                // nguoc lai se khong hien thi gi het
                otherwise: (schema) => schema.notRequired(),
            })
        }),

        onSubmit: async (values) => {
            try {
                const response = await axiosAuthInstance().patch(`http://api.godashopk106.com/api/v1/customers/${loggedUser.id}/account`, JSON.stringify(values));
                console.log(response);
                const data = response.data;
                const action = {
                    type: UPDATE_LOGGED_USER,
                    payload: { loggedUser: data }
                };
                dispatch(action);
                toast.success('Cập nhật tài khoản thành công');
                navigate('/thong-tin-tai-khoan.html');
            } catch (error) {
                toast.error(error.response.data || error.message);
            }
        }
    })
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
                                        <li className="active">
                                            <a href="thong-tin-tai-khoan.html" title="Thông tin tài khoản" target="_self">Thông tin tài khoản
                                            </a>
                                        </li>
                                        <li className>
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
                                    <h4 className="home-title">Thông tin tài khoản</h4>
                                </div>
                                <div className="clearfix" />
                                <div className="col-md-6">
                                    <form onSubmit={formik.handleSubmit} className="info-account" method="POST">
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="fullname" placeholder="Họ và tên" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullname} />
                                            {
                                                formik.touched.fullname && formik.errors.fullname ? <div className="text-danger">{formik.errors.fullname}</div> : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input type="tel" className="form-control" name="mobile" placeholder="Số điện thoại" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                            {
                                                formik.touched.mobile && formik.errors.mobile ? <div className="text-danger">{formik.errors.mobile}</div> : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="current_password" placeholder="Mật khẩu hiện tại" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.current_password} />
                                            {
                                                formik.touched.current_password && formik.errors.current_password ? <div className="text-danger">{formik.errors.current_password}</div> : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password" placeholder="Mật khẩu mới" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                            {
                                                formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control" name="password_confirmation" placeholder="Nhập lại mật khẩu mới" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password_confirmation} />
                                            {
                                                formik.touched.password_confirmation && formik.errors.password_confirmation ? <div className="text-danger">{formik.errors.password_confirmation}</div> : null
                                            }
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary pull-right">Cập nhật</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
}
