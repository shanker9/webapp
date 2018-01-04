/* eslint-disable */

/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var DayCount_pb = require('./DayCount_pb.js');
var Frequency_pb = require('./Frequency_pb.js');
var BusinessDayConvention_pb = require('./BusinessDayConvention_pb.js');
var StubConvention_pb = require('./StubConvention_pb.js');
var RollConvention_pb = require('./RollConvention_pb.js');
var FloatRate_pb = require('./FloatRate_pb.js');
var DateTimeMsg_pb = require('./DateTimeMsg_pb.js');
goog.exportSymbol('proto.qspace.SwapDefinitionMsg', null, global);
goog.exportSymbol('proto.qspace.SwapDefinitionMsg.Leg', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.qspace.SwapDefinitionMsg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.qspace.SwapDefinitionMsg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.qspace.SwapDefinitionMsg.displayName = 'proto.qspace.SwapDefinitionMsg';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.qspace.SwapDefinitionMsg.prototype.toObject = function(opt_includeInstance) {
  return proto.qspace.SwapDefinitionMsg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.qspace.SwapDefinitionMsg} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.SwapDefinitionMsg.toObject = function(includeInstance, msg) {
  var f, obj = {
    start: (f = msg.getStart()) && DateTimeMsg_pb.DateTimeMsg.toObject(includeInstance, f),
    end: (f = msg.getEnd()) && DateTimeMsg_pb.DateTimeMsg.toObject(includeInstance, f),
    pay: (f = msg.getPay()) && proto.qspace.SwapDefinitionMsg.Leg.toObject(includeInstance, f),
    receive: (f = msg.getReceive()) && proto.qspace.SwapDefinitionMsg.Leg.toObject(includeInstance, f),
    currency: jspb.Message.getFieldWithDefault(msg, 5, ""),
    counterparty: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.qspace.SwapDefinitionMsg}
 */
proto.qspace.SwapDefinitionMsg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.qspace.SwapDefinitionMsg;
  return proto.qspace.SwapDefinitionMsg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.qspace.SwapDefinitionMsg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.qspace.SwapDefinitionMsg}
 */
proto.qspace.SwapDefinitionMsg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new DateTimeMsg_pb.DateTimeMsg;
      reader.readMessage(value,DateTimeMsg_pb.DateTimeMsg.deserializeBinaryFromReader);
      msg.setStart(value);
      break;
    case 2:
      var value = new DateTimeMsg_pb.DateTimeMsg;
      reader.readMessage(value,DateTimeMsg_pb.DateTimeMsg.deserializeBinaryFromReader);
      msg.setEnd(value);
      break;
    case 3:
      var value = new proto.qspace.SwapDefinitionMsg.Leg;
      reader.readMessage(value,proto.qspace.SwapDefinitionMsg.Leg.deserializeBinaryFromReader);
      msg.setPay(value);
      break;
    case 4:
      var value = new proto.qspace.SwapDefinitionMsg.Leg;
      reader.readMessage(value,proto.qspace.SwapDefinitionMsg.Leg.deserializeBinaryFromReader);
      msg.setReceive(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrency(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setCounterparty(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.qspace.SwapDefinitionMsg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.qspace.SwapDefinitionMsg.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.qspace.SwapDefinitionMsg} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.SwapDefinitionMsg.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStart();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      DateTimeMsg_pb.DateTimeMsg.serializeBinaryToWriter
    );
  }
  f = message.getEnd();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      DateTimeMsg_pb.DateTimeMsg.serializeBinaryToWriter
    );
  }
  f = message.getPay();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.qspace.SwapDefinitionMsg.Leg.serializeBinaryToWriter
    );
  }
  f = message.getReceive();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.qspace.SwapDefinitionMsg.Leg.serializeBinaryToWriter
    );
  }
  f = message.getCurrency();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getCounterparty();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.qspace.SwapDefinitionMsg.Leg = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.qspace.SwapDefinitionMsg.Leg.oneofGroups_);
};
goog.inherits(proto.qspace.SwapDefinitionMsg.Leg, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.qspace.SwapDefinitionMsg.Leg.displayName = 'proto.qspace.SwapDefinitionMsg.Leg';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.qspace.SwapDefinitionMsg.Leg.oneofGroups_ = [[2,3]];

/**
 * @enum {number}
 */
proto.qspace.SwapDefinitionMsg.Leg.RateCase = {
  RATE_NOT_SET: 0,
  FLOAT_RATE: 2,
  FIXED_RATE: 3
};

/**
 * @return {proto.qspace.SwapDefinitionMsg.Leg.RateCase}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getRateCase = function() {
  return /** @type {proto.qspace.SwapDefinitionMsg.Leg.RateCase} */(jspb.Message.computeOneofCase(this, proto.qspace.SwapDefinitionMsg.Leg.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.toObject = function(opt_includeInstance) {
  return proto.qspace.SwapDefinitionMsg.Leg.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.qspace.SwapDefinitionMsg.Leg} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.SwapDefinitionMsg.Leg.toObject = function(includeInstance, msg) {
  var f, obj = {
    notional: +jspb.Message.getFieldWithDefault(msg, 1, 0.0),
    floatRate: (f = msg.getFloatRate()) && FloatRate_pb.FloatRate.toObject(includeInstance, f),
    fixedRate: +jspb.Message.getFieldWithDefault(msg, 3, 0.0),
    frequency: (f = msg.getFrequency()) && Frequency_pb.Frequency.toObject(includeInstance, f),
    holidayCalendar: jspb.Message.getFieldWithDefault(msg, 5, ""),
    discountCurve: jspb.Message.getFieldWithDefault(msg, 6, ""),
    currency: jspb.Message.getFieldWithDefault(msg, 7, ""),
    dayCount: jspb.Message.getFieldWithDefault(msg, 8, 0),
    stubConv: jspb.Message.getFieldWithDefault(msg, 9, 0),
    bdayConv: jspb.Message.getFieldWithDefault(msg, 10, 0),
    rollConv: jspb.Message.getFieldWithDefault(msg, 11, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.qspace.SwapDefinitionMsg.Leg}
 */
proto.qspace.SwapDefinitionMsg.Leg.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.qspace.SwapDefinitionMsg.Leg;
  return proto.qspace.SwapDefinitionMsg.Leg.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.qspace.SwapDefinitionMsg.Leg} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.qspace.SwapDefinitionMsg.Leg}
 */
proto.qspace.SwapDefinitionMsg.Leg.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setNotional(value);
      break;
    case 2:
      var value = new FloatRate_pb.FloatRate;
      reader.readMessage(value,FloatRate_pb.FloatRate.deserializeBinaryFromReader);
      msg.setFloatRate(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFixedRate(value);
      break;
    case 4:
      var value = new Frequency_pb.Frequency;
      reader.readMessage(value,Frequency_pb.Frequency.deserializeBinaryFromReader);
      msg.setFrequency(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setHolidayCalendar(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDiscountCurve(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrency(value);
      break;
    case 8:
      var value = /** @type {!proto.qspace.DayCount} */ (reader.readEnum());
      msg.setDayCount(value);
      break;
    case 9:
      var value = /** @type {!proto.qspace.StubConvention} */ (reader.readEnum());
      msg.setStubConv(value);
      break;
    case 10:
      var value = /** @type {!proto.qspace.BusinessDayConvention} */ (reader.readEnum());
      msg.setBdayConv(value);
      break;
    case 11:
      var value = /** @type {!proto.qspace.RollConvention} */ (reader.readEnum());
      msg.setRollConv(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.qspace.SwapDefinitionMsg.Leg.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.qspace.SwapDefinitionMsg.Leg} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.SwapDefinitionMsg.Leg.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNotional();
  if (f !== 0.0) {
    writer.writeDouble(
      1,
      f
    );
  }
  f = message.getFloatRate();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      FloatRate_pb.FloatRate.serializeBinaryToWriter
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 3));
  if (f != null) {
    writer.writeDouble(
      3,
      f
    );
  }
  f = message.getFrequency();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      Frequency_pb.Frequency.serializeBinaryToWriter
    );
  }
  f = message.getHolidayCalendar();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getDiscountCurve();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getCurrency();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
  f = message.getDayCount();
  if (f !== 0.0) {
    writer.writeEnum(
      8,
      f
    );
  }
  f = message.getStubConv();
  if (f !== 0.0) {
    writer.writeEnum(
      9,
      f
    );
  }
  f = message.getBdayConv();
  if (f !== 0.0) {
    writer.writeEnum(
      10,
      f
    );
  }
  f = message.getRollConv();
  if (f !== 0.0) {
    writer.writeEnum(
      11,
      f
    );
  }
};


/**
 * optional double notional = 1;
 * @return {number}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getNotional = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 1, 0.0));
};


/** @param {number} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setNotional = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional FloatRate float_rate = 2;
 * @return {?proto.qspace.FloatRate}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getFloatRate = function() {
  return /** @type{?proto.qspace.FloatRate} */ (
    jspb.Message.getWrapperField(this, FloatRate_pb.FloatRate, 2));
};


/** @param {?proto.qspace.FloatRate|undefined} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setFloatRate = function(value) {
  jspb.Message.setOneofWrapperField(this, 2, proto.qspace.SwapDefinitionMsg.Leg.oneofGroups_[0], value);
};


proto.qspace.SwapDefinitionMsg.Leg.prototype.clearFloatRate = function() {
  this.setFloatRate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.hasFloatRate = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional double fixed_rate = 3;
 * @return {number}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getFixedRate = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 3, 0.0));
};


/** @param {number} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setFixedRate = function(value) {
  jspb.Message.setOneofField(this, 3, proto.qspace.SwapDefinitionMsg.Leg.oneofGroups_[0], value);
};


proto.qspace.SwapDefinitionMsg.Leg.prototype.clearFixedRate = function() {
  jspb.Message.setOneofField(this, 3, proto.qspace.SwapDefinitionMsg.Leg.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.hasFixedRate = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Frequency frequency = 4;
 * @return {?proto.qspace.Frequency}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getFrequency = function() {
  return /** @type{?proto.qspace.Frequency} */ (
    jspb.Message.getWrapperField(this, Frequency_pb.Frequency, 4));
};


