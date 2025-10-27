import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient()

async function main() {
  // await prisma.user.update({
  //     where: {
  //     id: "cmh2e2v1x0000lja0qm2o5ivq"
  //   },
  //   data: {
  //     role: "ADMIN"
  //   }
  // })

  // const users = await prisma.user.findMany()
  
  // console.log(users)
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
