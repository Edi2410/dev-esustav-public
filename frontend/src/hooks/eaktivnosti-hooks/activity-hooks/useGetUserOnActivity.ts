import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetUserOnActivity = (activity_id: number | undefined) => {
  const axios = useAxios();

  const fetchUserOnActivityData = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(
          `eaktivnosti/user/activity/?id=${activity_id}`
        );
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery(["user_on_activity_data", activity_id], fetchUserOnActivityData, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
    enabled: activity_id !== undefined,
  });
};
