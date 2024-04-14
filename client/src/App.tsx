import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import LoginPage from "./views/LoginPage";
import NotFound from "./views/NotFound";
import ShoppingPage from "./views/ShoppingPage";

const App = () => {



  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginform" element={<LoginPage />} />
          <Route path="/shop/products" element={<ShoppingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>

  );
};

export default App;