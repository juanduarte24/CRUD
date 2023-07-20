import axios from "axios"
import { useState } from "react"
axios

const useFetch = (baseUrl , callback) => {

    const [infoApi, setInfoApi] = useState()


    //*GET
    const getApi = (path) => {
        const url = `${baseUrl}${path}/`
        axios.get(url)
            .then(res => setInfoApi(res.data))
            .catch(error => console.log(error))


        /* *Peticion con Fetch
        fetch(url)
        .then(res => res.json)
        .then(res => setInfoApi(res.json))
        .catch(err => console.log(err))
    */}
    //* POST
    const postApi = (path, data) => {
        const url = `${baseUrl}${path}/`
        axios.post(url, data)
            .then(res => {
                console.log(res.data)
                setInfoApi([...infoApi, res.data])
                callback(true)
            })
            .catch(err => console.log(err))
    }

    //*DELETE
    const deleteApi = (path, id) => {
        const url = `${baseUrl}${path}/${id}/`
        axios.delete(url)
            .then(res => {
                console.log(res.data)   //    el elemento que sea diferente se filtrara y el que sea igual al id que le pasamos primero a la funcion deleteApi se eleminara
                const infoApiFiltered = infoApi.filter(e => e.id !== id)
                setInfoApi(infoApiFiltered) //guardamos en setInfoApi la informacion filtrada
            })
            .catch(err => console.error(err))
    }

    //* UPDATE
    const updateApi = (path, id, data) => {
        //El update necesita la url que consta de la url base seguido de el path y el id
        const url = `${baseUrl}${path}/${id}/`
        //Se utiliza axios.patch o put
        // y como parametros recibe el url y la data que le enviaremos para actualizar
        axios.patch(url, data)
            .then(res => {
                console.log(res.data)
                const infoApiMap = infoApi.map(e => e.id === id ? res.data : e)
                setInfoApi(infoApiMap)
                callback(true)
            })
            .catch(err => console.error(err))
    }
    return [infoApi, getApi, postApi, deleteApi, updateApi]
}



export default useFetch 