import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POPUP_CLOSE, POPUP_REGISTER } from '../constant/PopupConstant';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RegisterForm() {
    const popup_type = useSelector(state => state.PopupReducer.popup_type);
    const fade = popup_type === POPUP_REGISTER ? '' : 'fade';
    const display = popup_type === POPUP_REGISTER ? 'block' : 'none';
    const dispatch = useDispatch();

    const handleClosePopup = () => {
        const action = { type: POPUP_CLOSE }
        dispatch(action);
    }

    // tao ham tra ve true false, neu true la tk moi, false la tai khoan da ton tai
    const checkNotExistingEmail = async (email) => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/notExistingEmail/${email}`)
            return response.data;
        } catch (error) {

        }
    }
    const formik = useFormik({
        initialValues: {
            fullname: '',
            mobile: '',
            email: '',
            password: '',
            password_confirmation: '',
            recaptcha: ''
        },

        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng nhập họ tên của bạn'),
            mobile: Yup.string().required('Vui lòng nhập số điện thoại của bạn').matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, 'Vui lòng nhập đúng số điện thoại. vd: 0927982499'),
            email: Yup.string().required('Vui lòng nhập Email').email('Vui lòng nhập đúng định dạng Email')
                // 3 parameters: ten, content, va gia tri
                .test('checkNotExistingEmail', 'Email này đã tồn tại vui lòng sử dụng email khác',
                    async (values) => {
                        const notExistingEmail = await checkNotExistingEmail(values);
                        return notExistingEmail;
                    }
                ),
            password: Yup.string().required('Vui lòng nhập mật khẩu').matches('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$', 'Vui lòng nhập ít nhất 8 kí tự, 1 kí tự hoa, 1 kí tự thường, số và kí tự đặc biệt'),
            password_confirmation: Yup.string().required('Vui lòng xác nhận mật khẩu').oneOf([Yup.ref('password')], 'Mật khẩu không trùng khớp'),
            recaptcha: Yup.string().required('Vui lòng xác nhận tôi không phải là Robot')
        }),

        onSubmit: async (values) => {
            try {
                handleClosePopup();
                const response = await axios.post(`http://api.godashopk106.com/api/v1/registers`, JSON.stringify(values));
                toast.success(response.data.message);
            } catch (error) {
                toast.error(error.response.data || error.message);
            }
        }

    })

    return (
        <>
            <div className={'modal' + fade} id="modal-register" role="dialog" style={{ display: display }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-color">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={() => handleClosePopup()}>×</button>
                            <h3 className="modal-title text-center">Đăng ký</h3>
                        </div>
                        <form onSubmit={formik.handleSubmit} method="POST">
                            <div className="modal-body">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="fullname" placeholder="Họ và tên" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullname} />
                                    {
                                        formik.touched.fullname && formik.errors.fullname ?
                                            <div className='text-danger'>{formik.errors.fullname}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="tel" className="form-control" name="mobile" placeholder="Số điện thoại" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                    {
                                        formik.touched.mobile && formik.errors.mobile ?
                                            <div className='text-danger'>{formik.errors.mobile}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                    {
                                        formik.touched.email && formik.errors.email ?
                                            <div className='text-danger'>{formik.errors.email}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" placeholder="Mật khẩu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                                    {
                                        formik.touched.password && formik.errors.password ?
                                            <div className='text-danger'>{formik.errors.password}</div> : null
                                    }
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password_confirmation" placeholder="Nhập lại mật khẩu" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password_confirmation} />
                                    {
                                        formik.touched.password_confirmation && formik.errors.password_confirmation ?
                                            <div className='text-danger'>{formik.errors.password_confirmation}</div> : null
                                    }
                                </div>
                                <ReCAPTCHA
                                    sitekey="6LdWfz8qAAAAADjvvSbbWJv5w2gGDjinLyis0o_y"
                                    onChange={(val) => formik.setFieldValue('recaptcha', val)}
                                    name='recaptcha'
                                    value={formik.values.recaptcha}
                                    onBlur={formik.handleBlur} />
                                {
                                    formik.touched.recaptcha && formik.errors.recaptcha ?
                                        <div className='text-danger'>{formik.errors.recaptcha}</div> : null
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={() => handleClosePopup()}>Hủy</button>
                                <button type="submit" className="btn btn-primary">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
}
