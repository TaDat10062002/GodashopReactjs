import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePages from '../pages/HomePage';
import Layout from '../components/Layout';
import ProductPage from '../pages/ProductPage';
import ReturnPolicyPage from '../pages/ReturnPolicyPage';
import PaymentPolicyPage from '../pages/PaymentPolicyPage';
import DeliveryPolicyPage from '../pages/DeliveryPolicyPage';
import ContactPage from '../pages/ContactPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import AccountPage from '../pages/AccountPage';
import ProtectedRouter from './ProtectedRouter';
import ShippingDefaultPage from '../pages/ShippingDefaultPage';
import OrderPage from '../pages/OrderPage';
import OrderDetailPage from '../pages/OrderDetailPage';
import CheckoutPage from '../pages/CheckoutPage';
import ActiveAccountPage from '../pages/ActiveAccountPage';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} >
                <Route path="" element={<HomePages />} />
                <Route path="/san-pham.html" element={<ProductPage />} />
                <Route path="/danh-muc/:slug" element={<ProductPage />} />

                {/* policies */}
                <Route path="/chinh-sach-doi-tra.html" element={<ReturnPolicyPage />} />
                <Route path="/chinh-sach-thanh-toan.html" element={<PaymentPolicyPage />} />
                <Route path="/chinh-sach-giao-hang.html" element={<DeliveryPolicyPage />} />

                {/* contact  */}
                <Route path="/lien-he.html" element={<ContactPage />} />

                {/* chi tiet san pham  */}
                <Route path="/san-pham/:slug" element={<ProductDetailPage />} />

                {/* thong tin tai khoan  */}
                <Route path="/thong-tin-tai-khoan.html" element={<ProtectedRouter><AccountPage /></ProtectedRouter>} />
                <Route path="/dia-chi-giao-hang-mac-dinh.html" element={<ProtectedRouter><ShippingDefaultPage /></ProtectedRouter>} />
                <Route path="/don-hang-cua-toi.html" element={<ProtectedRouter><OrderPage /></ProtectedRouter>} />

                {/* chi tiet don hang  */}
                <Route path="/don-hang/:slug" element={<ProtectedRouter><OrderDetailPage /></ProtectedRouter>} />

                {/* dat hang  */}
                <Route path="/dat-hang.html" element={<ProtectedRouter><CheckoutPage /></ProtectedRouter>} />

                {/* active account  */}
                <Route path="/active_account" element={<ActiveAccountPage />} />
            </Route>
        </Routes>
    )
}
