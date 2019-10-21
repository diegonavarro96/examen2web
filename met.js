const request = require('request')


const busqueda = function (search, callback) {
    const url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + search
    request({ url, json: true }, function (error, response) {
        if (error) {
            callback('Error en la conexion del Primer Request ', undefined)
        }
        else {
            const datamuseos = response.body
            if (datamuseos.total == 0) {
                return callback('Objeto no encontrado', undefined)
            }
            if (datamuseos.message) {
               return callback('Error', undefined)
            }
            else {
                const objectID = datamuseos.objectIDs[0]
                const url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + objectID
                console.log(url)
                request({ url, json: true }, function (error, response) {
                    if (error) {
                      return callback('Error en el segundo request', undefined)
                    }
                    else {
                        const data = response.body
                        if(data.message)
                        {
                            return callback('Error', undefined)
                        }
                        else
                        {
                            const infomuseos = {
                                searchTerm: search,
                                artist: data.constituents[0].name,
                                title: data.title,
                                year: data.objectEndDate,
                                technique: data.medium,
                                metUrl: data.objectURL
                            }
                          return  callback(undefined, infomuseos)
                        }
                       
                    }
            
                })
            }

        }

    })
}
module.exports = {
    busqueda: busqueda
}