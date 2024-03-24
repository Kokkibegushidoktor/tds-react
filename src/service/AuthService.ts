import {unAuthorizedApi} from "../api/apiInstance.ts";
import {authEndpoints} from "../api/endpoints.ts";
import {useAuth} from  '../store/UseAuth.ts'


export interface ISignInRequest {
    username: string,
    password: string
}

export interface ISignInResponse {
    token: string
}

class AuthService  {
    async login (data: ISignInRequest)  {
        await unAuthorizedApi
            .post(authEndpoints.SignIn, {
                json: {...data},
            })
            .json()
            .then((resp)=> {
                
                useAuth().setAuth(true)

            })
    }
    logout ()  {
        localStorage.removeItem('username');
        return Promise.resolve();
    }
    checkAuth () {
        localStorage.getItem('username') ? Promise.resolve() : Promise.reject()
    }
    checkError  (error) {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    }
    getIdentity () {
        Promise.resolve({
            id: 'user',
            fullName: 'John Doe',
        })
    }
    getPermissions () {
        Promise.resolve('')
    }
}

export default new AuthService();
