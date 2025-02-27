import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetCandidateLeader = () => {
  const axios = useAxios();

  const fetchCandidateLeader = async () => {
    try {
      const { data } = await axios.get(`eizbori/elections/voditelji/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka o izborima");
    }
  };

  return useQuery(["election_candidate_voditelji_data"], fetchCandidateLeader, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
