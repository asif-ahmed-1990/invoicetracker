/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Invoice from '../api/invoice/invoice.model';
import User from '../api/user/user.model';



User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Asif Ahmed',
      employeeId: 561119,
      email: 'asif.ahmed2@cognizant.com',
      password: 'asif'
    },
    {
      provider: 'local',
      name: 'Nishantth',
      employeeId: 561119,
      email: 'nishantth.kumar@cognizant.com',
      password: 'admin'
    }
    )
    .then(() => {
      console.log('finished populating users');
    });
  });
Invoice.remove({},function(){console.log("Successfully removed all invoices")});