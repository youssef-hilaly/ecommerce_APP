import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useParams } from "react-router-dom";
import { Children, cloneElement } from "react";

export default function SimpleSlider({ children, slidesToShow }: any) {
    const arrayChildren = Children.toArray(children);
    var settings = {
        dots: false,
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
            {arrayChildren.map((child, index) => <div key={index} className="p-1" >{child}</div>)}
        </Slider>
    );
}