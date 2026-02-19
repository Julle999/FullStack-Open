import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then((response) => {
        console.log('lähetys onnistui')
        return(
            response.data
        )} )
}

export default {create}