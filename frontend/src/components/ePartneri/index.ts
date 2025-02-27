import { lazy } from "react";

const PartnerForm = lazy(() => import("./PartnerForm"));
const AddNewPartnerModal = lazy(() => import("./AddNewPartnerModal"));

const AddNewContactsModal = lazy(
  () => import("./Contacts/AddNewContactsModal")
);

const ContactsForm = lazy(() => import("./Contacts/ContactsForm"));
const EditContactModal = lazy(() => import("./Contacts/EditContactModal"));
const DeleteContactsButton = lazy(
  () => import("./Contacts/DeleteContactsButton")
);

const NotesForm = lazy(() => import("./Notes/NotesForm"));
const AddNewNotesModal = lazy(() => import("./Notes/AddNewNotesModal"));
const DeleteNotesButton = lazy(() => import("./Notes/DeleteNotesButton"));
const EditNotesButton = lazy(() => import("./Notes/EditNotesButton"));
const EditPartnerButton = lazy(() => import("./EditPartnerButton"));
export {
  AddNewPartnerModal,
  PartnerForm,
  AddNewContactsModal,
  ContactsForm,
  DeleteContactsButton,
  EditContactModal,
  NotesForm,
  AddNewNotesModal,
  DeleteNotesButton,
  EditNotesButton,
  EditPartnerButton,
};
