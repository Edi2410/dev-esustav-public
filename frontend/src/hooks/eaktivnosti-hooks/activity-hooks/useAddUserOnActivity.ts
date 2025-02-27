import { useMutation } from "react-query";

import { useQueryClient } from "react-query";
import { AddUserOnActivityType } from "types";
import { message } from "antd";
import { useAxios } from "hooks/useAxios";

export const useAddUserOnActivity = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();

  const addNewUserOnActivity = async (
    UserOnActivity: AddUserOnActivityType
  ) => {
    try {
      const response = await axios.post(
        "eaktivnosti/user/activity/",
        UserOnActivity
      );
      return response.data;
    } catch (error) {
      throw new Error("Greška prilikom dodavanja osobe");
    }
  };

  return useMutation(addNewUserOnActivity, {
    onSuccess: () => {
      message.success("Osoba uspješno dodana");
      queryClient.invalidateQueries({ queryKey: ["user_on_activity_data"] });
      queryClient.invalidateQueries({
        queryKey: ["certificate_requirements_data_for_user"],
      });
      queryClient.invalidateQueries({
        queryKey: ["certificate_requirements_data_for_voditelj"],
      });
      queryClient.invalidateQueries({
        queryKey: ["certificate_requirements_data_for_koordinator"],
      });
      queryClient.invalidateQueries({
        queryKey: ["certificate_requirements_data_for_clan"],
      });
    },
  });
};
