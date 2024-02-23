import axios from 'axios'
import React, { useContext, useState, createContext, useEffect  } from 'react'

import { authContext } from './AuthContext'

type WishContextType = {
    wishList: any[];
    wishListIds: string[];
    addToWishList: (id: string) => Promise<boolean>;
    getWishList: () => Promise<boolean>;
    removeFromWishList: (id: string) => Promise<boolean>;
    lazy: boolean;
    clearWishList: () => void;
}

export const wishContext = createContext({} as WishContextType)

export default function WishContextProvider({children}: {children: React.ReactNode}) {

    const [wishListIds, setWishListIds] = useState<string[]>([])
    const [wishList, setWishList] = useState<any[]>([])
    // false means the wishlist is loaded
    const [lazy, setLazy] = useState(false) // check if the wishlist is loaded or not when entering wishlist page
    const { token } = useContext(authContext)

    function extractIds(){
        const ids = wishList.map((item: any) => item._id)
        setWishListIds(ids)
    }

    async function addToWishList(id: string) {
        return await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId: id }, {headers: {token:token}})
        .then(res => {
            setWishListIds(res.data.data)
            setLazy(true)
            return true
        })
        .catch(err => {
            return false
        })
    }

    async function removeFromWishList(id: string) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers: {token:token}})
        .then(res => {
            setWishListIds(res.data.data)
            setLazy(true)
            return true
        })
        .catch(err => {
            return false
        })
    }

    async function getWishList() {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {headers: {token:token}})
        .then(res => {
            setWishList(res.data.data)
            setLazy(false)
            return true
        })
        .catch(err => {
            return false
        })
    }

    function clearWishList() {
        setWishList([])
        setWishListIds([])
    }

    useEffect(() => {
        extractIds()
    }, [wishList])

    useEffect(() => {
        getWishList()
    }, [token])

return (
    <wishContext.Provider value={{wishList, wishListIds, lazy, addToWishList, removeFromWishList, getWishList, clearWishList}}>
            {children}
    </wishContext.Provider>
)
}
