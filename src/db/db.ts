import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = ()=>{
    return new PrismaClient();
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton(); //global this added in 2020 in js to access global varibales
export default db

if(process.env.NODE_ENV !== 'production') globalThis.prisma = db