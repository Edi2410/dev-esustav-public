import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetUserToGrade = () => {
  const axios = useAxios();

  const getUserToGrade = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("suprach/user-to-grade/");
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery("user_to_grade", getUserToGrade, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
