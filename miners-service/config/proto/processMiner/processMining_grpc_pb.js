// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var processMining_pb = require('./processMining_pb.js');

function serialize_ProcessMining_JsonData(arg) {
  if (!(arg instanceof processMining_pb.JsonData)) {
    throw new Error('Expected argument of type ProcessMining.JsonData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ProcessMining_JsonData(buffer_arg) {
  return processMining_pb.JsonData.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ProcessMining_JsonModelList(arg) {
  if (!(arg instanceof processMining_pb.JsonModelList)) {
    throw new Error('Expected argument of type ProcessMining.JsonModelList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ProcessMining_JsonModelList(buffer_arg) {
  return processMining_pb.JsonModelList.deserializeBinary(new Uint8Array(buffer_arg));
}


var AlphaMinerService = exports.AlphaMinerService = {
  getProcessModel: {
    path: '/ProcessMining.AlphaMiner/GetProcessModel',
    requestStream: false,
    responseStream: false,
    requestType: processMining_pb.JsonData,
    responseType: processMining_pb.JsonModelList,
    requestSerialize: serialize_ProcessMining_JsonData,
    requestDeserialize: deserialize_ProcessMining_JsonData,
    responseSerialize: serialize_ProcessMining_JsonModelList,
    responseDeserialize: deserialize_ProcessMining_JsonModelList,
  },
};

exports.AlphaMinerClient = grpc.makeGenericClientConstructor(AlphaMinerService);
