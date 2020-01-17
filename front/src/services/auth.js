import BaseHttpService from "./api";

class authService extends BaseHttpService {
    
    login(data){
        return this.post('api/login/', data)
    }
}

export default new authService()