import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const Signup = {
  postSignup: async (fullName: string, email: string, password: string) => {
    return axios
      .post(`${baseUrl}/auth/register`, {
        fullName: fullName,
        email: email,
        password: password,
      })
      .then((res) => res.data)
      .catch((error) => console.error(error));
  },
};

export default Signup;
