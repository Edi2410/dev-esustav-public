
import { message } from "antd";
import { useQuery } from "react-query";
import { useAxios } from "./useAxios";

export const useGetMyTeamUser = () => {
  const axios = useAxios();

  const fetchMyTeamUser = async () => {
    try {
      const { data } = await axios.get(`estudenti/teams/get-my-team/`);

      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka");
    }
  };

  return useQuery(["my_team_members"], fetchMyTeamUser, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
