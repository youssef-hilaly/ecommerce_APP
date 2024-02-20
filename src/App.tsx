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

const route = createBrowserRouter([
  {
    path: '/', element: <Layout />, children: [
      { path: '', element: <Home /> },
      { path: 'home', element: <Home /> },
      { path: 'productDetails/:id', element: <ProductDetails /> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
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
          <CartContextProvider>
            <RouterProvider router={route} />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider >
      <Toaster />
    </>
  );
}

export default App;
