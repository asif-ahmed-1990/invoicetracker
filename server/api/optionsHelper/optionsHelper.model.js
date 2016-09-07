'use strict';

import mongoose from 'mongoose';

var portfolios = new mongoose.Schema({
	name: String
});

var status = new mongoose.Schema({
	name: String
})

var OptionsHelperSchema = new mongoose.Schema({
  portfolios: [portfolios],
  status: [status]
});

export default mongoose.model('OptionsHelper', OptionsHelperSchema);
