import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetElectionsType = () => {
  const axios = useAxios();

  const fetchElectionsType = async () => {
    try {
      const { data } = await axios.get(`eizbori/elections/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja podataka o izborima");
    }
  };

  return useQuery(["election_type_data"], fetchElectionsType, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
