'use strict';

require('dotenv').config();
const connMongoose = require('./lib/connMongoose');
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const Usuario = mongoose.model('Usuario');

const fs = require('fs');
const path = require('path');
const fileBDConfig = path.join(__dirname, 'dataInit.json');


/**
 * Lee el fichero de datos a cargar en la base de datos.
 * @function
 * @name readDbFile
 */
function readDbFile() {
    return new Promise((resolve, reject) => {
        fs.readFile(fileBDConfig, { encoding: 'utf-8'}, (err, data) => {
            if (err) {
                reject(new Error('No se ha podido leer el fichero', fileBDConfig));
                return;
            }
            const jsonContent = JSON.parse(data);
            if (!jsonContent) {
                reject(new Error('El fichero', fileBDConfig, 'no cumple con el formato esperado.'));
                return;
            }
            else if (!jsonContent.hasOwnProperty(Anuncio.getCollectionName())) {
                reject(new Error(`El fichero ${fileBDConfig} no contiene datos para la precarga de la tabla ${Anuncio.getCollectionName()}`));
                return;
            }
            else if (!jsonContent.hasOwnProperty(Usuario.getCollectionName())) {
                reject(new Error(`El fichero ${fileBDConfig} no contiene datos para la precarga de la tabla ${Usuario.getCollectionName()}`));
                return;
            }
            console.log('Fichero', fileBDConfig, 'leido correctamente.');
            resolve(jsonContent);
        });
    });
}

function persistDataFromFile(dbModel, data) {
    return new Promise((resolve, reject) => {
        const nombreColeccion = dbModel.getCollectionName();        
        let datosModelo = data[nombreColeccion];
        console.log('datosModelo: ', datosModelo);
        if (!datosModelo.length || datosModelo.length === 0) {
            reject(new Error(`No hay datos para cargar la tabla ${nombreColeccion}`));
            return;
        }
        
        dbModel.create(datosModelo, (err, docs) => {
            if (err) {
                reject(new Error(`No se han podido insertar los datos en la tabla ${nombreColeccion}: ${err.errmsg}`));
                return;
            }
            resolve();
        });
    });
}

/**
 * Función principal.
 * Limpia bbdd, lee el fichero y realiza la precarga de la bbdd.
 * @function
 * @name feedDB
 */
async function feedDB() {
    await Anuncio.db.dropDatabase();

    let data = await readDbFile();
    console.log('Guardado datos del fichero', fileBDConfig,'en la colección "anuncios"');
    await persistDataFromFile(Anuncio, data);
    console.log('............................................ OK');
    console.log('Guardado datos del fichero', fileBDConfig,'en la colección "usuarios"');
    await persistDataFromFile(Usuario, data);
    console.log('............................................ OK');
    
    return true;
}

connMongoose.once('open', () => {
    feedDB()
    .then(() => {
        console.log('Precarga realizada con éxito!');
        process.exit(0);
    })
    .catch(err => {
        console.log('No se ha realizado la precarga. Error:', err);
        process.exit(1);
    });
});
