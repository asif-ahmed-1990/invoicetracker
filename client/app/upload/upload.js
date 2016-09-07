'use strict';

angular.module('invoiceTrackerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upload', {
        url: '/upload',
        template: '<upload></upload>'
      });
  });


var X = XLSX;
var q = null;
var XW = {
	/* worker message */
	msg: 'xlsx',
	/* worker scripts */
	rABS: 'bower_components/js-xlsx/xlsxworker2.js',
	norABS: 'bower_components/js-xlsx/xlsxworker1.js',
	noxfer: 'bower_components/js-xlsx/xlsxworker.js'
};

var rABS = typeof FileReader !== "undefined" && typeof FileReader.prototype !== "undefined" && typeof FileReader.prototype.readAsBinaryString !== "undefined";

var use_worker = typeof Worker !== 'undefined';

var transferable = use_worker;

var wtf_mode = false;

function fixdata(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
	return o;
}

function ab2str(data) {
	var o = "", l = 0, w = 10240;
	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint16Array(data.slice(l*w,l*w+w)));
	o+=String.fromCharCode.apply(null, new Uint16Array(data.slice(l*w)));
	return o;
}

function s2ab(s) {
	var b = new ArrayBuffer(s.length*2), v = new Uint16Array(b);
	for (var i=0; i != s.length; ++i) v[i] = s.charCodeAt(i);
	return [v, b];
}


function xw_xfer(data, cb) {
	var deferred = q.defer();
	var worker = new Worker(rABS ? XW.rABS : XW.norABS);
	worker.onmessage = function(e) {
		switch(e.data.t) {
			case 'ready': break;
			case 'e': console.error(e.data.d); deferred.reject(new Array()); break;
			default: {
						var xx=ab2str(e.data).replace(/\n/g,"\\n").replace(/\r/g,"\\r"); 
						console.log("done"); 
						var result = cb(JSON.parse(xx));
						deferred.resolve(result);
						break;
					}
		}
	};
	if(rABS) {
		var val = s2ab(data);
		worker.postMessage(val[1], [val[1]]);
	} else {
		worker.postMessage(data, [data]);
	}
	return deferred.promise;
}



function to_json(workbook) {
	var result = {};
	var sheetnames = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var roa = X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
		if(roa.length > 0){
			result[sheetName] = roa;
			sheetnames.push(sheetName);
		}
	});
	var invoiceModelArray = [];
	result[sheetnames[0]].forEach(function(invoiceCopy){
			var invoiceRef = new Invoice();
			invoiceRef.deepCopy(invoiceCopy);
			invoiceModelArray.push(invoiceRef);
		});
	return invoiceModelArray;
}


function to_formulae(workbook) {
	var result = [];
	workbook.SheetNames.forEach(function(sheetName) {
		var formulae = X.utils.get_formulae(workbook.Sheets[sheetName]);
		if(formulae.length > 0){
			result.push("SHEET: " + sheetName);
			result.push("");
			result.push(formulae.join("\n"));
		}
	});
	return result.join("\n");
}

function process_files(files, $q){
	q = $q
	var deferred = q.defer();
	try{
		var f = files[0];
		{
			var reader = new FileReader();
			var name = f.name;
			reader.onload = function(e) {
				if(typeof console !== 'undefined') console.log("onload", new Date(), "processing the Arrear file");
				var data = e.target.result;
				xw_xfer(data, process_wb).then(
					function(result){
						deferred.resolve(result);
				});
			};
			reader.readAsBinaryString(f);
		}
	}
	catch(e){
		deferred.reject(new Array());
	}
	return deferred.promise;
}

function process_wb(wb) {
	//var output = "";
	
	//output = JSON.stringify(to_json(wb), 2, 2);



	return to_json(wb);
}


function Invoice(){
	this.InvoiceNo= "";
	this.InvoiceDate= null;
	this.DueDate= null;
	this.TransactionType= "";
	this.Currency= "";
	this.AmountDueExclVAT= 0;
	this.AmountDueInclVAT= 0;
	this.USDEquivalent= 0;
	this.ProjectID= 0;
	this.ProjectDescription= "";
	this.Portfolio= "";
	this.MonthEnd= null;
	this.PO= 0;
	this.SOWCCN= "";
	this.BillabilityType= "";
	this.Status= "";
	this.Pending= "";
	this.COGOwner= "";
	this.COGOwnerID = 0;
	this.Submitted= false;
	this.LFU= "";
	this.CustomerContactName = "";
}

Invoice.prototype.deepCopy = function(copyInvoice) {
	this.InvoiceNo = copyInvoice["Invoice #"];
	this.InvoiceDate = copyInvoice["Invoice Date"];
	this.DueDate = copyInvoice["Due Date"];
	// copyInvoice["Overdue Days"];
	// copyInvoice["Due in No. of days"];
	this.TransactionType = copyInvoice["Transaction Type"];
	this.Currency = copyInvoice["Currency"];
	this.AmountDueInclVAT = parseFloat(copyInvoice["Amount Due"].replace(',', '')).toFixed(2);
	this.USDEquivalent = parseFloat(copyInvoice["USD Equivalent"].replace(',', '')).toFixed(2);
	this.CustomerContactName = copyInvoice["Customer Contact"];
	this.PO = parseInt(copyInvoice["PO #"]);
	this.ProjectID = parseInt(copyInvoice["Project ID"]);
	this.ProjectDescription = copyInvoice["Project Description"];
	this.COGOwnerID = parseInt(copyInvoice["AM ID"]);
	this.COGOwner = copyInvoice["AM Name"];
}