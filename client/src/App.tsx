import { Route, Routes } from "react-router-dom"
import Payment from "./components/Payment"
import Confirmation from "./components/Confirmation"
import Login from "./components/Login"
import ShoppingCart from "./components/ShoppingCart"

const App = () => {


  return (
    <Routes>
      <Route path="../components/Login.tsx" element={<Login />} />
      <Route path="../components/Payment.tsx" element={<Payment />} />
      <Route path="../components/Confirmation.tsx" element={<Confirmation />} />
      <Route path="../components/ShoppingCart.tsx" element={<ShoppingCart />} />
    </Routes>
  )
}

export default App