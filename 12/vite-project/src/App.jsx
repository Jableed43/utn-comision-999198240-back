import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UsersPage from "./pages/usersPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

const App = () => {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/users" element={ <UsersPage/> } />
          <Route path="/products" element={ <ProductsPage/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
