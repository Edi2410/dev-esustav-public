import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetMyScore = () => {
  const axios = useAxios();

  const getMyScore = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(`suprach/scores/`);
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti ocjene");
      }
    }
    return null;
  };

  return useQuery(["suprach_user_score"], getMyScore, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
