import { useQuery } from "react-query";
import { useAxios } from "./useAxios";

export const useGetAllVirtualTeams = () => {
  const axios = useAxios();

  const fetchVirtualTeamsAllData = async () => {
    if (sessionStorage.getItem("accessToken") !== null) {
      try {
        const { data } = await axios.get("estudenti/virtualteam/");
        return data;
      } catch (error) {
        throw new Error("Nije moguće dohvatiti podatke");
      }
    }
    return null;
  };

  return useQuery("virtual_teams_data", fetchVirtualTeamsAllData, {
    onError: (error) => console.log("error", error),
    staleTime: Infinity,
  });
};
