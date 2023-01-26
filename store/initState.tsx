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
       confirm_password: ""
    },
    auth: {
      // user: {
      //   firstName: "",
      //   lastName: "",
      //   ssc_batch: "",
      //   placeOfBirth: "",
      //   currentLocation: "",
      //   education: "",
      //   profession: "",
      //   expertise: "",
      //   biography: "",
      //   socialMedia: "",
      //   status: "",
      //   subscription: "",
      //   email: "",
      //   role: "",
      //   avatar: "",
      //   root: "",
      // },
      // token: ""
    },
    users: [],
  };