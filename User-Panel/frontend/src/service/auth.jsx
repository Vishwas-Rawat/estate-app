import axios from "axios";

const authService = {
  login: async function login(email, password) {
    try {
      const response = await axios.post(
        "http://localhost:7000/api/v1/user/login",
        {Email: email,
        Password: password}
      );

      if(!response.data.success){
        throw new Error(response.data.msg || "Login failed")
      }
      console.log(response);
      const token = response.data.token;
      const id = response.data.result.user_id;
      localStorage.setItem("eStateToken", token);
      localStorage.setItem("eState-userId", id);
      return token;
    } catch (error) {
      console.log("Login failed");
      throw error;
    }
  },
};

export default authService;
