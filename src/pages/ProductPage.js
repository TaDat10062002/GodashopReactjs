import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import CategorySideBar from '../components/CategorySideBar';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { getCategoryId } from '../helper/utils';
import PriceSideBar from '../components/PriceSideBar';
import Sort from '../components/Sort';
import ResponsivePagination from 'react-responsive-pagination';
import ItemPerPage from '../components/ItemPerPage';

export default function ProductPage() {
    const slug = useParams();
    const categoryId = getCategoryId(slug);
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({ page: 1, totalPage: 0 });
    const [searchParams, setSearchParams] = useSearchParams();
    const priceRange = searchParams.get('price-range') || '';
    const [itemPerPage, setItemPerPage] = useState(4);
    const sort = searchParams.get('sort') || '';
    const search = searchParams.get('search') || '';
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const response = await axios.get(`http://api.godashopk106.com/api/v1/products?search=${search}&category_id=${categoryId}&price-range=${priceRange}&sort=${sort}&page=${page}&item_per_page=${itemPerPage}`);
            setProducts(response.data.items);
            setPagination(response.data.pagination);

        } catch (error) {

        }
    }

    const handleOnPrice = (priceRange) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('price-range', priceRange);
        setSearchParams(newSearchParams);
        navigate(`/san-pham.html?${newSearchParams}`);
    }

    const handleOnSort = (sort) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.set('sort', sort);
        setSearchParams(newSearchParams);
    }

    useEffect(() => {
        getProducts();
        // eslint-disable-next-line 
    }, [categoryId, priceRange, sort, page, itemPerPage, search])

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
                            <a className="hidden-lg pull-right btn-aside-mobile" href="c">Bộ lọc <i className="fa fa-angle-double-right" /></a>
                        </div>
                        <div className="clearfix" />
                        <aside className="col-md-3">
                            <div className="inner-aside">
                                <CategorySideBar categoryId={categoryId} />
                                <PriceSideBar priceRange={priceRange} handleOnPrice={handleOnPrice} />
                            </div>
                        </aside>
                        <div className="col-md-9 products">
                            <div className="row equal">
                                <div className="col-xs-6">
                                    <h4 className="home-title">Tất cả sản phẩm</h4>
                                </div>
                                <Sort sort={sort} handleOnSort={handleOnSort} />
                                <ItemPerPage itemPerPage={itemPerPage} setItemPerPage={setItemPerPage} />
                                <div className="clearfix" />
                                <ProductList products={products} />
                            </div>

                            <ResponsivePagination
                                total={pagination.totalPage}
                                current={page}
                                onPageChange={setPage}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
