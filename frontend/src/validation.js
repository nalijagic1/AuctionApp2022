class Validation {
    validateEmail(email) {
        var errorMessage = "";
        if(!email){
            errorMessage = "Email is requered!"
        }else{
            const expression =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(!expression.test(email.toLowerCase())){
              errorMessage = "Email format is not valid, please try again!"  
            }
        }
        return errorMessage;
    }

    validateNames(name,type){
        var errorMessage = "";
        if(!name){
            errorMessage = type + " name is requered!"
        }else if( !/^[a-zA-Z]+$/.test(name)){
            errorMessage = type + " name must contain only letters!"
        }
        return errorMessage;
    }

    validatePassword(password){
        var errorMessage = "";
        if(!password){
            errorMessage = "Password is requered!";
        }else if(!/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(password)){
            errorMessage ="Your password is week!";
        }
        return errorMessage;
    }


}

export default new Validation();
