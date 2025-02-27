import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";

export const useGetUsersWhoNotFillSuprach = () => {
  const axios = useAxios();

  const getUsersWhoNotFill = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(`suprach/user-who-not-fill-suprach/`);
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery(["users_who_not_fill_suprach"], getUsersWhoNotFill, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
