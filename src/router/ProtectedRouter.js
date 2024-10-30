import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProtectedRouter({ children }) {
    const isLogin = useSelector(state => state.AuthReducer.isLogin);
    if (!isLogin) {
        toast.error('Hãy đăng nhập tài khoản!!!');
        return <Navigate to="/" />
    }
    return children;
}
