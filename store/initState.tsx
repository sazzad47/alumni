import { GlobalProps } from "./props";

export const initState: GlobalProps = {
  news: {
    currentPage: 1,
    totalPage: 0,
    searchTerm: ""
  },
  notice: {
    currentPage: 1,
    totalPage: 0,
    searchTerm: ""
  },
  event: {
    past: {
      currentPage: 1,
      totalPage: 0,
      searchTerm: ""  
    },
    upcoming: {
      currentPage: 1,
      totalPage: 0,
      searchTerm: ""
    }
  },
  searchTerm: "",
  loading: false,
  notify: {},
  register: {
    firstName: "",
    lastName: "",
    ssc_batch: "",
    phone: "",
    email: "",
    confirm_email: "",
    password: "",
    confirm_password: "",
    membership: "",
    currency: "",
    amount: 0,
  },
  auth: {},
  users: [],
};
