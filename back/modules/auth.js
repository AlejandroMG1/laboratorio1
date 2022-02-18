import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

export const isAuth  = async (req) => {

    try {
        return await prisma.user.findUnique({
            where: { id: req },
        
        });
    } catch (error) {
        return null;
    }
}

export default isAuth
