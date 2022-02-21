import express from 'express';
import pkg from '@prisma/client';
import * as auth from './../../modules/auth.js';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasEnterprise = express.Router();

rutasEnterprise.route('/getAllEnterprises').get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser)=>{
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {    
        const empresas = await prisma.enterprise.findMany();
    
        res.status(201).send({ status: 'ok', empresas});
      } catch {
        res.status(500).send({ status: 'error', message: 'Error al obtener las empresas' });
      }
    } else{ 
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion'});
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error', message: 'Error sesion usuario' });
  })
});

rutasEnterprise.route('/enterprise/:enterpriseId').get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser)=>{
    if (loggedUser && loggedUser.role === 'Cliente') {
      try {    
        const empresa = await prisma.enterprise.findUnique({
          where: { id: `${req.params.enterpriseId}` }
        });
    
        res.status(201).send({ status: 'ok', empresa});
      } catch {
        res.status(500).send({ status: 'error', message: 'Error al obtener empresa' });
      }
    } else{ 
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion'});
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error', message: 'Error sesion usuario' });
  })
});

rutasEnterprise.route('/enterprise').post(async (req, res) => {
  const {enterprise, user} = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async(currUser)=>{
    if (currUser && currUser.role == 'Administrador') {
      let nuevaEnterprise;
      let nuevoEmpleado;
      try {
        nuevaEnterprise = await prisma.enterprise.create({
          data: {
            name: enterprise.name,
          },
        });
        nuevoEmpleado = await prisma.user.create({
          data: {
            email: user.email,
            role: user.role,
            enterpriseId: nuevaEnterprise.id
          },
        });
        res.status(201).send({ status: 'ok', empresa: nuevaEnterprise, empleado: nuevoEmpleado});
      } catch(err){
        if(nuevaEnterprise){
          await prisma.enterprise.delete({
            where: {id: nuevaEnterprise.id}
          })
          res.status(500).send({ status: 'error', message: 'Creando, usuario ya existe' });
        }
        res.status(500).send({ status: 'error', message: 'Error creando' });
        
      }
    }else{ 
      res.status(401).send({ status: 'error Permisos', message: 'No tiene los permisos necesarios para realizar la operacion'});
    }
  }).catch(() => {
    res.status(404).send({ status: 'error', message: 'Error sesion usuario' });
  })
});

rutasEnterprise.route('/enterprise/:id').patch(async (req, res) => {
  const {enterprise} = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (currUser)=>{
    if (currUser && currUser.role == 'Cliente' && currUser.enterpriseId === enterprise.id ) {
      try {
        const empresa = await prisma.enterprise.update({
          where: {id: enterprise.id},
          data: {
            name:enterprise.name,
          },
        });
    
        res.status(201).send({ status: 'ok', empresa});
      } catch {
        res.status(500).send({ status: 'error Actualizar Enterprise' });
      }
    }else{ 
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion'});
    }
  }).catch(() => {
    res.status(404).send({ status: 'error', message: 'Error sesion usuario' });
  })
});

export { rutasEnterprise };