/** @param {?proto.qspace.Frequency|undefined} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setFrequency = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.qspace.SwapDefinitionMsg.Leg.prototype.clearFrequency = function() {
  this.setFrequency(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.hasFrequency = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string holiday_calendar = 5;
 * @return {string}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getHolidayCalendar = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setHolidayCalendar = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string discount_curve = 6;
 * @return {string}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getDiscountCurve = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setDiscountCurve = function(value) {
  jspb.Message.setField(this, 6, value);
};


/**
 * optional string currency = 7;
 * @return {string}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/** @param {string} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setCurrency = function(value) {
  jspb.Message.setField(this, 7, value);
};


/**
 * optional DayCount day_count = 8;
 * @return {!proto.qspace.DayCount}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getDayCount = function() {
  return /** @type {!proto.qspace.DayCount} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/** @param {!proto.qspace.DayCount} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setDayCount = function(value) {
  jspb.Message.setField(this, 8, value);
};


/**
 * optional StubConvention stub_conv = 9;
 * @return {!proto.qspace.StubConvention}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getStubConv = function() {
  return /** @type {!proto.qspace.StubConvention} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/** @param {!proto.qspace.StubConvention} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setStubConv = function(value) {
  jspb.Message.setField(this, 9, value);
};


/**
 * optional BusinessDayConvention bday_conv = 10;
 * @return {!proto.qspace.BusinessDayConvention}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getBdayConv = function() {
  return /** @type {!proto.qspace.BusinessDayConvention} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/** @param {!proto.qspace.BusinessDayConvention} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setBdayConv = function(value) {
  jspb.Message.setField(this, 10, value);
};


/**
 * optional RollConvention roll_conv = 11;
 * @return {!proto.qspace.RollConvention}
 */
