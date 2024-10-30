import React, { useEffect, useState } from 'react';
import { getCategoryLinks } from '../helper/utils';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function CategorySideBar({ categoryId }) {
    const [categories, setCategories] = useState([]);
    const getCategories = async () => {
        try {
            const response = await axios.get('http://api.godashopk106.com/api/v1/categories');
            setCategories(response.data.items);
        } catch (error) {

        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    return (
        <>
            <div className="category">
                <h5>Danh mục sản phẩm</h5>
                <ul>
                    <li>
                        <NavLink to="/san-pham.html" title="Tất cả sản phẩm" target="_self">Tất cả sản phẩm
                        </NavLink>
                    </li>
                    {
                        categories.map((category, index) =>
                            <li key={index}>
                                <Link className={`${category.id === categoryId ? 'active' : ''}`} to={getCategoryLinks(category)} title={`${category.name}`} target="_self">
                                    {category.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </div >
        </>
    );
}
