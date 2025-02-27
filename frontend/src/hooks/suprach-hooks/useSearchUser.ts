import { useAxios } from "hooks/useAxios";
import { useQuery } from "react-query";

export const useSearchUser = (search: string | undefined) => {
  const axios = useAxios();

  const searchUser = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get(
          `suprach/user-to-comment/?search=${search}`
        );
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti korisnike");
      }
    }
    return null;
  };

  return useQuery(["suprach_search_user", search], searchUser, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
