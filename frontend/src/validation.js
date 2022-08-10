import { LETTERS_ONLY, PASSWORD_MEDIUM, PASSWORD_STRONG, EMAIL_REGEX } from "./constants";
class Validation {
    validateEmail(email) {
        var errorMessage = "";
        if (!email) {
            errorMessage = "Please enter your email address.";
        } else if (!EMAIL_REGEX.test(email.toLowerCase())) {
                errorMessage = "Please enter a valid email address.";
        }
        return errorMessage;
    }

    validateNames(name, type) {
        var errorMessage = "";
        if (!name) {
            errorMessage ="Please enter your "+  type  + " name.";
        } else if (!LETTERS_ONLY.test(name)) {
            errorMessage = "Please enter your " + type + " name correctly.";
        }
        return errorMessage;
    }

    validatePassword(password) {
        var errorMessage = "";
        if (!password) {
            errorMessage = "Please enter your password";
        }
        else if(PASSWORD_STRONG.test(password)){
            errorMessage = "Your password is strong";
        } else if (PASSWORD_MEDIUM/test(password)) {
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
        else if(PASSWORD_STRONG.test(password)){
            return "strong";
        } else if (PASSWORD_MEDIUM.test(password)) {
            return "medium";
        }else{
            return "weak";
        }
    }


}

export default new Validation();
