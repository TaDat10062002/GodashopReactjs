import React from 'react';
import Slider from 'react-slick';
import RealtedProductSlider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Product from './Product';

export default function RelatedProductSilder({ relatedProducts }) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <>
            <Slider {...settings}>
                {
                    relatedProducts.map((product, index) =>
                        <Product product={product} key={index} />
                    )
                }
            </Slider>

        </>
    );
}
