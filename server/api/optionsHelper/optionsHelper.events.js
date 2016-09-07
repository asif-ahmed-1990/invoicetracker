/**
 * OptionsHelper model events
 */

'use strict';

import {EventEmitter} from 'events';
import OptionsHelper from './optionsHelper.model';
var OptionsHelperEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
OptionsHelperEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  OptionsHelper.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    OptionsHelperEvents.emit(event + ':' + doc._id, doc);
    OptionsHelperEvents.emit(event, doc);
  }
}

export default OptionsHelperEvents;
