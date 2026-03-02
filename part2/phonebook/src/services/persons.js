import axios from "axios"

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
    console.log('kaikki henkilöt haettu palvelimelta')
}
const create = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then((response) => {
        console.log('lähetys onnistui')
        return(
            response.data
        )} )
}

const del = (id) =>{
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then((response) => response.data)
}

const modify = (existingPerson, personObject) => {
    console.log(existingPerson.id)
    const url = baseUrl.concat('/').concat(existingPerson.id)
    const request = axios.put(url,personObject)
    return request.then((response) => response.data)
}

export default {create, del, getAll, modify}
