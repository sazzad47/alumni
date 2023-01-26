const validatePassword = ({
  email,
  password,
  confirm_password,
}: {
  email?: string;
  password: string;
  confirm_password: string;
}) => {
  let errors: Array<string> = [];

  if (!email) {
    errors.push("Unauthorized attempt!");
  }

  if (password !== undefined) {
    if (password.length < 6) {
      errors.push("Password should include atleast 6 characters");
    }
  }

  if (password !== confirm_password) {
    errors.push("Password did not match");
  }
  return errors;
};

export default validatePassword;
