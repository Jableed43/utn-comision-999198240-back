import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx";
import { UsersPage, ProductsPage, CategoriesPage } from "./components/entities";

const App = () => {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage/> } />
          <Route path="/users" element={ <UsersPage/> } />
          <Route path="/products" element={ <ProductsPage/> } />
          <Route path="/categories" element={ <CategoriesPage/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
