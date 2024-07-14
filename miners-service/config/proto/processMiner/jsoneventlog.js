// source: processMining.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

goog.provide('proto.ProcessMining.JsonEventLog');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');

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
proto.ProcessMining.JsonEventLog = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.ProcessMining.JsonEventLog, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ProcessMining.JsonEventLog.displayName = 'proto.ProcessMining.JsonEventLog';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.ProcessMining.JsonEventLog.prototype.toObject = function(opt_includeInstance) {
  return proto.ProcessMining.JsonEventLog.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProcessMining.JsonEventLog} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProcessMining.JsonEventLog.toObject = function(includeInstance, msg) {
  var f, obj = {
    processname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    caseid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    timestamp: jspb.Message.getFieldWithDefault(msg, 3, ""),
    eventname: jspb.Message.getFieldWithDefault(msg, 4, ""),
    name: jspb.Message.getFieldWithDefault(msg, 5, ""),
    department: jspb.Message.getFieldWithDefault(msg, 6, ""),
    casereff: jspb.Message.getFieldWithDefault(msg, 7, "")
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
 * @return {!proto.ProcessMining.JsonEventLog}
 */
proto.ProcessMining.JsonEventLog.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProcessMining.JsonEventLog;
  return proto.ProcessMining.JsonEventLog.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProcessMining.JsonEventLog} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProcessMining.JsonEventLog}
 */
proto.ProcessMining.JsonEventLog.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setProcessname(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setCaseid(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTimestamp(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setEventname(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDepartment(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setCasereff(value);
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
proto.ProcessMining.JsonEventLog.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProcessMining.JsonEventLog.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProcessMining.JsonEventLog} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProcessMining.JsonEventLog.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getProcessname();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCaseid();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTimestamp();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getEventname();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getDepartment();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
  f = message.getCasereff();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};


/**
 * optional string processName = 1;
 * @return {string}
 */
proto.ProcessMining.JsonEventLog.prototype.getProcessname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProcessMining.JsonEventLog} returns this
 */
proto.ProcessMining.JsonEventLog.prototype.setProcessname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string caseId = 2;
 * @return {string}
 */
proto.ProcessMining.JsonEventLog.prototype.getCaseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProcessMining.JsonEventLog} returns this
 */
proto.ProcessMining.JsonEventLog.prototype.setCaseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string timestamp = 3;
 * @return {string}
 */
proto.ProcessMining.JsonEventLog.prototype.getTimestamp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProcessMining.JsonEventLog} returns this
 */
proto.ProcessMining.JsonEventLog.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string eventName = 4;
 * @return {string}
 */
proto.ProcessMining.JsonEventLog.prototype.getEventname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProcessMining.JsonEventLog} returns this
 */
proto.ProcessMining.JsonEventLog.prototype.setEventname = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string name = 5;
 * @return {string}
 */
proto.ProcessMining.JsonEventLog.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProcessMining.JsonEventLog} returns this
 */
proto.ProcessMining.JsonEventLog.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string department = 6;
 * @return {string}
 */
proto.ProcessMining.JsonEventLog.prototype.getDepartment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProcessMining.JsonEventLog} returns this
 */
proto.ProcessMining.JsonEventLog.prototype.setDepartment = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional string caseReff = 7;
 * @return {string}
 */
proto.ProcessMining.JsonEventLog.prototype.getCasereff = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.ProcessMining.JsonEventLog} returns this
 */
proto.ProcessMining.JsonEventLog.prototype.setCasereff = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};

