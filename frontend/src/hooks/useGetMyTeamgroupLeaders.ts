import { useAxios } from "./useAxios";
import { message } from "antd";
import { useQuery } from "react-query";

export const useGetMyTeamgroupLeaders = () => {
  const axios = useAxios();

  const fetchMyTeamgroupLeaders = async () => {
    try {
      const { data } = await axios.get(
        `estudenti/teamsgroup/get-my-team-leaders/`
      );

      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka");
    }
  };

  return useQuery(["my_teamgroup_leaders"], fetchMyTeamgroupLeaders, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
