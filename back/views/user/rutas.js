import express from "express";
import pkg from "@prisma/client";
import * as auth from "./../../modules/auth.js";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasUser = express.Router();

rutasUser.route("/users/:enterpriseId").get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser
    .then(async (loggedUser) => {
      if (loggedUser && loggedUser.role === "Cliente") {
        try {
          const usuarios = await prisma.user.findMany({
            where: { enterpriseId: `${req.params.enterpriseId}` },
          });
          res.status(200).json({ usuarios });
        } catch (err) {
          res.status(500).send({ status: "error obteniendo" });
        }
      } else {
        res.status(401).send({
          status: "error",
          message:
            "No tiene los permisos necesarios para realizar la operacion",
        });
      }
    })
    .catch(() => {
      res.status(404).send({ status: "error logged user" });
    });
});

rutasUser.route("/users").get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser
    .then(async (loggedUser) => {
      if (loggedUser && loggedUser.role === "Administrador") {
        try {
          const usuarios = await prisma.user.findMany({
            include: {
              enterprise: true,
            },
          });
          res.status(200).json({ usuarios });
        } catch (err) {
          res.status(500).send({ status: "error obteniendo" });
        }
      } else {
        res.status(401).send({
          status: "error",
          message:
            "No tiene los permisos necesarios para realizar la operacion",
        });
      }
    })
    .catch(() => {
      res.status(404).send({ status: "error logged user" });
    });
});

rutasUser.route("/user").post(async (req, res) => {
  const { user } = req.body;
  const currUser = auth.isAuth(req.headers.user);
  currUser
    .then(async (loggedUser) => {
      if (
        loggedUser &&
        (loggedUser.role === "Administrador" || loggedUser.role === "Cliente")
      ) {
        try {
          const nuevoEmpleado = await prisma.user.create({
            data: {
              email: user.email,
              role: user.role,
              enterpriseId:
                loggedUser.role === "Cliente"
                  ? loggedUser.enterpriseId
                  : user.enterpriseId,
            },
          });

          res.status(201).send({ status: "ok", empleado: nuevoEmpleado });
        } catch (err) {
          console.log(err);
          res.status(500).send({ status: "error" });
        }
      } else {
        res.status(401).send({
          status: "error",
          message:
            "No tiene los permisos necesarios para realizar la operacion",
        });
      }
    })
    .catch((err) => {
      res.status(404).send({ status: "error" });
    });
});

rutasUser.route("/usersAllDevelopers").get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser
    .then(async (loggedUser) => {
      if (loggedUser && loggedUser.role === "Administrador") {
        try {
          const usuarios = await prisma.user.findMany({
            where: {
              role: "Desarrollador",
            },
          });
          res.status(200).json({ usuarios });
        } catch (err) {
          res.status(500).send({ status: "error obteniendo" });
        }
      } else {
        res.status(401).send({
          status: "error",
          message:
            "No tiene los permisos necesarios para realizar la operacion",
        });
      }
    })
    .catch(() => {
      res.status(404).send({ status: "error logged user" });
    });
});

rutasUser.route("/usersDevelopersByProject/:id").get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser
    .then(async (loggedUser) => {
      if (loggedUser && loggedUser.role === "Administrador") {
        const { id } = req.params;
        try {
          const usuarios = await prisma.user.findMany({
            where: {
              role: "Desarrollador",
              developerProjects: { some: { id: id } },
            },
          });
          res.status(200).json({ usuarios });
        } catch (err) {
          res.status(500).send({ status: "error obteniendo" });
        }
      } else {
        res.status(401).send({
          status: "error",
          message:
            "No tiene los permisos necesarios para realizar la operacion",
        });
      }
    })
    .catch(() => {
      res.status(404).send({ status: "error logged user" });
    });
});

rutasUser.route("/usersAllClientesbyEmpresa/:id").get(async (req, res) => {
  const currUser = auth.isAuth(req.headers.user);
  currUser
    .then(async (loggedUser) => {
      if (loggedUser && loggedUser.role === "Administrador") {
        try {
          const empresa = await prisma.project.findUnique({
            where: { id: `${req.params.id}` },
            select: {
              clientEnterpriseId: true,
            },
          });
          console.log(empresa);
          const usuarios = await prisma.user.findMany({
            where: {
              enterpriseId: empresa.clientEnterpriseId,
              role: "Cliente",
            },
          });
          res.status(200).json({ usuarios });
        } catch (err) {
          console.log(err);
          res.status(500).send({ status: "error obteniendo" });
        }
      } else {
        res.status(401).send({
          status: "error",
          message:
            "No tiene los permisos necesarios para realizar la operacion",
        });
      }
    })
    .catch(() => {
      res.status(404).send({ status: "error logged user" });
    });
});

export { rutasUser };
