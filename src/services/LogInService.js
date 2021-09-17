import axios from 'axios'

const LOGIN_REST_API_URL = "http://localhost:8080/api/v1/auth"

class LogInService {
    userLogIn(email, password) {
        return axios.post( LOGIN_REST_API_URL+"/login",{
            "email": email,
            "password": password
          })
    }

    userRegister(email, password, firstName, lastName) {
        return axios.post( LOGIN_REST_API_URL+"/register", {
            "email": email,
            "password": password,
            "firstName" : firstName,
            "lastName": lastName
        })
    }
}

export default new LogInService();