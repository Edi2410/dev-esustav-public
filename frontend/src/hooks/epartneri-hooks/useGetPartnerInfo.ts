import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetPartnerInfo = (partnerId: string | undefined) => {
  const axios = useAxios();

  const useGetPartnerInfos = async () => {
    try {
      const { data } = await axios.get(`epartneri/partners/${partnerId}`);
      return data;
    } catch (error) {
      throw new Error("Greška kod dohvaćanja informacija o partneru");
    }
  };

  return useQuery(["partners_info_data"], useGetPartnerInfos, {
    onError: (error) => message.error(String(error)),
    enabled: !!partnerId,
    staleTime: Infinity,
  });
};
