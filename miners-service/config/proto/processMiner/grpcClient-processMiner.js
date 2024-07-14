const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './config/proto/processMiner/processMining.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const processMiningProto = grpc.loadPackageDefinition(packageDefinition).ProcessMining;

const processMinerClient = new processMiningProto.AlphaMiner('localhost:50051', grpc.credentials.createInsecure());

module.exports = processMinerClient;
