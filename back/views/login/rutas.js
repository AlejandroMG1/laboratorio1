import express from 'express';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutaLogin = express.Router();

rutaLogin.route('/login').post(async (req, res) => {
  const {email} = req.body;
  try {    
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if(user) {
      res.status(201).send({ status: 'ok', user });
    } else {
      res.status(500).send({ status: 'error', message: 'No se pudo inicar sesion' });
    }
  } catch {
    res.status(500).send({ status: 'error', message: 'No se pudo inicar sesion' });
  }
});

export { rutaLogin };