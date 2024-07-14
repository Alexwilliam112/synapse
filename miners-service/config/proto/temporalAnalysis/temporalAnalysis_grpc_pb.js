// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var temporalAnalysis_pb = require('./temporalAnalysis_pb.js');

function serialize_TemporalAnalysis_JsonEventlog(arg) {
  if (!(arg instanceof temporalAnalysis_pb.JsonEventlog)) {
    throw new Error('Expected argument of type TemporalAnalysis.JsonEventlog');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TemporalAnalysis_JsonEventlog(buffer_arg) {
  return temporalAnalysis_pb.JsonEventlog.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_TemporalAnalysis_TaskHistory(arg) {
  if (!(arg instanceof temporalAnalysis_pb.TaskHistory)) {
    throw new Error('Expected argument of type TemporalAnalysis.TaskHistory');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_TemporalAnalysis_TaskHistory(buffer_arg) {
  return temporalAnalysis_pb.TaskHistory.deserializeBinary(new Uint8Array(buffer_arg));
}


var TemporalMinerService = exports.TemporalMinerService = {
  getTaskHistory: {
    path: '/TemporalAnalysis.TemporalMiner/GetTaskHistory',
    requestStream: false,
    responseStream: false,
    requestType: temporalAnalysis_pb.JsonEventlog,
    responseType: temporalAnalysis_pb.TaskHistory,
    requestSerialize: serialize_TemporalAnalysis_JsonEventlog,
    requestDeserialize: deserialize_TemporalAnalysis_JsonEventlog,
    responseSerialize: serialize_TemporalAnalysis_TaskHistory,
    responseDeserialize: deserialize_TemporalAnalysis_TaskHistory,
  },
};

exports.TemporalMinerClient = grpc.makeGenericClientConstructor(TemporalMinerService);
