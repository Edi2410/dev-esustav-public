import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetQuestions = (
  id: string | undefined,
  isSpecialUser: string | undefined
) => {
  const axios = useAxios();

  const getQuestions = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(
          `suprach/questions/?graded=${id}&special=${isSpecialUser}`
        );
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery(["suprach_questions", id], getQuestions, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
    enabled: id && isSpecialUser ? true : false,
  });
};
