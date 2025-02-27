import { useQuery } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useGetUserStatus = (id: number | undefined) => {
  const axios = useAxios();

  const fatchUserStatus = async () => {
    try {
      const { data } = await axios.get(`einfo/stats/?id=${id}`);
      return data;
    } catch (error) {
      throw new Error(
        "Greška kod dohvačanja podataka"
      );
    }
  };

  return useQuery(["user_status_einfo", id], fatchUserStatus, {
    onError: (error) => message.error(String(error)),
    enabled: id ? true : false,
    staleTime: Infinity,
  });
};
