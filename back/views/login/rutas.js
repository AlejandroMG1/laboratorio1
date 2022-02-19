import express from 'express';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutaLogin = express.Router();

rutaLogin.route('/login').post(async (req, res) => {
  const {email} = req.body;
  console.log(req.body, email)
  try {    
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    res.status(201).send({ status: 'ok', user });
  } catch {
    res.status(500).send({ status: 'error' });
  }
});

export { rutaLogin };