const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const tasksPath = path.resolve(__dirname, '../db/tasks.json');
  const tasks = JSON.parse(fs.readFileSync(tasksPath, 'utf-8'));

  for (const task of tasks) {
    await prisma.task.create({
      data: {
        ...task,
        time: parseFloat(task.time),
        timestamp: new Date(task.timestamp)
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