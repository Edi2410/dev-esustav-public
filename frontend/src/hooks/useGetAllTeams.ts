import { useQuery } from "react-query";
import { useAxios } from "./useAxios";

export const useGetAllTeams = () => {
  const axios = useAxios();

  const fetchTeamsAllData = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("estudenti/teams/");
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery("teams_data", fetchTeamsAllData, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
