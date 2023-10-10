import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export function useDealers() {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let unmounted = false;

    async function getDealers() {
      try {
        setLoading(true);

        const res = await axios.get("/dealers");
        if (unmounted) return;
        console.log(res.status === 200);
        if (res.status === 200) setDealers(res.data);
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getDealers();

    return () => {
      unmounted = true;
    };
  }, []);

  async function deleteDealers(id) {
    try {
      const options = {
        method: "DELETE",
        url: `/dealers/${id}`,
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };

      const res = await axios(options);
      if (res.status === 200) {
        // Remove the deleted category from the dealers state
        setDealers((prevdealers) =>
          prevdealers.filter((category) => category.id !== id)
        );

        toast.info("Прайс удалена");
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return [dealers, loading, deleteDealers];
}

export default useDealers;
