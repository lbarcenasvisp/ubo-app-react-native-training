
import axios from 'axios'
import { AUTH_INTERFACE } from '../config';

const api_login_user = async(args) => {
    return await Api({...args}, "authenticate");
}


const Api = async(payload, endpoint) => {
    try {
        const response = await axios.post(
            AUTH_INTERFACE,
            payload,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          return response
    } catch (e) {
        return {
            "error" : "API exception occurred. Details: " + e.message
        }
    }
}

export {
    api_login_user
}