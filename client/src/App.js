import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import "./styles.css"
import ProductPage from "./pages/ProductPage/ProductPage";
import OrdersPage from "./pages/orders/OrdersPage";
import PaymentPage from "./pages/payment/PaymentPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/orders/:userId" element={<OrdersPage />} />
        <Route path="/checkout" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
