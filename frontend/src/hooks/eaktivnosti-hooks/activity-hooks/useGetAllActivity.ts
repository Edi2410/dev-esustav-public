import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetAllActivity = () => {
  const axios = useAxios();

  const fetchActivityData = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(
          `eaktivnosti/activity/`
        );
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery("activity_data", fetchActivityData, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
