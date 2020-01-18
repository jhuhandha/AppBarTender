import BaseHttpService from "./api";

class orderService extends BaseHttpService {
    
    index(){
        return this.get('api/order')
    }

    save(data){
        return this.post('api/order', data)
    }
}

export default new orderService()