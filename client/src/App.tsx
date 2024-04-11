import { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/LoginForm";
import NotFound from "./components/NotFound";
import ShoppingCart from "./components/ShoppingCart";
import Logout from "./components/Logout";
import Payment from "./components/Payment";
import Confirmation from "./components/Confirmation";

const App = () => {
  const [user, setUser] = useState<string>("")

  useEffect(() => {
    const authorize = async () => {
      const response = await fetch("http://localhost:3000/auth/authorize", {
        credentials: "include"
      })

      const data = await response.json()
      if (response.status === 200) {
        setUser(data)
      } else {
        setUser("")
      }
    }
    authorize()
  }, [])

  const register = async () => {
    const response = await fetch("http://localhost:3001/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: "fakeemail@email.com", password: "12345678" })
    })
    const data = await response.json()
    console.log(data)
  }

  return (
    <BrowserRouter basename="/">
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<Logout />} /> */}
          <Route path="/" element={<Payment />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* <Route path="/" element={<ShoppingCart />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>

  );
};

export default App;