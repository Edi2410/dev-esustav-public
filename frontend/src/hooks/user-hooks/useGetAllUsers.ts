import { useQuery } from "react-query";
import { useAxios } from "../useAxios";

export const useGetAllUsers = () => {
  const axios = useAxios();

  const fetchUsersListData = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("estudenti/users/");
        return data;
      } catch (error) {
        throw new Error("Podaci o estudentima nisu dohvačeni");
      }
    }
    return null;
  };

  return useQuery("users_list_data", fetchUsersListData, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