proto.qspace.SwapDefinitionMsg.Leg.prototype.getRollConv = function() {
  return /** @type {!proto.qspace.RollConvention} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/** @param {!proto.qspace.RollConvention} value */
proto.qspace.SwapDefinitionMsg.Leg.prototype.setRollConv = function(value) {
  jspb.Message.setField(this, 11, value);
};


/**
 * optional DateTimeMsg start = 1;
 * @return {?proto.qspace.DateTimeMsg}
 */
proto.qspace.SwapDefinitionMsg.prototype.getStart = function() {
  return /** @type{?proto.qspace.DateTimeMsg} */ (
    jspb.Message.getWrapperField(this, DateTimeMsg_pb.DateTimeMsg, 1));
};


/** @param {?proto.qspace.DateTimeMsg|undefined} value */
proto.qspace.SwapDefinitionMsg.prototype.setStart = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.qspace.SwapDefinitionMsg.prototype.clearStart = function() {
  this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.SwapDefinitionMsg.prototype.hasStart = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional DateTimeMsg end = 2;
 * @return {?proto.qspace.DateTimeMsg}
 */
proto.qspace.SwapDefinitionMsg.prototype.getEnd = function() {
  return /** @type{?proto.qspace.DateTimeMsg} */ (
    jspb.Message.getWrapperField(this, DateTimeMsg_pb.DateTimeMsg, 2));
};


/** @param {?proto.qspace.DateTimeMsg|undefined} value */
proto.qspace.SwapDefinitionMsg.prototype.setEnd = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.qspace.SwapDefinitionMsg.prototype.clearEnd = function() {
  this.setEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.SwapDefinitionMsg.prototype.hasEnd = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Leg pay = 3;
 * @return {?proto.qspace.SwapDefinitionMsg.Leg}
 */
proto.qspace.SwapDefinitionMsg.prototype.getPay = function() {
  return /** @type{?proto.qspace.SwapDefinitionMsg.Leg} */ (
    jspb.Message.getWrapperField(this, proto.qspace.SwapDefinitionMsg.Leg, 3));
};


/** @param {?proto.qspace.SwapDefinitionMsg.Leg|undefined} value */
proto.qspace.SwapDefinitionMsg.prototype.setPay = function(value) {
  jspb.Message.setWrapperField(this, 3, value);
};


proto.qspace.SwapDefinitionMsg.prototype.clearPay = function() {
  this.setPay(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.SwapDefinitionMsg.prototype.hasPay = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional Leg receive = 4;
 * @return {?proto.qspace.SwapDefinitionMsg.Leg}
 */
proto.qspace.SwapDefinitionMsg.prototype.getReceive = function() {
  return /** @type{?proto.qspace.SwapDefinitionMsg.Leg} */ (
    jspb.Message.getWrapperField(this, proto.qspace.SwapDefinitionMsg.Leg, 4));
};


/** @param {?proto.qspace.SwapDefinitionMsg.Leg|undefined} value */
proto.qspace.SwapDefinitionMsg.prototype.setReceive = function(value) {
  jspb.Message.setWrapperField(this, 4, value);
};


proto.qspace.SwapDefinitionMsg.prototype.clearReceive = function() {
  this.setReceive(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.SwapDefinitionMsg.prototype.hasReceive = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional string currency = 5;
 * @return {string}
 */
proto.qspace.SwapDefinitionMsg.prototype.getCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/** @param {string} value */
proto.qspace.SwapDefinitionMsg.prototype.setCurrency = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional string counterparty = 6;
 * @return {string}
 */
proto.qspace.SwapDefinitionMsg.prototype.getCounterparty = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/** @param {string} value */
proto.qspace.SwapDefinitionMsg.prototype.setCounterparty = function(value) {
  jspb.Message.setField(this, 6, value);
};


goog.object.extend(exports, proto.qspace);