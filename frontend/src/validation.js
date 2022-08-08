class Validation {
    validateEmail(email) {
        var errorMessage = "";
        if (!email) {
            errorMessage = "Please enter your email address.";
        } else {
            const expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!expression.test(email.toLowerCase())) {
                errorMessage = "Please enter a valid email address.";
            }
        }
        return errorMessage;
    }

    validateNames(name, type) {
        var errorMessage = "";
        if (!name) {
            errorMessage ="Please enter your "+  type  + " name.";
        } else if (!/^[a-zA-Z]+$/.test(name)) {
            errorMessage = "Please enter your " + type + " name correctly.";
        }
        return errorMessage;
    }

    validatePassword(password) {
        var errorMessage = "";
        if (!password) {
            errorMessage = "Please enter your password";
        }
        else if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)){
            errorMessage = "Your password is strong";
        } else if (/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(password)) {
            errorMessage = "Your password is medium strength.";
        }else{
            errorMessage = "Your password is weak.";
        }
        return errorMessage;
    }

    determainPasswordStrength(password){
        if (!password) {
            return "";
        }
        else if(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password)){
            return "strong";
        } else if (/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/.test(password)) {
            return "medium";
        }else{
            return "weak";
        }
    }


}

export default new Validation();
