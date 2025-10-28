import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient()

async function main() {
  await prisma.user.update({
    where: {
      id: "cmh3m35q00000l104ppv7qeoz"
    },
    data: {
      role: "ADMIN"
    }
  })

  const users = await prisma.user.findMany()

  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
