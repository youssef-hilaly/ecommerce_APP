import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from "./AuthContext";
import axios from "axios";

type cartContextType = {
    totalItems: Number;
    totalPrice: Number;
    cartItems: Array<any>;
    cartID: string;
    addToCart: (id: string) =>  Promise<boolean>;
    updateItemCount: (id: string, count: number) => Promise<boolean>;
    deleteFromCart: (id: string) => Promise<boolean>;
    clearCart: () => Promise<boolean>;
    setEmpty: () => void;
};

export const cartContext = createContext({} as cartContextType);

export default function CartContextProvider({ children }: { children: React.ReactNode }) {

    const [totalItems, setTotalItems] = useState<Number>(0)
    const [totalPrice, setTotalPrice] = useState<Number>(0)
    const [cartItems, setCartItems] = useState<Array<any>>([])
    const [cartID, setCartID] = useState<string>('')

    const { token } = useContext(authContext)

    function setEmpty() {
        setTotalItems(0);
        setTotalPrice(0);
        setCartItems([]);
        setCartID("");
    }

    async function addToCart(id: string) {
        return await axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId: id }, { headers: { token: token || '' } })
            .then(res =>{
                getCart(); // to update the cart items because backend bug that doesn't return the products details
                return true;
            })
            .catch(err => {
                return false;
            });
    }

    async function getCart() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers: { token: token || '' } })
            .then(res => {
                setCartItems(res.data.data.products)
                setTotalItems(res.data.numOfCartItems)
                setTotalPrice(res.data.data.totalCartPrice)
                setCartID(res.data.data._id);
                return true;
            })
            .catch(err => {return false;});
    }

    async function deleteFromCart(id: string) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers: { token: token || '' }})
            .then(res => {
                setCartItems(res.data.data.products)
                setTotalItems(res.data.numOfCartItems)
                setTotalPrice(res.data.data.totalCartPrice)
                setCartID(res.data.data._id);
                return true;
            })
            .catch(err => {
                return false;
            });
    }

    async function clearCart(){
        return await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', { headers: { token: token || '' }})
            .then(res => {
                setEmpty();
                return true;
            })
            .catch(err => {
                return false;
            });
    }

    async function updateItemCount(id: string, count: number) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count }, { headers: { token: token || '' }})
            .then(res => {
                setCartItems(res.data.data.products)
                setTotalItems(res.data.numOfCartItems)
                setTotalPrice(res.data.data.totalCartPrice)
                setCartID(res.data.data._id);
                return true;
            })
            .catch(err => {return false;});
    }

    useEffect(() => {
        getCart();
    }, [token])

    return (
        <cartContext.Provider value={{totalItems, totalPrice, cartItems, cartID, setEmpty, addToCart, updateItemCount, deleteFromCart, clearCart}}>
            {children}
        </cartContext.Provider>
    )
}