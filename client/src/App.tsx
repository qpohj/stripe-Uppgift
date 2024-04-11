import { Route, Routes } from "react-router-dom";
import Confirmation from "./components/Confirmation";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Payment from "./components/Payment";
import ShoppingCart from "./components/ShoppingCart";

const App = () => {


  return (
    <Routes>
      <Route path="client/src/components/Login.tsx" element={<Login />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/shopping-cart" element={<ShoppingCart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;