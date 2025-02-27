import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetMyComments = () => {
  const axios = useAxios();

  const getMyComments = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(`suprach/comments/`);
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti komentare");
      }
    }
    return null;
  };

  return useQuery(["suprach_user_comments"], getMyComments, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
