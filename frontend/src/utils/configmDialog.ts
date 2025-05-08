import { Modal } from "antd";
const { confirm } = Modal;

export const showDeleteConfirmModal = (
  id: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteActivity: any,
) => {
  confirm({
    title: "Da li ste sigurni da želite obrisati aktivnost?",
    okText: "Da",
    okType: "danger",
    cancelText: "Ne",
    onOk() {
      deleteActivity.mutate(id);
    },
  });
};
