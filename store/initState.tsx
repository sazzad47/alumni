import { GlobalProps } from "./props";

export const initState: GlobalProps = {
  searchTerm: "",
  loading: false,
  notify: {},
  register: {
    firstName: "",
    lastName: "",
    ssc_batch: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
  },
  auth: {},
  users: [],
};
