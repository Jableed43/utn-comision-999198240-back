import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage.jsx";
import { UsersPage, ProductsPage, CategoriesPage } from "./components/entities";
import ContactPage from "./components/ContactPage.jsx";

const App = () => {
  return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={ <HomePage/> } />
          <Route path="/users" element={ <UsersPage/> } />
          <Route path="/products" element={ <ProductsPage/> } />
          <Route path="/categories" element={ <CategoriesPage/> } />
          <Route path="/contact" element={ <ContactPage/> } />
        </Routes>
    </BrowserRouter>
  )
}

export default App
