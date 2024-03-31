import {authorizedApi, unAuthorizedApi} from "../api/apiInstance.ts";
import {authEndpoints} from "../api/endpoints.ts";

export interface ISignInRequest {
    username: string,
    password: string
}

export interface ISignInResponse {
    token: string
}

export interface ICreateUserRequest {
    username: string
}

export interface ISetUpRequest {
    username: string,
    password: string
    password_repeat: string
}

class AuthService  {
    async login (data: ISignInRequest)  {
       return await unAuthorizedApi
            .post(authEndpoints.SignIn, {
                json: {...data},
            })
            .json<ISignInResponse>()
    }

    async setUp(data: ISetUpRequest) {
        return unAuthorizedApi
            .post(authEndpoints.SignUp, {
                json: {...data}
            })
    }

    async createUser(data: ICreateUserRequest) {
        return authorizedApi
            .post(authEndpoints.CreateUser, {
                json: {...data}
            })
    }
    logout ()  {
        localStorage.removeItem('username');
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
