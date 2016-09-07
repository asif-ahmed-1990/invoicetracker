/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/invoices              ->  index
 * POST    /api/invoices              ->  create
 * GET     /api/invoices/:id          ->  show
 * PUT     /api/invoices/:id          ->  update
 * DELETE  /api/invoices/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Invoice from './invoice.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    console.log(entity[0]);
    console.log(updates);
    var updated = _.merge(entity[0], updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Invoices
export function index(req, res) {
  return Invoice.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of Invoices For assigned for Employee
export function invoicesByEmpId(req, res) {
  return Invoice.find().where('COGOwnerID').equals(req.params.id).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Search by invoice Number
export function invoiceNumber(req, res) {
  return Invoice.find().where('InvoiceNo').equals(req.params.id).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}


//Gets a list of Invoices for a particular portfolio
export function portfolioName(req, res) {
  return Invoice.find().where('Portfolio').equals(req.params.name).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}



// Gets a single Invoice from the DB
export function show(req, res) {
  return Invoice.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Invoice in the DB
export function create(req, res) {

  Invoice.remove({},function(){}); //



  return Invoice.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Invoice in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
    delete req.body.__v;
  }
  if (req.body.InvoiceNo) {
    delete req.body.InvoiceNo;
  }
  return Invoice.find().where('InvoiceNo').equals(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Invoice from the DB
export function destroy(req, res) {
  return Invoice.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
