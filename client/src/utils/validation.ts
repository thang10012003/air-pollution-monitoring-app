export class Validate{
    static email(mail: string){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(emailRegex.test(mail)){
            return true;
        }
        return false;
    }
    static password(password: string){
        return password.length >=6;
    }
    static confirmPassword(pass: string,confirmPass: string){
        return pass === confirmPass;
    }
    static extractNameFromEmail(email: string) {
        // Tách chuỗi email dựa trên ký tự '@'
        const [name] = email.split('@');
        return name;
    }
}