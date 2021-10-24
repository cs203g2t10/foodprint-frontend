import axios from 'axios'
import LogInService from './LogInService';

const VACCINATION_REST_API_URL = process.env.REACT_APP_CF_PAGES ? "https://api.foodprint.works/api/v1/vaccination" : "http://localhost:8080/api/v1/vaccination";

class VaccinationService {

    headers = () => {
        const token = window.localStorage.getItem("token");
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }
    
    userUploadVaccination = (certFile: File) => {
        const userId = LogInService.getUserDetails().userId;
        const formData = new FormData();
        formData.append("file", certFile);
        return axios.post(VACCINATION_REST_API_URL + `/validate/${userId}`, formData, this.headers());
    }

}

export default new VaccinationService();

