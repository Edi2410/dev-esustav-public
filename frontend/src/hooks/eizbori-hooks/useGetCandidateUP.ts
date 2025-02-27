import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetCandidateUP = () => {
  const axios = useAxios();

  const fetchCandidateUP = async () => {
    try {
      const { data } = await axios.get(`eizbori/elections/up/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka o kandidatima");
    }
  };

  return useQuery(["election_candidate_up_data"], fetchCandidateUP, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
