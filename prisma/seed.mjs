import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash("eUkv')o&;se2wH3vf=tNPllCzt$G=Ri1}tHAW7re1Z~Qx.]HgP", 10);

    const admin = await prisma.user.upsert({
        where: { email: "xodosoft@gmail.com" },
        update: {},
        create: {
            name: "Anees Ahmed",
            email: "xodosoft@gmail.com",
            password: hashedPassword,
        },
    });

    console.log("Admin user created:", admin);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
