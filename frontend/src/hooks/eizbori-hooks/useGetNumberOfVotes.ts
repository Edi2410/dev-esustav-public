import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetNumberOfVotes = () => {
  const axios = useAxios();

  const fetchNumberOfVotes = async () => {
    try {
      const { data } = await axios.get(`eizbori/elections/votes/number/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja broja glasova");
    }
  };

  return useQuery(["number_of_votes"], fetchNumberOfVotes, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
