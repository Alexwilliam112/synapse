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

goog.provide('proto.TemporalAnalysis.TaskHistory');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.TemporalAnalysis.JsonTaskHistory');

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
proto.TemporalAnalysis.TaskHistory = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.TemporalAnalysis.TaskHistory.repeatedFields_, null);
};
goog.inherits(proto.TemporalAnalysis.TaskHistory, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.TemporalAnalysis.TaskHistory.displayName = 'proto.TemporalAnalysis.TaskHistory';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.TemporalAnalysis.TaskHistory.repeatedFields_ = [1];



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
proto.TemporalAnalysis.TaskHistory.prototype.toObject = function(opt_includeInstance) {
  return proto.TemporalAnalysis.TaskHistory.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.TemporalAnalysis.TaskHistory} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TemporalAnalysis.TaskHistory.toObject = function(includeInstance, msg) {
  var f, obj = {
    historyList: jspb.Message.toObjectList(msg.getHistoryList(),
    proto.TemporalAnalysis.JsonTaskHistory.toObject, includeInstance)
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
 * @return {!proto.TemporalAnalysis.TaskHistory}
 */
proto.TemporalAnalysis.TaskHistory.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.TemporalAnalysis.TaskHistory;
  return proto.TemporalAnalysis.TaskHistory.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.TemporalAnalysis.TaskHistory} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.TemporalAnalysis.TaskHistory}
 */
proto.TemporalAnalysis.TaskHistory.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.TemporalAnalysis.JsonTaskHistory;
      reader.readMessage(value,proto.TemporalAnalysis.JsonTaskHistory.deserializeBinaryFromReader);
      msg.addHistory(value);
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
proto.TemporalAnalysis.TaskHistory.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.TemporalAnalysis.TaskHistory.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.TemporalAnalysis.TaskHistory} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.TemporalAnalysis.TaskHistory.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHistoryList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.TemporalAnalysis.JsonTaskHistory.serializeBinaryToWriter
    );
  }
};


/**
 * repeated JsonTaskHistory history = 1;
 * @return {!Array<!proto.TemporalAnalysis.JsonTaskHistory>}
 */
proto.TemporalAnalysis.TaskHistory.prototype.getHistoryList = function() {
  return /** @type{!Array<!proto.TemporalAnalysis.JsonTaskHistory>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.TemporalAnalysis.JsonTaskHistory, 1));
};


/**
 * @param {!Array<!proto.TemporalAnalysis.JsonTaskHistory>} value
 * @return {!proto.TemporalAnalysis.TaskHistory} returns this
*/
proto.TemporalAnalysis.TaskHistory.prototype.setHistoryList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.TemporalAnalysis.JsonTaskHistory=} opt_value
 * @param {number=} opt_index
 * @return {!proto.TemporalAnalysis.JsonTaskHistory}
 */
proto.TemporalAnalysis.TaskHistory.prototype.addHistory = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.TemporalAnalysis.JsonTaskHistory, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.TemporalAnalysis.TaskHistory} returns this
 */
proto.TemporalAnalysis.TaskHistory.prototype.clearHistoryList = function() {
  return this.setHistoryList([]);
};

