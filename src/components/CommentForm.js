import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { getProductId } from '../helper/utils';
import { useParams } from 'react-router-dom';
import CommentList from './CommentList';
import ReactStars from "react-rating-stars-component";

export default function CommentForm({ product }) {
    const [comments, setComments] = useState([]);

    const getComments = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/products/${product.id}/comments`);
            setComments(response.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getComments();
        // eslint-disable-next-line
    }, [])

    const formik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            description: '',
            rating: 4
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required('Vui lòng nhập họ tên của bạn'),
            email: Yup.string().required('Vui lòng nhập email').email('Email không hợp lệ'),
            description: Yup.string().required('Vui lòng nhập nội dung')
        }),


        onSubmit: async (values) => {
            try {
                await axios.post(`http://api.godashopk106.com/api/v1/products/${product.id}/comments`, JSON.stringify(values));
                await getComments();
            } catch (error) {

            }
        }
    })

    return (
        <>
            <div role="tabpanel" className="tab-pane" id="product-comment">
                <form onSubmit={formik.handleSubmit} className="form-comment" method="POST" >
                    <label>Đánh giá của bạn</label>
                    <div className="form-group">
                        <ReactStars
                            count={5}
                            onChange={(val) => formik.setFieldValue('rating', val)}
                            size={24}
                            value={4}
                            activeColor="#ffd700"
                        />
                        <input type="text" className="form-control" id name="fullname" placeholder="Tên *" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.fullname} />
                        {
                            formik.touched.fullname && formik.errors.fullname ?
                                <div className="text-danger">{formik.errors.fullname}</div>
                                :
                                null
                        }
                        <input type="email" name="email" className="form-control" id placeholder="Email *" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        {
                            formik.touched.email && formik.errors.email ?
                                <div className="text-danger">{formik.errors.email}</div>
                                :
                                null
                        }
                        <textarea name="description" id="input" className="form-control" rows={3} placeholder="Nội dung *" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} />
                        {
                            formik.touched.description && formik.errors.description ?
                                <div className="text-danger">{formik.errors.description}</div>
                                :
                                null
                        }
                    </div>
                    <button type="submit" className="btn btn-primary">Gửi</button>
                </form>
                <CommentList comments={comments} ReactStars={ReactStars} />
            </div>
        </>
    );
}
