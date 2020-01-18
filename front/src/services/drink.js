import BaseHttpService from "./api";

class drinkService extends BaseHttpService {
    
    index(){
        return this.get('api/drink')
    }

    edit(id){
        return this.get(`api/drink/${id}`)
    }

    save(data){
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        return this.post('api/drink', data, config)
    }

    modify(data, id){
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        return this.put(`api/drink/${id}`, data, config)
    }
}

export default new drinkService()