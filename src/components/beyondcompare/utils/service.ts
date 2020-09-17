import axios from 'axios'
const bayMaxUrl = "http://localhost:1212"

export default class BeyondCompareService {
    folderCompare(left:string,right:string){
        return axios.post(bayMaxUrl+"/bcomparefolder",{left,right})
    }
}