import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Payment from './Components/Payment/Payment';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import Orders from './Components/Orders/Orders';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import WishContextProvider from './Context/WishContext';
import Wishlist from './Components/WishList/Wishlist';
import ForgetPassword from './Components/ForgetPassword/Forgetpassword';
import ResetCode from './Components/ForgetPassword/ResetCode';
import ResetPassword from './Components/ForgetPassword/ResetPassword';

const route = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'categories', element: <Categories /> },
      { path: 'brands', element: <Brands /> },
      { path: 'productDetails/:id', element: <ProductDetails /> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      {path: 'wishlist', element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgetpassword', element: <ForgetPassword/>},
      { path: 'resetcode', element: <ResetCode/>},
      { path: 'resetpassword', element: <ResetPassword/>},
      { path: '*', element: <div>Not Found</div> }
    ]
  },
]);

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <AuthContextProvider>
          <WishContextProvider>
            <CartContextProvider>
              <RouterProvider router={route} />
            </CartContextProvider>
          </WishContextProvider>
        </AuthContextProvider>
      </QueryClientProvider >
      <Toaster containerClassName='toaster-wrapper' />
    </>
  );
}

export default App;
