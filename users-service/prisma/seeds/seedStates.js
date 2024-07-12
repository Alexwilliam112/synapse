const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  const statesPath = path.resolve(__dirname, "../db/states.json");
  const states = JSON.parse(fs.readFileSync(statesPath, "utf-8"));

  for (const state of states) {
    await prisma.state.create({
      data: {
        eventName: state.eventName,
        color: state.color,
        shape: state.shape,
        isTextEditable: state.isTextEditable,
        ProcessId: state.ProcessId,
      },
    });
  }
}

console.log("Seeding finished.");

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
