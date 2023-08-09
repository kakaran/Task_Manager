import * as Yup from "yup";
const PasswordRegExp =
  / ^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const PhoneRegExp = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/

export const signUpSchema  = Yup.object({
  FName: Yup.string().min(2).max(25).required("Please enter first name"),
  LName: Yup.string().min(2).max(25).required("Please enter last name"),
  Email: Yup.string().email().required("Please enter email"),
  Password: Yup.string().matches(PasswordRegExp, ""),
  PhoneNo : Yup.string().matches(PhoneRegExp, "Phone number is not valid" )
});


export const UserInfoSchema  = Yup.object({
    FName: Yup.string().min(2).max(25).required("Please enter first name"),
    LName: Yup.string().min(2).max(25).required("Please enter last name"),
    PhoneNo : Yup.string().matches(PhoneRegExp, "Phone number is not valid" )
  });