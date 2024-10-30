import React from 'react';
import Product from './Product';

export default function ProductList({ products }) {
    return (
        <>
            {
                products.map((product, index) =>
                    <div key={index} className="col-xs-6 col-sm-3">
                        <Product product={product} />
                    </div>
                )
            }
        </>
    );
}
