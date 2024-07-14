const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const eventsPath = path.resolve(__dirname, '../db/events.json');
  const events = JSON.parse(fs.readFileSync(eventsPath, 'utf-8'));

  for (const event of events) {
    await prisma.event.create({
      data: {
        eventName: event.eventName,
        frequency: event.frequency,
        benchmarkTime: event.benchmarkTime,
        isTextEditable: event.isTextEditable,
        color: event.color,
        shape: event.shape,
        ProcessId: event.ProcessId
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
