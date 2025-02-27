import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetIsVoted = () => {
  const axios = useAxios();

  const fetchIsVoted = async () => {
    try {
      const { data } = await axios.get(`eizbori/elections/votes/is-voted/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja informacija jeli korisnik glasao");
    }
  };

  return useQuery(["is_voted_data"], fetchIsVoted, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
