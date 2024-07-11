import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import fs from 'fs/promises';

const packageDefinition = protoLoader.loadSync('processMining.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const processMiningProto = grpc.loadPackageDefinition(packageDefinition).ProcessMining;

const client = new processMiningProto.AlphaMiner('localhost:50051', grpc.credentials.createInsecure());

// Read XES data from a file (or you can construct it directly in the code)
async function sendXESData() {
  try {
    const xesData = await fs.readFile('../data/xes/eventlog.xes', 'utf8');

    client.SendXES({ xes_data: xesData }, (error, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Response from server:', response.message);
      }
    });
  } catch (err) {
    console.error('Error reading XES file:', err);
  }
}

sendXESData();
