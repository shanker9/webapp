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

var DateTimeMsg_pb = require('./DateTimeMsg_pb.js');
goog.exportSymbol('proto.qspace.ProductData', null, global);
goog.exportSymbol('proto.qspace.SwapLegData', null, global);

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
proto.qspace.SwapLegData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.qspace.SwapLegData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.qspace.SwapLegData.displayName = 'proto.qspace.SwapLegData';
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
proto.qspace.SwapLegData.prototype.toObject = function(opt_includeInstance) {
  return proto.qspace.SwapLegData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.qspace.SwapLegData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.SwapLegData.toObject = function(includeInstance, msg) {
  var f, obj = {
    index: jspb.Message.getFieldWithDefault(msg, 1, ""),
    discountCurve: jspb.Message.getFieldWithDefault(msg, 2, ""),
    currency: jspb.Message.getFieldWithDefault(msg, 3, ""),
    notional: +jspb.Message.getFieldWithDefault(msg, 4, 0.0),
    fixedRate: +jspb.Message.getFieldWithDefault(msg, 5, 0.0),
    spread: +jspb.Message.getFieldWithDefault(msg, 6, 0.0)
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
 * @return {!proto.qspace.SwapLegData}
 */
proto.qspace.SwapLegData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.qspace.SwapLegData;
  return proto.qspace.SwapLegData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.qspace.SwapLegData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.qspace.SwapLegData}
 */
proto.qspace.SwapLegData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setIndex(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDiscountCurve(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setCurrency(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setNotional(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setFixedRate(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setSpread(value);
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
proto.qspace.SwapLegData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.qspace.SwapLegData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.qspace.SwapLegData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.SwapLegData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIndex();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDiscountCurve();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCurrency();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getNotional();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getFixedRate();
  if (f !== 0.0) {
    writer.writeDouble(
      5,
      f
    );
  }
  f = message.getSpread();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
};


/**
 * optional string index = 1;
 * @return {string}
 */
proto.qspace.SwapLegData.prototype.getIndex = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.qspace.SwapLegData.prototype.setIndex = function(value) {
  jspb.Message.setField(this, 1, value);
};


/**
 * optional string discount_curve = 2;
 * @return {string}
 */
proto.qspace.SwapLegData.prototype.getDiscountCurve = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.qspace.SwapLegData.prototype.setDiscountCurve = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string currency = 3;
 * @return {string}
 */
proto.qspace.SwapLegData.prototype.getCurrency = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.qspace.SwapLegData.prototype.setCurrency = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional double notional = 4;
 * @return {number}
 */
proto.qspace.SwapLegData.prototype.getNotional = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 4, 0.0));
};


/** @param {number} value */
proto.qspace.SwapLegData.prototype.setNotional = function(value) {
  jspb.Message.setField(this, 4, value);
};


/**
 * optional double fixed_rate = 5;
 * @return {number}
 */
proto.qspace.SwapLegData.prototype.getFixedRate = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 5, 0.0));
};


/** @param {number} value */
proto.qspace.SwapLegData.prototype.setFixedRate = function(value) {
  jspb.Message.setField(this, 5, value);
};


/**
 * optional double spread = 6;
 * @return {number}
 */
proto.qspace.SwapLegData.prototype.getSpread = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 6, 0.0));
};


