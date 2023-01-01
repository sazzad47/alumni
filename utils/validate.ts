
export interface RegisterDataProps {
    firstName: string;
    lastName: string;
    ssc_batch: string | number;
    email: string;
    confirm_email: string;
    password: string;
    confirm_password: string;
}
const validate = (data: RegisterDataProps)=> {
    const {firstName, lastName, ssc_batch, email, confirm_email, password, confirm_password} = data;
    
    let errors: Array<string> = [];
   
    if (!firstName || !lastName || !ssc_batch || !email || !confirm_email || !password || !confirm_password) {
        errors.push("First name is required",
         "Last name is required",
          "SSC Batch is required",
          "Email is required",
          "Please re-enter your email address",
         "Password is required")

    } 

    if (confirm_email !== email) {
        errors.push("Email did not match")
    }

    if (password.length < 6) {
        errors.push("Password should include atleast 6 characters")
    }

    if (password !== confirm_password) {
        errors.push("Password did not match")
    }
    return errors
} 

export default validate
 