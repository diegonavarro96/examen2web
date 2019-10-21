const express = require('express')
const met = require('./met.js')
const Port = process.env.PORT || 3000
const app = express()
const request = require('request')
const aux = require("./alumnos.js")

//////Alumno///////////////
app.get("/students/:id", (req, res) => {
  res.setHeader('Content-Type', 'application/json')
	res.setHeader('Access-Control-Allow-Origin',  "*")
    var id = req.params.id;
   // console.log(id);
    aux.estudiante(id, alumno => {
      //console.log(alumno)
      res.send(alumno)
    })
  })
   
  app.get('/', function (req, res) {
    res.send({
        greeting: 'Bienvendio a la app de alumnos!'
    })
})


///

/////////Museos///////////////////
app.get('/met', function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: "Debes enivar el query search"
        })
    } 
        museos.busqueda(req.query.search, function (error, dataMuseos) {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send(dataMuseos)
        })
    
})



app.get('/', function (req, res) {
    res.send({
        greeting: 'Bienvendio a app de museos!'
    })
})



// no section found
app.get('*', function (req, res) {
    res.send({
        error: 'Ruta no valida!'
    })
})

app.listen(Port, function () {
    console.log('up and running!')
})
