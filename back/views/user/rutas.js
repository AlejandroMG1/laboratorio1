import express from 'express';
import pkg from '@prisma/client';
import * as auth from './../../modules/auth.js';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasUser = express.Router();

rutasUser.route('/users/enterprise/:enterpriseId').get(async (req, res) => {  
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser)=>{
    if (loggedUser && loggedUser.role === 'Cliente') {
      try {
        const usuarios = await prisma.user.findMany({
          where: {enterpriseId: `${req.params.enterpriseId}`}
        });
        res.status(200).json({ usuarios });
      } catch (err) {
        res.status(500).send({ status: 'error obteniendo' });
      }
    } else {
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion'});
    }
  }).catch(() => {
    res.status(404).send({ status: 'error logged user' });
  })
});

rutasUser.route('/user').post(async (req, res) => {
  const {user} = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async(loggedUser)=>{
    if (loggedUser && (loggedUser.role === 'Administrador' || loggedUser.role === 'Cliente') ) {
      try {    
        const nuevoEmpleado = await prisma.user.create({
          data: {
            email: user.email,
            role: user.role,
            enterpriseId: loggedUser.role === 'Cliente' ? loggedUser.enterpriseId : user.enterpriseId
          },
        });
    
        res.status(201).send({ status: 'ok', empleado: nuevoEmpleado});
      } catch {
        res.status(500).send({ status: 'error' });
      }
    }else{ 
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion'});
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error' });
  })
});

export { rutasUser };