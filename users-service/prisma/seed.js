const { PrismaClient } = require('@prisma/client');
const { hash } = require('../helpers/bcrypt');
const { addYears } = require('date-fns');

const prisma = new PrismaClient();

async function main() {
  try {
    const companiesData = [
      {
        companyName: 'Tech Corp',
      },
      {
        companyName: 'Software Solutions Ltd',
      },
    ];

    // Create companies in the database
    const companies = await Promise.all(companiesData.map(async (company) => {
      return await prisma.company.create({
        data: {
          ...company,
          expiration: addYears(new Date(), 1), // Set expiration 1 year from now
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }));

    if (!companies || companies.length === 0) {
      throw new Error('No companies created or companies array is empty.');
    }

    // Define users data to be seeded
    const usersData = [
      {
        email: 'user3@techcorp.com',
        password: await hash('password1', 10), // Hash password asynchronously
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: companies[0].id, // Assign user to the first company
      },
      {
        email: 'user4@softwaresolution.com',
        password: await hash('password2', 10), // Hash password asynchronously
        createdAt: new Date(),
        updatedAt: new Date(),
        companyId: companies[1].id, // Assign user to the second company
      },
      // Add more users as needed
    ];

    // Create users in the database
    await prisma.user.createMany({
      data: usersData,
    });

    console.log('Seeding finished.');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1); // Exit process with error code
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
}

main()
  .catch((e) => {
    console.error('Error in main function:', e);
    process.exit(1); // Exit process with error code
  });