import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { LOGIN } from '../constant/AuthConstant';
import { useDispatch } from 'react-redux';

export default function ActiveAccountPage() {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token') || '';
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const active_account = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/active_account?token=${token}`);
            toast.success(`Tài khoản ${response.data.user.email} đã được kích hoạt thành công`);
            // sau khi kich hoat, cho phep login vao tk
            const action = {
                type: LOGIN,
                payload: {
                    access_token: response.data.access_token,
                    loggedUser: response.data.user
                }
            }
            dispatch(action);
            navigate('/');
        } catch (error) {
            toast.error(error.response.data || error.message);
        }
    }

    useEffect(() => {
        active_account(token);
        // eslint-disable-next-line
    }, [token])

    return (
        <>
            <div className='text-center'>
                <CircularProgress color="success" size={50} />
            </div>
            <div className='text-center alert alert-success'>
                Tài khoản đang được kích hoạt xin vui lòng chờ trong giây
            </div>
        </>
    );
}
