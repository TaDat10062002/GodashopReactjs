import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Search from './Search';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { POPUP_CART, POPUP_CLOSE, POPUP_LOGIN, POPUP_MOBILE, POPUP_REGISTER } from '../constant/PopupConstant';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../constant/AuthConstant';

export default function Header() {
    const { slug } = useParams();
    const [items, setItems] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getItems = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/products?search=${search}&item_per_page=10`);
            setItems(response.data.items);
        } catch (error) {

        }
    }

    useEffect(() => {
        getItems();
        // eslint-disable-next-line
    }, [search])

    const styling = {
        height: "44px",
        border: "1px solid #dfe1e5",
        borderRadius: "30px",
        backgroundColor: "#eee",
        boxShadow: "rgba(32, 33, 36, 0.28) 0px 1px 6px 0px",
        hoverBackgroundColor: "#eee",
        color: "#212121",
        fontSize: "16px",
        fontFamily: "Arial",
        iconColor: "grey",
        lineColor: "rgb(232, 234, 237)",
        placeholderColor: "grey",
        clearIconMargin: '3px 14px 0 0',
        searchIconMargin: '0 0 0 16px',
        zIndex: 2,
    }

    const handleOnSearch = (search) => {
        // onSearch will have as the first callback parameter
        // the search searched and for the second the results.
        if (window.location.pathname === '/san-pham.html') {
            setSearch(search);
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('search', search);
            setSearchParams(newSearchParams);
            navigate(`/san-pham.html?${newSearchParams}`);
        }
    }

    const handleOnSelect = (search) => {
        if (window.location.pathname === '/'
            || window.location.pathname === '/san-pham.html'
            || window.location.pathname === '/chinh-sach-doi-tra.html'
            || window.location.pathname === '/chinh-sach-thanh-toan.html'
            || window.location.pathname === '/chinh-sach-giao-hang.html'
            || window.location.pathname === '/lien-he.html'
            || slug
        ) {
            setSearch(search.name);
            const newSearchParams = new URLSearchParams(searchParams.toString());
            newSearchParams.set('search', search.name);
            setSearchParams(newSearchParams);
            navigate(`/san-pham.html?${newSearchParams}`);
        }
    }

    const handlePopupLogin = (e) => {
        e.preventDefault();
        const action = { type: POPUP_LOGIN };
        dispatch(action);
    }

    const handlePopupRegister = (e) => {
        e.preventDefault();
        const action = { type: POPUP_REGISTER }
        dispatch(action);
    }

    const handleLogout = () => {
        const action = { type: LOGOUT }
        dispatch(action);
    }

    const handlePopupCart = (e) => {
        const action = { type: POPUP_CART }
        dispatch(action);
    }

    const openMenuMobile = () => {
        const action = { type: POPUP_MOBILE }
        dispatch(action);
    }

    const closeMenuMobile = () => {
        const action = { type: POPUP_CLOSE }
        dispatch(action);
    }

    const isLogin = useSelector(state => state.AuthReducer.isLogin);
    const loggedUser = useSelector(state => state.AuthReducer.loggedUser);
    const cartItems = useSelector(state => state.CartReducer.cartItems);
    const totalItems = cartItems.reduce((total = 0, item) => total + Number(item.qty), 0);
    const popup_type = useSelector(state => state.PopupReducer.popup_type);
    const width = popup_type === POPUP_MOBILE ? '250px' : '0';
    return (
        <>
            <div>
                <title>Trang chủ - Mỹ Phẩm Goda</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="shortcut icon" type="image/x-icon" href="../images/logo.jpg" />
                <link rel="stylesheet" href="../vendor/fontawesome-free-5.11.2-web/css/all.min.css" />
                <link rel="stylesheet" href="../vendor/bootstrap-3.3.7-dist/css/bootstrap.min.css" />
                <link rel="stylesheet" href="../vendor/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css" />
                <link rel="stylesheet" href="../vendor/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css" />
                <link rel="stylesheet" href="../vendor/star-rating/css/star-rating.min.css" />
                <link rel="stylesheet" href="../css/style.css" />
                <header>
                    {/* use for ajax */}
                    <input type="hidden" id="reference" defaultValue />
                    {/* Top Navbar */}
                    <div className="top-navbar container-fluid">
                        <div className="menu-mb" style={{ width: width }} >
                            <Link to='' className="btn-close" onClick={() => closeMenuMobile()}>×</Link>
                            <NavLink to="/">Trang chủ</NavLink>
                            <NavLink to="san-pham.html">Sản phẩm</NavLink>
                            <NavLink to="chinh-sach-doi-tra.html">Chính sách đổi trả</NavLink>
                            <NavLink to="chinh-sach-thanh-toan.html">Chính sách thanh toán</NavLink>
                            <NavLink to="chinh-sach-giao-hang.html">Chính sách giao hàng</NavLink>
                            <NavLink to="lien-he.html">Liên hệ</NavLink>
                        </div>
                        <div className="row">
                            <div className="hidden-lg hidden-md col-sm-2 col-xs-1">
                                <span className="btn-menu-mb" onClick={() => openMenuMobile()}><i className="glyphicon glyphicon-menu-hamburger" /></span>
                            </div>
                            <div className="col-md-6 hidden-sm hidden-xs">
                                <ul className="list-inline">
                                    <li><a href="https://www.facebook.com/HocLapTrinhWebTaiNha.ThayLoc"><i className="fab fa-facebook-f" /></a></li>
                                    <li><a href="https://twitter.com"><i className="fab fa-twitter" /></a></li>
                                    <li><a href="https://www.instagram.com"><i className="fab fa-instagram" /></a></li>
                                    <li><a href="https://www.pinterest.com/"><i className="fab fa-pinterest" /></a></li>
                                    <li><a href="https://www.youtube.com/"><i className="fab fa-youtube" /></a></li>
                                </ul>
                            </div>
                            <div className="col-md-6 col-sm-10 col-xs-11">
                                <ul className="list-inline pull-right top-right">
                                    <li className="account-login">
                                        {
                                            isLogin ?
                                                <Link to='don-hang-cua-toi.html'>Đơn hàng của tôi</Link>
                                                :
                                                <Link to="#" className="btn-register" onClick={(e) => handlePopupRegister(e)}>
                                                    Đăng Ký
                                                </Link>
                                        }
                                    </li>
                                    <li>
                                        {
                                            isLogin ?
                                                <>
                                                    <Link to="#" className="btn-account dropdown-toggle" data-toggle="dropdown" id="dropdownMenu">{loggedUser.name}</Link>
                                                    <ul className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu">
                                                        <li><Link to="/thong-tin-tai-khoan.html">Thông tin tài khoản</Link></li>
                                                        <li><Link to="/dia-chi-giao-hang-mac-dinh.html">Địa chỉ giao hàng</Link></li>
                                                        <li><Link to="/don-hang-cua-toi.html">Đơn hàng của tôi</Link></li>
                                                        <li role="separator" className="divider"></li>
                                                        <li><Link to="#" onClick={(e) => handleLogout(e)}>Thoát</Link></li>
                                                    </ul>
                                                </>
                                                :
                                                <Link to="#" className="btn-login" onClick={(e) => handlePopupLogin(e)}>Đăng Nhập</Link>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* End top navbar */}
                    {/* Header */}
                    <div className="container">
                        <div className="row">
                            {/* LOGO */}
                            <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 logo">
                                <a href="#"><img src="../images/goda450x170_1.jpg" className="img-responsive" /></a>
                            </div>
                            <div className="col-lg-4 col-md-4 hidden-sm hidden-xs call-action">
                                <a href="#"><img src="../images/godakeben450x170.jpg" className="img-responsive" /></a>
                            </div>
                            {/* HOTLINE AND SERCH */}
                            <div className="col-lg-4 col-md-4 hotline-search">
                                <div style={{ marginBottom: '30px' }}>
                                    <p className="hotline-phone"><span><strong>Hotline: </strong><a href="tel:0932.538.468">0932.538.468</a></span></p>
                                    <p className="hotline-email"><span><strong>Email: </strong><a href="mailto:nguyenhuulocla2006@gmail.com">nguyenhuulocla2006@gmail.com</a></span></p>
                                </div>
                                <Search items={items} handleOnSearch={handleOnSearch} handleOnSelect={handleOnSelect} {...styling} />
                            </div>
                        </div>
                    </div>
                    {/* End header */}
                </header>
                {/* NAVBAR DESKTOP*/}
                <nav className="navbar navbar-default desktop-menu" style={{ zIndex: 0 }}>
                    <div className="container">
                        <ul className="nav navbar-nav navbar-left hidden-sm hidden-xs">
                            <li>
                                <NavLink to="/">Trang chủ</NavLink>
                            </li>
                            <li><NavLink to="san-pham.html">Sản phẩm </NavLink></li>
                            <li><NavLink to="chinh-sach-doi-tra.html">Chính sách đổi trả</NavLink></li>
                            <li><NavLink to="chinh-sach-thanh-toan.html">Chính sách thanh toán</NavLink></li>
                            <li><NavLink to="chinh-sach-giao-hang.html">Chính sách giao hàng</NavLink></li>
                            <li><NavLink to="lien-he.html">Liên hệ</NavLink></li>
                        </ul>
                        <span className="hidden-lg hidden-md experience">Trải nghiệm cùng sản phẩm của Goda</span>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="cart">
                                <Link className="btn-cart-detail" title="Giỏ Hàng" onClick={(e) => handlePopupCart(e)}><i className="fa fa-shopping-cart" /> <span classNamee="number-total-product">{totalItems}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav >
            </div >
            <ToastContainer />
        </>
    );
}
