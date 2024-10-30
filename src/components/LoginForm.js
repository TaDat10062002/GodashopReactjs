import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, POPUP_FORGOT_PASSWORD, POPUP_LOGIN, POPUP_REGISTER } from '../constant/PopupConstant';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN } from '../constant/AuthConstant';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const popup_type = useSelector(state => state.PopupReducer.popup_type);
    const fade = popup_type === POPUP_LOGIN ? '' : 'fade';
    const display = popup_type === POPUP_LOGIN ? 'block' : 'none';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClosePopup = () => {
        const action = { type: POPUP_CLOSE };
        dispatch(action);
    }

    const handlePopupRegister = () => {
        const action = { type: POPUP_REGISTER }
        dispatch(action);
    }

    const handlePopupForgotPassword = (e) => {
        e.preventDefault();
        const action = { type: POPUP_FORGOT_PASSWORD }
        dispatch(action);
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().required('Email là bắt buộc').email('Email không đúng định dạng'),
            password: Yup.string().required('Mật khẩu là bắt buộc')
        }),

        onSubmit: async (values) => {
            try {
                const response = await axios.post(`http://api.godashopk106.com/api/v1/login`, JSON.stringify(values));
                toast.success(`Đăng nhập thành công với tư cách ${response.data.user.name}`);
                const data = response.data;
                const user = data.user;
                const access_token = data.access_token;
                const action = {
                    type: LOGIN,
                    payload: {
                        access_token: access_token,
                        loggedUser: user
                    }
                }
                dispatch(action);
                navigate('/thong-tin-tai-khoan.html');
            } catch (error) {
                toast.error(error.response.data || error.message);
            }
        }
    })

    return (
        <>
            <div className={'modal' + fade} id="modal-login" role="dialog" style={{ display: display }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-color">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => handleClosePopup()} >×</button>
                            <h3 className="modal-title text-center">Đăng nhập</h3>
                            {/* Google login */}
                            <br />
                            <div className="text-center">
                                <Link className="btn btn-primary google-login" to="#"><i className="fab fa-google" /> Đăng nhập bằng Google</Link>
                                {/* Facebook login */}
                                <Link className="btn btn-primary facebook-login" to="#"><i className="fab fa-facebook-f" /> Đăng nhập bằng Facebook</Link>
                            </div>
                        </div>
                        <form onSubmit={formik.handleSubmit} method="POST" role="form">
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="email" name="email" className="form-control" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                    {
                                        formik.touched.email && formik.errors.email ?
                                            <div className="text-danger">{formik.errors.email}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password" name="password" className="form-control" placeholder="Mật khẩu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                    {
                                        formik.touched.password && formik.errors.password ?
                                            <div className="text-danger">{formik.errors.password}</div> : null
                                    }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary" onClick={() => handleClosePopup()}>Đăng Nhập</button><br />
                                <div className="text-left">
                                    <Link to="#" className="btn-register" onClick={() => handlePopupRegister()}>Bạn chưa là thành viên? Đăng kí ngay!</Link>
                                    <Link to="#" className="btn-forgot-password" onClick={(e) => handlePopupForgotPassword(e)}>Quên Mật Khẩu?</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
