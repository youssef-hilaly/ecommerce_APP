import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Children, cloneElement } from "react";

export default function SimpleSlider({ children, slidesToShow, dots }: any) {
    const arrayChildren = Children.toArray(children);
    var settings = {
        dots: dots,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 5000,
        cssEase: "linear",
        arrows: false,
    };
    return (
        <Slider {...settings}>
            {arrayChildren.map((child, index) => <div key={index} >{child}</div>)}
        </Slider>
    );
}