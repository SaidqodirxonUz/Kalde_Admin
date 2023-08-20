import { Routes, Route } from "react-router-dom";
import Redirect from "./Components/Redirect.jsx";
import Contact from "./Pages/Contact.jsx";

import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Oferta from "./Pages/Oferta.jsx";
import ProductForm from "./Components/newProduct.jsx";
import ProductsList from "./Pages/Products.jsx";
import EditProduct from "./Components/editProduct.jsx";
import CategoriesForm from "./Components/newCategories.jsx";
import CategoriesList from "./Pages/Categories.jsx";
import CategoryDetailsList from "./Pages/CategoryDetails.jsx";
import MoreInfo from "./Pages/ProductDetails.jsx";
import EditCategories from "./Components/editCategories.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id" element={<MoreInfo />} />
        <Route path="/createProduct" element={<ProductForm />} />
        <Route path="/editProduct/:id" element={<EditProduct />} />

        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/categories/:id" element={<CategoryDetailsList />} />
        <Route path="/createCategory" element={<CategoriesForm />} />
        <Route path="/editCategories/:id" element={<EditCategories />} />

        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/public-offer" element={<Oferta />} />
        <Route path="*" element={<Redirect />} />
      </Routes>
    </div>
  );
}

export default App;
