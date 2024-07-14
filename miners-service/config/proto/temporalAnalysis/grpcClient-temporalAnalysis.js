const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './config/proto/temporalAnalysis/temporalAnalysis.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const temporalAnalysis = grpc.loadPackageDefinition(packageDefinition).TemporalAnalysis;

const temporalAnalysisClient = new temporalAnalysis.TemporalMiner('localhost:50053', grpc.credentials.createInsecure());

module.exports = temporalAnalysisClient;
