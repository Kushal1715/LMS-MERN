export const signUpFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Please enter your user name",
    type: "text",
    componentType: "input",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Please enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Please enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Please enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signUpInitialValue = {
  userName: "",
  email: "",
  password: "",
};

export const signInInitialValue = {
  email: "",
  password: "",
};
