import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getProductId } from '../helper/utils';
import ProductInner from '../components/ProductInner';
import Loading from '../components/Loading';
import CategorySideBar from '../components/CategorySideBar';
import PriceSideBar from '../components/PriceSideBar';

export default function ProductDetailPage() {
    const [product, setProduct] = useState([]);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [brandId, setBrandId] = useState([]);
    const [brand, setBrand] = useState([]);
    const { slug } = useParams();
    const id = getProductId(slug);
    const [isLoaded, setIsLoaed] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const priceRange = searchParams.get('price-range') || '';
    const navigate = useNavigate();

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/products/${id}`);
            setProduct(response.data);
            setBrandId(product.brand_id);
            setRelatedProducts(response.data.relatedProducts);
            setIsLoaed(true);
        } catch (error) {

        }
    }

    const getBrand = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/brands/${brandId}`);
            setBrand(response.data);
        } catch (error) {

        }
    }

    const handleOnPrice = (priceRange) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('price-range', priceRange);
        setSearchParams(newSearchParams);
        navigate(`/san-pham.html?${newSearchParams}`);
    }

    useEffect(() => {
        getProduct();
        getBrand();
        // eslint-disable-next-line
    }, [brandId])

    return (
        <>
            <main id="maincontent" className="page-main">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-9">
                            <ol className="breadcrumb">
                                <li><a href="/" target="_self">Trang chủ</a></li>
                                <li><span>/</span></li>
                                <li className="active"><span>Tất cả sản phẩm</span></li>
                            </ol>
                        </div>
                        <div className="col-xs-3 hidden-lg hidden-md">
                            <a className="hidden-lg pull-right btn-aside-mobile" href="javascript:void(0)">Bộ lọc <i className="fa fa-angle-double-right" /></a>
                        </div>
                        <div className="clearfix" />
                        <aside className="col-md-3">
                            <div className="inner-aside">
                                <CategorySideBar categoryId={product.category_id} />
                                <PriceSideBar handleOnPrice={handleOnPrice} priceRange={priceRange} />
                            </div>
                        </aside>
                        <div className="col-md-9 product-detail">
                            {
                                isLoaded ? <ProductInner product={product} brand={brand} relatedProducts={relatedProducts} /> : <Loading />
                            }
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
