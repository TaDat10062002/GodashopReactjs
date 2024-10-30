import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import CategoryProductList from '../components/CategoryProductList';

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [latestProducts, setLatestProducts] = useState([]);
    const [categoriesProducts, setCategoriesProducts] = useState([]);

    const getFeaturedProducts = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/products?featured=1&item_per_page=4`);
            setFeaturedProducts(response.data.items);
        } catch (error) {

        }
    }

    const getLatestProducts = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/products?latest=1&item_per_page=4`);
            setLatestProducts(response.data.items);
        } catch (error) {

        }
    }

    const getCategoriesProducts = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/products?hierarchy=1&item_per_page=4`);
            setCategoriesProducts(response.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getFeaturedProducts();
        getLatestProducts();
        getCategoriesProducts();
    }, []);

    return (
        <>
            <div>
                <div className="slideshow container-fluid">
                    <div className="row">
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            {/* Indicators */}
                            <ol className="carousel-indicators">
                                <li data-target="#myCarousel" data-slide-to={0} className="active" />
                                <li data-target="#myCarousel" data-slide-to={1} />
                                <li data-target="#myCarousel" data-slide-to={2} />
                            </ol>
                            {/* Wrapper for slides */}
                            <div className="carousel-inner">
                                <div className="item active">
                                    <img src="../images/slider1.jpg" alt="slider 1" />
                                </div>
                                <div className="item">
                                    <img src="../images/slider_2.jpg" alt="slider 2" />
                                </div>
                                <div className="item">
                                    <img src="../images/slider_3.jpg" alt="slider 3" />
                                </div>
                            </div>
                            {/* Left and right controls */}
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                                <span className="glyphicon glyphicon-chevron-left" />
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                                <span className="glyphicon glyphicon-chevron-right" />
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* END SLIDESHOW */}
                {/* SERVICES */}
                <div className="top-services container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-6 item item-1">
                            <div className="item-inner">
                                <a className="item-inline" title="7 NGÀY ĐỔI TRẢ" href="#">
                                    <span className="title-sv">7 NGÀY ĐỔI TRẢ</span>
                                    <span>Chăm sóc khách hàng cực tốt</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 item item-2">
                            <div className="item-inner">
                                <a className="item-inline" title="MIỄN PHÍ SHIP" href="#">
                                    <span className="title-sv">MIỄN PHÍ SHIP</span>
                                    <span>Với dịch vụ giao hàng tiết kiệm</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 item item-3">
                            <div className="item-inner">
                                <a className="item-inline" title="BÁN BUÔN NHƯ BÁN SỈ" href="#">
                                    <span className="title-sv">BÁN BUÔN NHƯ BÁN SỈ</span>
                                    <span>Giá hợp lý nhất quả đất</span>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 item item-4">
                            <div className="item-inner">
                                <a className="item-inline" title="CHẤT LƯỢNG HÀNG ĐẦU" href="#">
                                    <span className="title-sv">CHẤT LƯỢNG HÀNG ĐẦU</span>
                                    <span>Chăm sóc bạn như người thân </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row equal">
                        <div className="col-xs-12">
                            <h4 className="home-title">Sản phẩm nổi bật</h4>
                        </div>
                        <ProductList products={featuredProducts} />
                    </div>
                    <div className="row equal">
                        <div className="col-xs-12">
                            <h4 className="home-title">Sản phẩm mới nhất</h4>
                        </div>
                        <ProductList products={latestProducts} />
                    </div>
                    <CategoryProductList categoriesProducts={categoriesProducts} />
                </div>
            </main>
        </>
    );
}
