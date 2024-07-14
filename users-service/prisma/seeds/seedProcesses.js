const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const processesPath = path.resolve(__dirname, '../db/processes.json');
  const processes = JSON.parse(fs.readFileSync(processesPath, 'utf-8'));

  for (const process of processes) {
    await prisma.process.create({
      data: {
        processName: process.processName,
        description: process.description,
        lastUpdate: new Date(process.lastUpdate),
        fitness: process.fitness,
        CompanyId: process.CompanyId
      },
    });
  }
}

console.log('Seeding finished.');

main()
  .catch(error => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
