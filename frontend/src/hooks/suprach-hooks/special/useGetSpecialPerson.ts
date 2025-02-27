import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetSpecialPerson = () => {
  const axios = useAxios();

  const getSpecialPerson = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const response = await axios.get("suprach/special/");
        return response.data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti specijalne osobe");
      }
    }
    return null;
  };

  return useQuery("special_user_to_grade_suprach", getSpecialPerson, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
