import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetAllActivityType = () => {
  const axios = useAxios();

  const fetchActivityTypeData = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("eaktivnosti/types/");
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery("activity_type_data", fetchActivityTypeData, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
