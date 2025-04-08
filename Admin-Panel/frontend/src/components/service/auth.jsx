import axios from 'axios'

const  authService = {
    login: async (Email, Password)=>{
        try{

            const response = await axios.post('http://localhost:7000/api/v1/user/login', {Email, Password});
            console.log(response);
            console.log(response.data.success);
            if(!response.data.success){
                return null;
            }
            console.log(response);
            const token = response.data.token;
            localStorage.setItem('Estate',token);
            localStorage.setItem('Estate-user_id',response.data.result.user_id);
            console.log(token);
            return token;
        }catch(error){
            console.log("Login failed", error);
            return null;
        }
    }
}

export default authService;