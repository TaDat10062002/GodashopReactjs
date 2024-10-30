import { useState, CSSProperties } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import BounceLoader from 'react-spinners/BounceLoader';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            mobile: '',
            content: ''
        },

        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng nhập họ và tên'),
            email: Yup.string().required('Vui lòng nhập vào email').email('Email không hợp lệ!'),
            mobile: Yup.string().required('Vui long nhập số điện thoại'),
            content: Yup.string().required('Vui long nhập vào nội dung bên dưới!')
        }),

        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await axios.post(`http://api.godashopk106.com/api/v1/sendEmail`, JSON.stringify(values));
                toast.success(`${response.data}`);
                setLoading(false);
            } catch (error) {

            }
        }
    })
    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Trang chủ</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Liên hệ</span></li>
                            </ol>
                        </div>
                    </div>
                    <div className="row contact">
                        <div className="col-md-6">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4981304733305!2d106.62440891371494!3d10.773108292323755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dcdd60efd3f%3A0x8e16362a8a43158e!2zVGjhuqd5IEzhu5ljIGThuqF5IGzhuq1wIHRyw6xuaCB3ZWI!5e0!3m2!1svi!2s!4v1570486606187!5m2!1svi!2s" width="100%" height="400px" frameBorder={0} style={{ border: 0 }} allowFullScreen='' />
                        </div>
                        <div className="col-md-6">
                            <h4>Thông tin liên hệ</h4>
                            <form onSubmit={formik.handleSubmit} className="form-contact" method="POST">
                                <div className="form-group">
                                    <input type="text" className="form-control" name="fullname" placeholder="Họ và tên" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullname} />
                                    {
                                        formik.touched.fullname && formik.errors.fullname ? <div className="text-danger">{formik.errors.fullname}</div> : null
                                    }
                                </div>
                                <div className="row">
                                    <div className="form-group col-sm-6">
                                        <input type="email" className="form-control" name="email" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                        {
                                            formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null
                                        }
                                    </div>
                                    <div className="form-group col-sm-6">
                                        <input type="tel" className="form-control" name="mobile" placeholder="Số điện thoại" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                        {
                                            formik.touched.mobile && formik.errors.mobile ? <div className="text-danger">{formik.errors.mobile}</div> : null
                                        }
                                    </div>
                                    <div className="form-group col-sm-12">
                                        <textarea className="form-control" placeholder="Nội dung" name="content" rows={10} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.content} />
                                        {
                                            formik.touched.content && formik.errors.content ? <div className="text-danger">{formik.errors.content}</div> : null
                                        }
                                    </div>

                                    {
                                        loading ?
                                            <div className='form-group col-sm-12'>
                                                <BounceLoader
                                                    size={30}
                                                    color='#77d151'
                                                />
                                                <div style={{ margin: '-25px 35px' }}>Hệ thống đang gởi mail. Vui lòng chờ!</div>
                                            </div>
                                            : null

                                    }
                                    <div className="form-group col-sm-12">
                                        <button type="submit" className="btn btn-sm btn-primary pull-right">Gửi</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </main >

        </>
    );
}
