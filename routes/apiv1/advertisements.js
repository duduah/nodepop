'use strict';

const express = require('express');
const router = express.Router();
const retrieveJSON = require('../../lib/retrieveJSON');

const Advertisement = require('../../models/Advertisement');

/**
 * GET /advertisement
 * Consulta de anuncios.
 */
router.get('/', (req, res, next) => {
    
});