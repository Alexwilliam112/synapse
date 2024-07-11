// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proto_processMining_pb = require('../proto/processMining_pb.js');

function serialize_example_jsonSchema(arg) {
  if (!(arg instanceof proto_processMining_pb.jsonSchema)) {
    throw new Error('Expected argument of type example.jsonSchema');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_example_jsonSchema(buffer_arg) {
  return proto_processMining_pb.jsonSchema.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_example_xesData(arg) {
  if (!(arg instanceof proto_processMining_pb.xesData)) {
    throw new Error('Expected argument of type example.xesData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_example_xesData(buffer_arg) {
  return proto_processMining_pb.xesData.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProcessMiningService = exports.ProcessMiningService = {
  getProcessModel: {
    path: '/example.ProcessMining/GetProcessModel',
    requestStream: false,
    responseStream: false,
    requestType: proto_processMining_pb.xesData,
    responseType: proto_processMining_pb.jsonSchema,
    requestSerialize: serialize_example_xesData,
    requestDeserialize: deserialize_example_xesData,
    responseSerialize: serialize_example_jsonSchema,
    responseDeserialize: deserialize_example_jsonSchema,
  },
};

exports.ProcessMiningClient = grpc.makeGenericClientConstructor(ProcessMiningService);
