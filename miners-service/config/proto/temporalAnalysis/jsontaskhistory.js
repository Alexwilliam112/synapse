// source: temporalAnalysis.proto
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

goog.provide('proto.TemporalAnalysis.JsonTaskHistory');

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
proto.TemporalAnalysis.JsonTaskHistory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.TemporalAnalysis.JsonTaskHistory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.TemporalAnalysis.JsonTaskHistory.displayName = 'proto.TemporalAnalysis.JsonTaskHistory';
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
proto.TemporalAnalysis.JsonTaskHistory.prototype.toObject = function(opt_includeInstance) {
  return proto.TemporalAnalysis.JsonTaskHistory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.TemporalAnalysis.JsonTaskHistory} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TemporalAnalysis.JsonTaskHistory.toObject = function(includeInstance, msg) {
  var f, obj = {
    processname: jspb.Message.getFieldWithDefault(msg, 1, ""),
    caseid: jspb.Message.getFieldWithDefault(msg, 2, ""),
    timestamp: jspb.Message.getFieldWithDefault(msg, 3, ""),
    eventname: jspb.Message.getFieldWithDefault(msg, 4, ""),
    name: jspb.Message.getFieldWithDefault(msg, 5, ""),
    department: jspb.Message.getFieldWithDefault(msg, 6, ""),
    companyid: jspb.Message.getFieldWithDefault(msg, 7, 0),
    time: jspb.Message.getFloatingPointFieldWithDefault(msg, 8, 0.0)
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
 * @return {!proto.TemporalAnalysis.JsonTaskHistory}
 */
proto.TemporalAnalysis.JsonTaskHistory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.TemporalAnalysis.JsonTaskHistory;
  return proto.TemporalAnalysis.JsonTaskHistory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.TemporalAnalysis.JsonTaskHistory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.TemporalAnalysis.JsonTaskHistory}
 */
proto.TemporalAnalysis.JsonTaskHistory.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = /** @type {number} */ (reader.readInt32());
      msg.setCompanyid(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setTime(value);
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
proto.TemporalAnalysis.JsonTaskHistory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.TemporalAnalysis.JsonTaskHistory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.TemporalAnalysis.JsonTaskHistory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TemporalAnalysis.JsonTaskHistory.serializeBinaryToWriter = function(message, writer) {
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
  f = message.getCompanyid();
  if (f !== 0) {
    writer.writeInt32(
      7,
      f
    );
  }
  f = message.getTime();
  if (f !== 0.0) {
    writer.writeFloat(
      8,
      f
    );
  }
};


/**
 * optional string processName = 1;
 * @return {string}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getProcessname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setProcessname = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string caseId = 2;
 * @return {string}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getCaseid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setCaseid = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string timestamp = 3;
 * @return {string}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getTimestamp = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string eventName = 4;
 * @return {string}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getEventname = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setEventname = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string name = 5;
 * @return {string}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string department = 6;
 * @return {string}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getDepartment = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setDepartment = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional int32 CompanyId = 7;
 * @return {number}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getCompanyid = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setCompanyid = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional float time = 8;
 * @return {number}
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.getTime = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 8, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.TemporalAnalysis.JsonTaskHistory} returns this
 */
proto.TemporalAnalysis.JsonTaskHistory.prototype.setTime = function(value) {
  return jspb.Message.setProto3FloatField(this, 8, value);
};


