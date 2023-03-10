interface Props {
  firstName?: string;
  lastName?: string;
  ssc_batch?: string;
  email?: string;
  confirm_email?: string;
  password?: string;
  confirm_password?: string;
}
const validate = (registerData: Props) => {
  const {
    firstName,
    lastName,
    ssc_batch,
    email,
    confirm_email,
  } = registerData;

  let errors: Array<string> = [];

  if (
    !firstName ||
    !lastName ||
    !ssc_batch ||
    !email ||
    !confirm_email
  ) {
    errors.push(
      "First name is required",
      "Last name is required",
      "SSC Batch is required",
      "Email is required",
      "Please re-enter your email address",
    );
  }

  if (confirm_email !== email) {
    errors.push("Email did not match");
  }

  // if (password !== undefined) {
  //   if (password.length < 6) {
  //     errors.push("Password should include atleast 6 characters");
  //   }
  // }

  // if (password !== confirm_password) {
  //   errors.push("Password did not match");
  // }
  return errors;
};

export default validate;
