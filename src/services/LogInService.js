import axios from 'axios'

const LOGIN_REST_API_URL = "http://localhost:8080/api/v1/auth"

class LogInService {
    logIn() {
        return axios.post( LOGIN_REST_API_URL+"/login",{
            "email": "bobbytan@gmail.com",
            "password": "SuperSecurePassw0rd"
          })
    }

    userLogIn(email, password) {
        return axios.post( LOGIN_REST_API_URL+"/login",{
            "email": email,
            "password": password
          })
    }
}

export default new LogInService();