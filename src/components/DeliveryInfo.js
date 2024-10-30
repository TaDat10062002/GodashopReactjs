import { useFormik } from 'formik';
import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { axiosAuthInstance } from '../helper/utils';

export default function DeliveryInfo({ handleSubmit }) {
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);
    const [wards, setWards] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const site = window.location.pathname;

    const initialValues = {
        fullname: loggedUser.shipping_name,
        mobile: loggedUser.shipping_mobile,
        address: loggedUser.housenumber_street,
        province: loggedUser.province_id,
        district: loggedUser.district_id,
        ward: loggedUser.ward_id,
    }

    // neu la trang check out thi them thuoc tinh nay
    if (site === '/dat-hang.html') {
        initialValues.payment_method = '0'
    }

    const formik = useFormik({
        initialValues: initialValues,

        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng nhập họ và tên'),
            mobile: Yup.string().required('Vui lòng nhập số điện thoại'),
            address: Yup.string().required('Vui lòng nhập vào địa chỉ').max(50, 'Vui lòng không nhập quá 50 ký tự'),
            province: Yup.string().required('Vui lòng chọn Tỉnh / thành phố'),
            district: Yup.string().required('Vui lòng chọn Quận / huyện'),
            ward: Yup.string().required('Vui lòng chọn Phường / xã'),
        }),

        onSubmit: async (values) => {
            handleSubmit(values);
        }
    })

    const getProvinces = async () => {
        try {
            const response = await axiosAuthInstance().get(`http://api.godashopk106.com/api/v1/provinces`);
            setProvinces(response.data);
        } catch (error) {

        }
    }

    const getDistricts = async (province_id) => {
        try {
            const response = await axiosAuthInstance().get(`http://api.godashopk106.com/api/v1/districts/province/${province_id}`);
            setDistricts(response.data);
        } catch (error) {

        }
    }

    const getWards = async (district_id) => {
        try {
            const response = await axiosAuthInstance().get(`http://api.godashopk106.com/api/v1/wards/district/${district_id}`);
            setWards(response.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getProvinces();
        if (loggedUser.province_id && loggedUser.district_id) {
            getDistricts(loggedUser.province_id);
            getWards(loggedUser.district_id);
        }
        // eslint-disable-next-line
    }, []);


    // handle change province -> update district
    const handleChangeProvince = (e) => {
        formik.handleChange(e);
        if (e.target.value === '') {
            formik.setFieldValue('district', '');
            setDistricts([]);
            formik.setFieldValue('ward', '');
            setWards([]);
            return;
        }
        getDistricts(e.target.value);
        setWards([]);
        formik.setFieldValue('ward', '');
    }

    // handle change district -> ward
    const handleChangeDistrict = (e) => {
        formik.handleChange(e);
        if (e.target.value === '') {
            formik.setFieldValue('ward', '');
            setWards([]);
            return;
        }
        getWards(e.target.value);
    }

    // shippingFee later

    return (
        <>
            <form onSubmit={formik.handleSubmit} method="POST">
                <div className="row">
                    <div className="form-group col-sm-6">
                        <input type="text" className="form-control" name="fullname" placeholder="Họ và tên" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullname} />
                        {
                            formik.touched.fullname && formik.errors.fullname ?
                                <div className='text-danger'>
                                    {formik.errors.fullname}
                                </div> : null
                        }
                    </div>
                    <div className="form-group col-sm-6">
                        <input type="tel" defaultValue={'0932538468'} className="form-control" name="mobile" placeholder="Số điện thoại" onChange={(e) => handleChangeDistrict(e)} onBlur={formik.handleBlur} value={formik.values.mobile} />
                        {
                            formik.touched.mobile && formik.errors.mobile ?
                                <div className='text-danger'>
                                    {formik.errors.mobile}
                                </div> : null
                        }
                    </div>
                    <div className="form-group col-sm-4">
                        <select name="province" className="form-control province" onChange={(e) => handleChangeProvince(e)} onBlur={formik.handleBlur} value={formik.values.province}>
                            <option value=''>Tỉnh / thành phố</option>
                            {
                                provinces.map((province, index) =>
                                    <option value={province.id} key={index}>{province.name}</option>
                                )
                            }
                        </select>
                        {
                            formik.errors.province ?
                                <div className='text-danger'>
                                    {formik.errors.province}
                                </div> : null
                        }
                    </div>
                    <div className="form-group col-sm-4">
                        <select name="district" className="form-control district" onChange={(e) => handleChangeDistrict(e)} onBlur={formik.handleBlur} value={formik.values.district}>
                            <option value=''>Quận / huyện</option>
                            {
                                districts.map((district, index) =>
                                    <option value={district.id} key={index}>{district.name}</option>
                                )
                            }
                        </select>
                        {
                            formik.touched.district && formik.errors.district ?
                                <div className='text-danger'>
                                    {formik.errors.district}
                                </div> : null
                        }
                    </div>
                    <div className="form-group col-sm-4">
                        <select name="ward" className="form-control ward" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.ward}>
                            <option value=''>Phường / xã</option>
                            {
                                wards.map((ward, index) =>
                                    <option value={ward.id} key={index}>{ward.name}</option>
                                )
                            }
                        </select>
                        {
                            formik.errors.ward ?
                                <div className='text-danger'>
                                    {formik.errors.ward}
                                </div> : null
                        }
                    </div>
                    <div className="form-group col-sm-12">
                        <input type="text" className="form-control" placeholder="Địa chỉ" name="address" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.address} />
                        {
                            formik.touched.address && formik.errors.address ?
                                <div className='text-danger'>
                                    {formik.errors.address}
                                </div> : ''
                        }
                    </div>
                </div>
                {
                    site === '/dat-hang.html' ?
                        <Fragment>
                            <h4>Phương thức thanh toán</h4>
                            <div className="form-group">
                                <label> <input type="radio" name="payment_method" checked={formik.values.payment_method === '0' ? true : false} value={0} onChange={formik.handleChange} /> Thanh toán khi giao hàng (COD) </label>
                                <div />
                            </div>
                            <div className="form-group">
                                <label> <input type="radio" name="payment_method" checked={formik.values.payment_method === '1' ? true : false} value={1} onChange={formik.handleChange} /> Chuyển khoản qua ngân hàng </label>
                                <div className="bank-info">STK: 0421003707901<br />Chủ TK: Nguyễn Hữu Lộc. Ngân hàng: Vietcombank TP.HCM <br />
                                    Ghi chú chuyển khoản là tên và chụp hình gửi lại cho shop dễ kiểm tra ạ
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-sm btn-primary pull-right">Hoàn tất đơn hàng</button>
                            </div>
                        </Fragment>
                        : <button type="submit" className="btn btn-lg btn-primary pull-right">Cập nhật</button>
                }
            </form>
        </>
    );
}
