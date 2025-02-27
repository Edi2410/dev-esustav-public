import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetUserForRecomendations = () => {
  const axios = useAxios();

  const fetchUserForRecomendations = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(`eaktivnosti/recomendations/`);
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery("user_for_recomentation_data", fetchUserForRecomendations, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
