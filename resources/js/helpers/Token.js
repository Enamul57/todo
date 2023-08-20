class Token{
    isValid(token){
        const payload = this.payload(token);
        if(payload){
            return payload.iss = 'http://http://127.0.0.1:8000/api/admin/login' || 'http://127.0.0.1:8000/api/admin/register'  ? true : false;
        }
        return 'not valid token';
    }
    payload(token){
       const payload = token.split('.')[1];
       return this.decode(payload);
    }

    decode(token){
        return JSON.parse(atob(token));
    }
}

export default Token = new Token();
