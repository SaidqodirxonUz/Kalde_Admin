import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;

    async function getProducts() {
      try {
        setLoading(true);

        const res = await axios.get("/products");
        if (unmounted) return;
        if (res.status === 200) setProducts(res.data.data);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getProducts();

    return () => {
      unmounted = true;
    };
  }, []);

  async function deleteProduct(id) {
    try {
      const options = {
        method: "DELETE",
        url: `/products/${id}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const res = await axios(options);
      if (res.status === 200) {
        // Remove the deleted product from the products state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );

        toast.info("Продукт удален");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return [products, loading, deleteProduct];
}

export default useProducts;
