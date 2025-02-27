import { useMutation } from "react-query";
import { useAxios } from "hooks/useAxios";
import { useQueryClient } from "react-query";
import { message } from "antd";
import { CreateActivityType } from "types";
export const useAddNewActivity = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const addNewActivity = async (ActivityData: CreateActivityType) => {
    try {
      const response = await axios.post("eaktivnosti/activity/", ActivityData);
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom unosa aktivnosti");
    }
  };

  return useMutation(addNewActivity, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activity_data"] });
      message.success("Aktivnost je uspješno unesena");
    },
  });
};
