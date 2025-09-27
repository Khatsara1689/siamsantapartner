// prisma/seed.ts
import { prisma } from "../lib/db";
import bcrypt from "bcrypt";

async function main() {
  const email = "test@example.com";
  const passwordHash = await bcrypt.hash("pass1234", 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, name: "Test User", passwordHash },
  });
}
main().then(() => {
  console.log("Seeded");
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
