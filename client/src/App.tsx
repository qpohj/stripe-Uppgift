import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import NotFound from "./views/NotFound";

const App = () => {



  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Something went wrong...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>

  );
};

export default App;