import express from 'express';
import pkg from '@prisma/client';
import * as auth from './../../modules/auth.js';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasProject = express.Router();

rutasProject.route('/projects').get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser)=>{
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {    
        const proyectos = await prisma.project.findMany();
    
        res.status(201).send({ status: 'ok', proyectos});
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

rutasProject.route('/projectById').get(async (req, res) => {
  const proyectoId='ckzskehrx0120z8rnl04hb9ad'
  //const {proyectoId} = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser)=>{
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {    
        const proyecto = await prisma.project.findUnique({
          where: {
            id: proyectoId
          }
        });
    
        res.status(201).send({ status: 'ok', proyecto});
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

rutasProject.route('/project').post(async (req, res) => {
  const {proyecto} = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser)=>{
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {    
        const nuevoProyecto = await prisma.project.create({
          data: {
            name: proyecto.name,
            description: proyecto.description,
            clientEnterpriseId: proyecto.clientEnterpriseId
          },
        });
    
        res.status(201).send({ status: 'ok', proyecto: nuevoProyecto});
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


export { rutasProject };