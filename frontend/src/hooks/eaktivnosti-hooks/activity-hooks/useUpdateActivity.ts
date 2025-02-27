import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { CreateActivityType } from "types";

export const useUpdateActivity = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const updateActivity = async (ActivityData: CreateActivityType) => {
    try {
      const response = await axios.patch(
        `eaktivnosti/activity/${ActivityData.id}/`,
        ActivityData
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom uređenja aktivnosti");
    }
  };

  return useMutation(updateActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity_data"] });
      message.success("Aktivnost je uspješno uređena");
    },
  });
};
