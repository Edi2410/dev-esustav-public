import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetElectionsResults = () => {
  const axios = useAxios();

  const getElectionsResults = async () => {
    try {
      const { data } = await axios.get(`eizbori/elections/votes/results/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja rezultata izbora");
    }
  };

  return useQuery(["elections_results"], getElectionsResults, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