/** @param {number} value */
proto.qspace.SwapLegData.prototype.setSpread = function(value) {
  jspb.Message.setField(this, 6, value);
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
proto.qspace.ProductData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, 500, null, null);
};
goog.inherits(proto.qspace.ProductData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.qspace.ProductData.displayName = 'proto.qspace.ProductData';
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
proto.qspace.ProductData.prototype.toObject = function(opt_includeInstance) {
  return proto.qspace.ProductData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.qspace.ProductData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.ProductData.toObject = function(includeInstance, msg) {
  var f, obj = {
    maturityDate: (f = msg.getMaturityDate()) && DateTimeMsg_pb.DateTimeMsg.toObject(includeInstance, f),
    underlier: jspb.Message.getFieldWithDefault(msg, 2, ""),
    counterparty: jspb.Message.getFieldWithDefault(msg, 3, ""),
    putOrCall: jspb.Message.getFieldWithDefault(msg, 11, ""),
    amerOrEuro: jspb.Message.getFieldWithDefault(msg, 12, ""),
    strike: +jspb.Message.getFieldWithDefault(msg, 13, 0.0),
    contractSize: +jspb.Message.getFieldWithDefault(msg, 14, 0.0),
    pay: (f = msg.getPay()) && proto.qspace.SwapLegData.toObject(includeInstance, f),
    receive: (f = msg.getReceive()) && proto.qspace.SwapLegData.toObject(includeInstance, f),
    error: jspb.Message.getFieldWithDefault(msg, 500, "")
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
 * @return {!proto.qspace.ProductData}
 */
proto.qspace.ProductData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.qspace.ProductData;
  return proto.qspace.ProductData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.qspace.ProductData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.qspace.ProductData}
 */
proto.qspace.ProductData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new DateTimeMsg_pb.DateTimeMsg;
      reader.readMessage(value,DateTimeMsg_pb.DateTimeMsg.deserializeBinaryFromReader);
      msg.setMaturityDate(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setUnderlier(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setCounterparty(value);
      break;
    case 11:
      var value = /** @type {string} */ (reader.readString());
      msg.setPutOrCall(value);
      break;
    case 12:
      var value = /** @type {string} */ (reader.readString());
      msg.setAmerOrEuro(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setStrike(value);
      break;
    case 14:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setContractSize(value);
      break;
    case 21:
      var value = new proto.qspace.SwapLegData;
      reader.readMessage(value,proto.qspace.SwapLegData.deserializeBinaryFromReader);
      msg.setPay(value);
      break;
    case 22:
      var value = new proto.qspace.SwapLegData;
      reader.readMessage(value,proto.qspace.SwapLegData.deserializeBinaryFromReader);
      msg.setReceive(value);
      break;
    case 500:
      var value = /** @type {string} */ (reader.readString());
      msg.setError(value);
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
proto.qspace.ProductData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.qspace.ProductData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.qspace.ProductData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.qspace.ProductData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMaturityDate();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      DateTimeMsg_pb.DateTimeMsg.serializeBinaryToWriter
    );
  }
  f = message.getUnderlier();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getCounterparty();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getPutOrCall();
  if (f.length > 0) {
    writer.writeString(
      11,
      f
    );
  }
  f = message.getAmerOrEuro();
  if (f.length > 0) {
    writer.writeString(
      12,
      f
    );
  }
  f = message.getStrike();
  if (f !== 0.0) {
    writer.writeDouble(
      13,
      f
    );
  }
  f = message.getContractSize();
  if (f !== 0.0) {
    writer.writeDouble(
      14,
      f
    );
  }
  f = message.getPay();
  if (f != null) {
    writer.writeMessage(
      21,
      f,
      proto.qspace.SwapLegData.serializeBinaryToWriter
    );
  }
  f = message.getReceive();
  if (f != null) {
    writer.writeMessage(
      22,
      f,
      proto.qspace.SwapLegData.serializeBinaryToWriter
    );
  }
  f = message.getError();
  if (f.length > 0) {
    writer.writeString(
      500,
      f
    );
  }
};


/**
 * optional DateTimeMsg maturity_date = 1;
 * @return {?proto.qspace.DateTimeMsg}
 */
proto.qspace.ProductData.prototype.getMaturityDate = function() {
  return /** @type{?proto.qspace.DateTimeMsg} */ (
    jspb.Message.getWrapperField(this, DateTimeMsg_pb.DateTimeMsg, 1));
};


/** @param {?proto.qspace.DateTimeMsg|undefined} value */
proto.qspace.ProductData.prototype.setMaturityDate = function(value) {
  jspb.Message.setWrapperField(this, 1, value);
};


proto.qspace.ProductData.prototype.clearMaturityDate = function() {
  this.setMaturityDate(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.ProductData.prototype.hasMaturityDate = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string underlier = 2;
 * @return {string}
 */
proto.qspace.ProductData.prototype.getUnderlier = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.qspace.ProductData.prototype.setUnderlier = function(value) {
  jspb.Message.setField(this, 2, value);
};


/**
 * optional string counterparty = 3;
 * @return {string}
 */
proto.qspace.ProductData.prototype.getCounterparty = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/** @param {string} value */
proto.qspace.ProductData.prototype.setCounterparty = function(value) {
  jspb.Message.setField(this, 3, value);
};


/**
 * optional string put_or_call = 11;
 * @return {string}
 */
proto.qspace.ProductData.prototype.getPutOrCall = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/** @param {string} value */
proto.qspace.ProductData.prototype.setPutOrCall = function(value) {
  jspb.Message.setField(this, 11, value);
};


/**
 * optional string amer_or_euro = 12;
 * @return {string}
 */
proto.qspace.ProductData.prototype.getAmerOrEuro = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/** @param {string} value */
proto.qspace.ProductData.prototype.setAmerOrEuro = function(value) {
  jspb.Message.setField(this, 12, value);
};


/**
 * optional double strike = 13;
 * @return {number}
 */
proto.qspace.ProductData.prototype.getStrike = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 13, 0.0));
};


/** @param {number} value */
proto.qspace.ProductData.prototype.setStrike = function(value) {
  jspb.Message.setField(this, 13, value);
};


/**
 * optional double contract_size = 14;
 * @return {number}
 */
proto.qspace.ProductData.prototype.getContractSize = function() {
  return /** @type {number} */ (+jspb.Message.getFieldWithDefault(this, 14, 0.0));
};


/** @param {number} value */
proto.qspace.ProductData.prototype.setContractSize = function(value) {
  jspb.Message.setField(this, 14, value);
};


/**
 * optional SwapLegData pay = 21;
 * @return {?proto.qspace.SwapLegData}
 */
proto.qspace.ProductData.prototype.getPay = function() {
  return /** @type{?proto.qspace.SwapLegData} */ (
    jspb.Message.getWrapperField(this, proto.qspace.SwapLegData, 21));
};


/** @param {?proto.qspace.SwapLegData|undefined} value */
proto.qspace.ProductData.prototype.setPay = function(value) {
  jspb.Message.setWrapperField(this, 21, value);
};


proto.qspace.ProductData.prototype.clearPay = function() {
  this.setPay(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.ProductData.prototype.hasPay = function() {
  return jspb.Message.getField(this, 21) != null;
};


/**
 * optional SwapLegData receive = 22;
 * @return {?proto.qspace.SwapLegData}
 */
proto.qspace.ProductData.prototype.getReceive = function() {
  return /** @type{?proto.qspace.SwapLegData} */ (
    jspb.Message.getWrapperField(this, proto.qspace.SwapLegData, 22));
};


/** @param {?proto.qspace.SwapLegData|undefined} value */
proto.qspace.ProductData.prototype.setReceive = function(value) {
  jspb.Message.setWrapperField(this, 22, value);
};


proto.qspace.ProductData.prototype.clearReceive = function() {
  this.setReceive(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.qspace.ProductData.prototype.hasReceive = function() {
  return jspb.Message.getField(this, 22) != null;
};


/**
 * optional string error = 500;
 * @return {string}
 */
proto.qspace.ProductData.prototype.getError = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 500, ""));
};


/** @param {string} value */
proto.qspace.ProductData.prototype.setError = function(value) {
  jspb.Message.setField(this, 500, value);
};


goog.object.extend(exports, proto.qspace);
