import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetActiveSuprach = () => {
  const axios = useAxios();

  const getActiveSuprach = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("suprach/suprach/");
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti aktivni suprach");
      }
    }
    return null;
  };

  return useQuery("active_suprach", getActiveSuprach, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
