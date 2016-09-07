'use strict';

var express = require('express');
var controller = require('./invoice.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/id/:id', auth.isAuthenticated(), controller.show);
router.get('/empid/:id', auth.isAuthenticated(), controller.invoicesByEmpId);
router.get('/invoice/:id', auth.isAuthenticated(), controller.invoiceNumber);
router.get('/portfolio/:name', auth.isAuthenticated(), controller.portfolioName);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/invoice/:id', auth.isAuthenticated(), controller.update);
router.delete('/id/:id',auth.isAuthenticated(), controller.destroy);

module.exports = router;
