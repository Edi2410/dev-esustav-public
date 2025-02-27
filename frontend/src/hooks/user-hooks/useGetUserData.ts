import { useAxios } from "hooks/useAxios";
import { useQuery } from "react-query";


export const useGetUserData = () => {
  const axios = useAxios();

  const fetchUserData = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("estudenti/users/data/");

        return {
          ...data?.user_data,
          permissions: data?.permissions,
          academic_year: data?.academic_year,
        };
      } catch (error) {
        throw new Error("Podaci o korisniku nisu dohvačeni");
      }
    }
    return null;
  };

  return useQuery("user_data", fetchUserData, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
