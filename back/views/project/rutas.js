import express from 'express';
import pkg from '@prisma/client';
import * as auth from './../../modules/auth.js';

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasProject = express.Router();

rutasProject.route('/projects').get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser) => {
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {
        const proyectos = await prisma.project.findMany({
          include: {
            clientEnterprise: true,
            clients: true,
            developers: true,
            issues: true
          }
        });

        res.status(201).send({ status: 'ok', proyectos });
      } catch {
        res.status(500).send({ status: 'error' });
      }
    } else {
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion' });
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error' });
  })
});

rutasProject.route('/project/:id').get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser) => {
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {
        const proyecto = await prisma.project.findUnique({
          where: { id: `${req.params.id}` },
          include: {
            clients: true,
            developers: true,
            issues: true
          }
        });

        res.status(201).send({ status: 'ok', proyecto });
      } catch (err) {
        console.log(err)
        res.status(500).send({ status: 'error' });
      }
    } else {
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion' });
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error' });
  })
});

rutasProject.route('/project').post(async (req, res) => {
  const { proyecto } = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser) => {
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {
        const nuevoProyecto = await prisma.project.create({
          data: {
            name: proyecto.name,
            description: proyecto.description,
            clientEnterpriseId: proyecto.clientEnterpriseId
          },
        });

        res.status(201).send({ status: 'ok', proyecto: nuevoProyecto });
      } catch(err) {
        console.log(err)
        res.status(500).send({ status: 'error crear' });
      }
    } else {
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion' });
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error' });
  })
});

rutasProject.route('/addCliente').patch(async (req, res) => {
  const { idProyecto, idUser, } = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser) => {
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {
        await prisma.project.update({
          where: {
            id: idProyecto
          },
          data: {
            clients: {
              push: await prisma.user.findUnique({
                where: {id: idUser}
              })
            }
          },
        });

        res.status(201).send({ status: 'ok' });
      } catch(err) {
        console.log(err)
        res.status(500).send({ status: 'error crear' });
      }
    } else {
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion' });
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error' });
  })
});

rutasProject.route('/addDeveloper').patch(async (req, res) => {
  const { idProyecto, idUser, } = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser.then(async (loggedUser) => {
    if (loggedUser && loggedUser.role === 'Administrador') {
      try {
        await prisma.project.update({
          where: {
            id: idProyecto
          },
          data: {
            developers: {
              push: idUser
            }
          },
        });

        res.status(201).send({ status: 'ok' });
      } catch {
        res.status(500).send({ status: 'error crear' });
      }
    } else {
      res.status(401).send({ status: 'error', message: 'No tiene los permisos necesarios para realizar la operacion' });
    }
  }).catch((err) => {
    res.status(404).send({ status: 'error' });
  })
});


export { rutasProject };