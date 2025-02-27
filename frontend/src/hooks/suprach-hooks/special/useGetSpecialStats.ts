import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetSpecialStats = () => {
  const axios = useAxios();

  const getSpecialStats = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const response = await axios.get("suprach/special/stats/");
        return response.data;
      } catch (error) {
        throw new Error(
          "Nije moguće dohvatiti statistiku o specijalnim osobama"
        );
      }
    }
    return null;
  };

  return useQuery("special_stats", getSpecialStats, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
