export interface IProduct {
    id: string;
    title: string;
    price: number;
    priceAfterDiscount: number;
    ratingsAverage: number;
    imageCover: string;
    category: {
        name: string;
    }
}

// orders interface
export interface IOrder {
    _id: string;
    totalOrderPrice: number;
    paymentMethodType: string;
    isDelivered: boolean;
    cartItems: Array<ICartItem>;
}

// cart items interface
export interface ICartItem {
    product: {
        _id: string;
        imageCover: string;
        title: string;
    };
    price: number;
    count: number;
}

export interface ICategory {
    _id: string;
    name: string;
    image: string;
}

export interface IBrands {
    _id: string;
    name: string;
    image: string;
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}

export interface Ilogin {
    email: string;
    password: string;
}

export interface Ijwtpayload {
    id: string;
    name: string;
    role: string;
    iat: number;
    exp: number;
}

export interface IResetPassword {
    email: string;
    newPassword: string;
}
export interface IForgetPassword {
    email: string;
}
export interface IResetCode {
    resetCode: string;
}
export interface ISimpleSlider {
    children: React.ReactNode;
    slidesToShow: number;
    dots: boolean;
}
