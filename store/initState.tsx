import { GlobalProps } from "./props";

export const initState: GlobalProps = {
  loading: false,
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
