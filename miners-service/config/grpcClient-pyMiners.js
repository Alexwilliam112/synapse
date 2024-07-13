const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './config/processMining.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const processMiningProto = grpc.loadPackageDefinition(packageDefinition).ProcessMining;

const grpcClient = new processMiningProto.AlphaMiner('localhost:50051', grpc.credentials.createInsecure());

module.exports = grpcClient;
