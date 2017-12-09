'use strict';

const express = require('express');
const router = express.Router();
const retrieveJSON = require('../../lib/retrieveJSON');

const Anuncio = require('../../models/Anuncio');

/**
 * GET /anuncios
 * Consulta de anuncios.
 */
router.get('/', (req, res, next) => {
    
});