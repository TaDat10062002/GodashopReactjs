import React from 'react';
import ProductList from './ProductList';

export default function CategoryProductList({ categoriesProducts }) {
    return (
        <>
            {
                categoriesProducts.map((categoriesProduct, index) =>
                    <div className="row equal" key={index}>
                        <div className="col-xs-12">
                            <h4 className="home-title">{categoriesProduct.categoryName}</h4>
                        </div>
                        <ProductList products={categoriesProduct.items} />
                    </div>
                )
            }
        </>
    );
}
