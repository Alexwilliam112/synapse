const { PrismaClient } = require('@prisma/client');
const { hash } = require('../utils/bcrypt');
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

    const companies = await Promise.all(companiesData.map(async (company) => {
      return await prisma.company.create({
        data: {
          ...company,
          expiration: addYears(new Date(), 1),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });
    }));

    if (!companies || companies.length === 0) {
      throw new Error('No companies created or companies array is empty.');
    }

    const usersData = [
      {
        email: 'user3@techcorp.com',
        password: await hash('12345', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        CompanyId: companies[0].id,
      },
      {
        email: 'user4@softwaresolution.com',
        password: await hash('12345', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
        CompanyId: companies[1].id,
      },
    ];

    await prisma.user.createMany({
      data: usersData,
    });

  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error('Error in main function:', e);
    process.exit(1);
  });