import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import ReactLoading from 'react-loading';
import ClipLoader from "react-spinners/ClipLoader";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Body from "./components/Body/Body";
import Shop from "./components/Shop/Shop";
import { useDispatch, useSelector } from "react-redux";
import { products } from "./actions/ProductActions";
import Details from "./components/Details/Details";
import Login from "./components/Login/login";
import { wishlists } from "./actions/WishlistActions";
import Wishlist from "./components/Wishlist/Wishlist";
import { carts } from "./actions/CartActions";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { users } from "./actions/UserActions";
import Account from "./components/Account/Account";
import { orders } from "./actions/OrderActions";
import Admin from "./components/Admin";
import AddProduct from "./components/Admin/AddProduct/AddProduct";
import { categories } from "./actions/CategoryActions";
import { subCategories } from "./actions/SubCategoryActions";
import Products from "./components/Admin/Products/Products";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [listProducts, setListProducts] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listSubCategories, setListSubCategories] = useState([]);
  const [listWishlists, setListWishlists] = useState([]);
  const [userData, setUserData] = useState();
  const [listCart, setListCart] = useState([]);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    roles : []
  });
  const [ordersList, setOrdersList] = useState([]);

  const dispatch = useDispatch();

  const ObjectProducts = useSelector((state) => state.products.products);
  const ObjectCategories = useSelector((state) => state.category.categories);
  const ObjectSubCategories = useSelector((state) => state.subCategory.subCategories);
  const ObjectWishlists = useSelector((state) => state.wishlist.products);
  const ObjectUser = useSelector((state) => state.user.user);
  const ObjectCarts = useSelector((state) => state.cart.products);
  const ObjectOrders = useSelector((state) => state.order.orders);

  const error = useSelector((state) => state.products.error);
  const errorCategory = useSelector((state) => state.category.error);
  const errorSubCategory = useSelector((state) => state.subCategory.error);
  const errorWishlist = useSelector((state) => state.wishlist.error);
  const errorCart = useSelector((state) => state.cart.error);
  const errorUser = useSelector((state) => state.user.error);
  const errorOrder = useSelector((state) => state.order.error);

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "hsl(176, 88%, 27%)",
  };

  useEffect(() => {
    dispatch(products());
    dispatch(categories());
    dispatch(subCategories());
  }, [dispatch]);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (errorCategory) {
      console.log(errorCategory);
    }
    if (errorSubCategory) {
      console.log(errorSubCategory);
    }
    if (errorWishlist) {
      console.log(errorWishlist);
    }
    if (errorCart) {
      console.log(errorCart);
    }
    if (errorUser) {
      console.log(errorUser);
    }
    if (errorOrder) {
      console.log(errorOrder);
    }
    if (ObjectProducts) {
      setListProducts(ObjectProducts._embedded.products);
      // When user data is available, set loading to false
      setLoading(false);
    }
    if (ObjectCategories) {
      setListCategories(ObjectCategories);
    }
    if (ObjectSubCategories) {
      setListSubCategories(ObjectSubCategories);
    }
    if (ObjectWishlists) {
      setListWishlists(ObjectWishlists);
    }
    if (ObjectCarts) {
      setListCart(ObjectCarts);
    }
    if (ObjectUser) {
      setUserData(ObjectUser);
    }
    if (ObjectOrders) {
      setOrdersList(ObjectOrders);
    }
  }, [
    ObjectProducts,
    ObjectCategories,
    ObjectSubCategories,
    ObjectWishlists,
    ObjectCarts,
    ObjectUser,
    ObjectOrders,
    token,
  ]);

  useEffect(() => {
    if (token !== null) {
      // Split the token into its three parts: header, payload, and signature
      const parts = token.split(".");
      if (parts.length === 3) {
        // Decode the payload part (the second part)
        const payload = atob(parts[1]);

        // Parse the payload to get the data
        const payloadObj = JSON.parse(payload);

        // Access the data you need from the payload
        setLoginData({
          ...loginData,
          username: payloadObj.username,
          password: payloadObj.password,
          roles: payloadObj.roles
        });
      } else {
        console.log("Invalid token format");
      }
    }
  }, [token]);

  useEffect(() => {
    if (loginData.username.trim() !== "") {
      dispatch(users(loginData));
      dispatch(wishlists(loginData));
      dispatch(carts(loginData));
      dispatch(orders(loginData));
    }
  }, [loginData]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReactLoading type="bubbles" color="hsl(176, 88%, 27%)" height={150} width={150} />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main listWishlist={listWishlists} listCart={listCart} />,
      children: [
        {
          index: true,
          element: <Body listProducts={listProducts} client={loginData} />,
        },
        {
          path: "shop",
          element: <Shop listProducts={listProducts} client={loginData} />,
        },
        {
          path: "details",
          element: <Details listProducts={listProducts} client={loginData} />,
        },
        {
          path: "wishlist",
          element: (
            <Wishlist
              listProducts={listProducts}
              listWishlist={listWishlists}
              client={loginData}
            />
          ),
        },
        {
          path: "cart",
          element: (
            <Cart
              listProducts={listProducts}
              listCart={listCart}
              client={loginData}
            />
          ),
        },
        {
          path: "checkout",
          element:
            listCart.length === 0 ? (
              <Navigate to={"/"} />
            ) : !sessionStorage.getItem("token") ? (
              <Navigate to={"/login"} />
            ) : (
              <Checkout client={loginData} userData={userData} />
            ),
        },
        {
          path: "myaccount",
          element: !sessionStorage.getItem("token") ? (
            <Navigate to={"/login"} />
          ) : (
            <Account
              client={loginData}
              orders={ordersList}
              userData={userData}
            />
          ),
        },
        {
          path: "login",
          element: sessionStorage.getItem("token") ? (
            <Navigate to={"/"} />
          ) : (
            <Login />
          ),
        },
      ],
    },
    {
      path: "/admin",
      element: <Admin />,
      children: [
        {
          index: true,
          element:  !sessionStorage.getItem("token") ? (
            <Navigate to={"/login"} />
          ) : (loginData.roles.filter(value => value.name === "ROLE_ADMIN").length > 0) ? <AddProduct categories={listCategories} subCategories={listSubCategories} products={listProducts} client={loginData}/>
          : <Navigate to={"/"} />,
        },
        {
          path: "products", // Specify the path without a leading slash
          element: !sessionStorage.getItem("token") ? (
            <Navigate to={"/login"} />
          ) : loginData.roles.some(value => value.name === "ROLE_ADMIN") ? (
            <Products listProducts={listProducts} client={loginData} />
          ) : (
            <Navigate to={"/"} />
          ),
        },
      ],
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
