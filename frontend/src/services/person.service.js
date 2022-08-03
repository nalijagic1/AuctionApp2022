import httpCommon from "../http-common";

class PersonDataService {
   logIn(email,password){
    return httpCommon.post("/people/login",{email,password}).then((response) =>{
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
          }
          return response.data;
        });
   }

   createAccount(firstName,lastName,email,password){
    return httpCommon.post("/people/register",{firstName,lastName,email,password}).then((response)=>{
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
   }
}

export default new PersonDataService();