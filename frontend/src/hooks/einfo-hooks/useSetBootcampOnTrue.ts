import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "hooks/useAxios";
import { message } from "antd";

export const useSetBootcampOnTrue = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const setBootcampOnTrue = async () => {
    try {
      const response = await axios.post(`einfo/admin/bootcamp-all-true/`);
      return response.data;
    } catch (error) {
      throw new Error("Greška kod postavljanja podataka");
    }
  };

  return useMutation(setBootcampOnTrue, {
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
