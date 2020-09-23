import axios from 'axios'
const bayMaxUrl = "http://localhost:1212"

export default class PuttyService {
    openSession(session:ValueLabel){
        return axios.post(bayMaxUrl+"/putty",session)
    }
}
interface ValueLabel {
    value: string
    label: string
}