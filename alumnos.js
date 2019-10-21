
const request = require("request")
const info = require("./alumnoinfo.js")

estudiante = function (id, callback) {
  const alumno = info.alumno.find(function (item) {
    return item.id === id
  });

  if (alumno) {
    callback(alumno, undefined)
  }
  else {
    callback({ error: "Mattricula no encontrada" }, undefined)
  }

};

module.exports = { estudiante }