'use strict';

import mongoose from 'mongoose';

var Remarks = new mongoose.Schema({
	"date" : Date,
	"remark" : String
});

var Comments = new mongoose.Schema({
    name     : String
  , comment  : String
  , date      : Date
});

var InvoiceSchema = new mongoose.Schema({
  		"InvoiceNo": {type:String, unique:true},
        "InvoiceDate": Date,
        "InvoiceOwner":String,
        "DueDate": Date,
        "InvoiceDescription":String,
        "TransactionType": String,
        "Currency": String,
        "AmountDueExclVAT": Number,
        "AmountDueInclVAT": Number,
        "USDEquivalent": Number,
        "ProjectID": Number,
        "ProjectDescription": String,
        "Portfolio": String,
        "MonthEnd": Date,
        "PO": [Number],
        "SOWCCN": [String],
        "BillabilityType": String,
        "Status": String,
        "Pending": String,
        "COGOwner": String,
        "COGOwnerID" : Number,
        "Remarks": [Comments],
        "Submitted": Boolean,
        "LFU": String,
        "CustomerContactName" : String,
        "Closed" : Boolean
});

export default mongoose.model('Invoice', InvoiceSchema);
