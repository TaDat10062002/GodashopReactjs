import React, { useEffect, useState } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RelatedProductSilder from './RelatedProductSilder';
import ProductInfor from './ProductInfo';
import ProductDescription from './ProductDescription';

export default function ProductInner({ product, brand, relatedProducts }) {
    return (
        <>
            <ProductInfor product={product} brand={brand} />
            <ProductDescription product={product} />
            <RelatedProductSilder relatedProducts={relatedProducts} />
        </>
    );
}
