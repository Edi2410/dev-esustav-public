import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetPartnersList = () => {
  const axios = useAxios();

  const getPartnersList = async () => {
    try {
      const { data } = await axios.get(`epartneri/partners/`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja partnera");
    }
  };

  return useQuery(["partners_list_data"], getPartnersList, {
    onError: (error) => message.error(String(error)),
    staleTime: Infinity,
  });
};
