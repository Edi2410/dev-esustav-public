import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useSetSecondSuprachOnTrue = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const setSecondSuprachOnTrue = async () => {
    try {
      const response = await axios.post(`einfo/admin/suprach-2-all-true/`);
      return response.data;
    } catch (error) {
      throw new Error("Greška kod postavljanja podataka");
    }
  };

  return useMutation(setSecondSuprachOnTrue, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certificate_requirements_data_for_user"],
      });
      message.success("Success (refresh page)");
    },
    onError: (error) => {
      message.error(String(error));
    },
  });
};
