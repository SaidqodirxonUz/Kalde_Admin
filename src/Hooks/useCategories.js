import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;

    async function getCategories() {
      try {
        setLoading(true);

        const res = await axios.get("/categories");
        if (unmounted) return;
        if (res.status === 200) setCategories(res.data.data);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getCategories();

    return () => {
      unmounted = true;
    };
  }, []);

  async function deleteCategory(id) {
    try {
      const options = {
        method: "DELETE",
        url: `/categories/${id}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const res = await axios(options);
      if (res.status === 200) {
        // Remove the deleted category from the categories state
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category.id !== id)
        );

        toast.info("Категория удалена");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return [categories, loading, deleteCategory];
}

export default useCategories;
