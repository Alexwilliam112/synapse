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

goog.provide('proto.ProcessMining.JsonModel');

goog.require('jspb.BinaryReader');
goog.require('jspb.BinaryWriter');
goog.require('jspb.Message');
goog.require('proto.ProcessMining.Arc');
goog.require('proto.ProcessMining.Place');
goog.require('proto.ProcessMining.Transition');

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
proto.ProcessMining.JsonModel = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.ProcessMining.JsonModel.repeatedFields_, null);
};
goog.inherits(proto.ProcessMining.JsonModel, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.ProcessMining.JsonModel.displayName = 'proto.ProcessMining.JsonModel';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.ProcessMining.JsonModel.repeatedFields_ = [1,2,3];



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
proto.ProcessMining.JsonModel.prototype.toObject = function(opt_includeInstance) {
  return proto.ProcessMining.JsonModel.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.ProcessMining.JsonModel} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProcessMining.JsonModel.toObject = function(includeInstance, msg) {
  var f, obj = {
    placesList: jspb.Message.toObjectList(msg.getPlacesList(),
    proto.ProcessMining.Place.toObject, includeInstance),
    transitionsList: jspb.Message.toObjectList(msg.getTransitionsList(),
    proto.ProcessMining.Transition.toObject, includeInstance),
    arcsList: jspb.Message.toObjectList(msg.getArcsList(),
    proto.ProcessMining.Arc.toObject, includeInstance)
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
 * @return {!proto.ProcessMining.JsonModel}
 */
proto.ProcessMining.JsonModel.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.ProcessMining.JsonModel;
  return proto.ProcessMining.JsonModel.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.ProcessMining.JsonModel} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.ProcessMining.JsonModel}
 */
proto.ProcessMining.JsonModel.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.ProcessMining.Place;
      reader.readMessage(value,proto.ProcessMining.Place.deserializeBinaryFromReader);
      msg.addPlaces(value);
      break;
    case 2:
      var value = new proto.ProcessMining.Transition;
      reader.readMessage(value,proto.ProcessMining.Transition.deserializeBinaryFromReader);
      msg.addTransitions(value);
      break;
    case 3:
      var value = new proto.ProcessMining.Arc;
      reader.readMessage(value,proto.ProcessMining.Arc.deserializeBinaryFromReader);
      msg.addArcs(value);
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
proto.ProcessMining.JsonModel.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.ProcessMining.JsonModel.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.ProcessMining.JsonModel} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.ProcessMining.JsonModel.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getPlacesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.ProcessMining.Place.serializeBinaryToWriter
    );
  }
  f = message.getTransitionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.ProcessMining.Transition.serializeBinaryToWriter
    );
  }
  f = message.getArcsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.ProcessMining.Arc.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Place places = 1;
 * @return {!Array<!proto.ProcessMining.Place>}
 */
proto.ProcessMining.JsonModel.prototype.getPlacesList = function() {
  return /** @type{!Array<!proto.ProcessMining.Place>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProcessMining.Place, 1));
};


/**
 * @param {!Array<!proto.ProcessMining.Place>} value
 * @return {!proto.ProcessMining.JsonModel} returns this
*/
proto.ProcessMining.JsonModel.prototype.setPlacesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.ProcessMining.Place=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProcessMining.Place}
 */
proto.ProcessMining.JsonModel.prototype.addPlaces = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.ProcessMining.Place, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProcessMining.JsonModel} returns this
 */
proto.ProcessMining.JsonModel.prototype.clearPlacesList = function() {
  return this.setPlacesList([]);
};


/**
 * repeated Transition transitions = 2;
 * @return {!Array<!proto.ProcessMining.Transition>}
 */
proto.ProcessMining.JsonModel.prototype.getTransitionsList = function() {
  return /** @type{!Array<!proto.ProcessMining.Transition>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProcessMining.Transition, 2));
};


/**
 * @param {!Array<!proto.ProcessMining.Transition>} value
 * @return {!proto.ProcessMining.JsonModel} returns this
*/
proto.ProcessMining.JsonModel.prototype.setTransitionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.ProcessMining.Transition=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProcessMining.Transition}
 */
proto.ProcessMining.JsonModel.prototype.addTransitions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.ProcessMining.Transition, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProcessMining.JsonModel} returns this
 */
proto.ProcessMining.JsonModel.prototype.clearTransitionsList = function() {
  return this.setTransitionsList([]);
};


/**
 * repeated Arc arcs = 3;
 * @return {!Array<!proto.ProcessMining.Arc>}
 */
proto.ProcessMining.JsonModel.prototype.getArcsList = function() {
  return /** @type{!Array<!proto.ProcessMining.Arc>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.ProcessMining.Arc, 3));
};


/**
 * @param {!Array<!proto.ProcessMining.Arc>} value
 * @return {!proto.ProcessMining.JsonModel} returns this
*/
proto.ProcessMining.JsonModel.prototype.setArcsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.ProcessMining.Arc=} opt_value
 * @param {number=} opt_index
 * @return {!proto.ProcessMining.Arc}
 */
proto.ProcessMining.JsonModel.prototype.addArcs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.ProcessMining.Arc, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.ProcessMining.JsonModel} returns this
 */
proto.ProcessMining.JsonModel.prototype.clearArcsList = function() {
  return this.setArcsList([]);
};


