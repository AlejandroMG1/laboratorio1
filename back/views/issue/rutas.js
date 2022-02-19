import express from "express";
import pkg from "@prisma/client";
import * as auth from "./../../modules/auth.js";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasIssue = express.Router();

rutasIssue.route("/issue").get(async (req, res) => {
  auth
    .isAuth(req.headers.user)
    .then(async (user) => {
      let issues;
      switch (user.role) {
        case "Administrador":
          issues = await prisma.issue.findMany();
          break;
        case "Cliente":
          issues = await prisma.issue.findMany({
            where: {
              project: {
                clientEnterprise: {
                  users: {
                    some: user,
                  },
                },
              },
            },
          });
          break;
        case "Desarrollador":
          issues = await prisma.issue.findMany({
            where: {
              developer: user,
            },
          });
          break;
      }
      res.status(200).send({issues});
    })
    .catch((err) => {
      res
        .status(401)
        .send({ status: "Unauthorized", message: "no se ah autenticado" });
    });
});

rutasIssue.route("/issue").post(async (req, res) => {
  const { description, category, priority, dueDate, project } = req.body;
  const user = await auth.isAuth(req.headers.user);
  if (!user) {
    return res
      .status(401)
      .send({ status: "Unauthorized", message: "no se ah autenticado" });
  }
  try {
    switch (user.role) {
      case "Administrador":
        const issue = await prisma.issue.create({
          data: {
            description: description,
            category: category,
            dueDate: dueDate,
            priority: priority,
            project: { connect: { id: project } },
          },
        });
        return res.status(201).send(issue);
        break;
      case "Cliente":
        const inProject = await prisma.project.count({
          where: {
            clients: { some: { id: user.id } },
            id: project,
          },
        });
        if (inProject > 0) {
          const issue = await prisma.issue.create({
            data: {
              description: description,
              category: category,
              dueDate: dueDate,
              priority: priority,
              project: { connect: { id: project } },
            },
          });
          return res.status(201).send(issue);
        } else {
          return res
            .status(401)
            .send({ message: "no tiene acceso al proyecto" });
        }
        break;
      case "Desarrollador":
        return res
          .status(401)
          .send({ message: "no tiene permisos para crear issues" });
        break;
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
rutasIssue.route("/issue:id").patch(async (req, res) => {
  const { category, priority, developer, hourEstimate, status } = req.body;
  auth
    .isAuth(req.headers.user)
    .then(async (user) => {
      const { id } = req.params;
      const issue = await prisma.issue.findUnique({ where: { id: id } });
      let allowedStatus = [];
      let allowUpdateStatus = false;
      switch (user.role) {
        case "Administrador":
          const developerAllowed =
            (await prisma.project.count({
              where: {
                developers: { some: { id: developer } },
                id: issue.projectId,
              },
            })) > 1;
          if (!issue.developer && developer && developerAllowed) {
            status = "Assigned";
          }
          allowedStatus = [
            "NotAssigned",
            "Assigned",
            "InternalValidation",
            "ClientValidation",
          ];
          "NotAssigned", (allowUpdateStatus = allowedStatus.includes(status));

          actualizedIssue = prisma.issue.update({
            where: { id: issue.id },
            data: {
              status: allowUpdateStatus ? status : undefined,
              category: category ? category : undefined,
              developer: developer ? { connect: { id: developer } } : undefined,
            },
          });
          return res.status(200).send(actualizedIssue);
          break;
        case "Cliente":
          const clientProject =
            (await prisma.project.count({
              where: {
                clients: { some: { id: user.id } },
                id: issue.projectId,
              },
            })) > 1;
          if (clientProject) {
            allowedStatus = ["NotAssigned", "ClientValidation", "Closed"];
            allowUpdateStatus = allowedStatus.includes(status);
            actualizedIssue = prisma.issue.update({
              where: { id: issue.id },
              data: {
                status: allowUpdateStatus ? status : undefined,
                priority: priority,
              },
            });
          }

          break;
        case "Desarrollador":
          if (!issue.hourEstimate && hourEstimate) {
            status = "Estimated";
          }
          allowedStatus = ["Estimated", "InternalValidation"];
          allowUpdateStatus = allowedStatus.includes(status);
          actualizedIssue = prisma.issue.update({
            where: { id: issue.id },
            data: {
              status: allowUpdateStatus ? status : undefined,
              hourEstimate: hourEstimate ? hourEstimate : undefined,
            },
          });
          break;
      }
    })
    .catch((error) => {
      return res
        .status(401)
        .send({ status: "Unauthorized", message: "no se ah autenticado" });
    });
});

rutasIssue.route("/projectIssues/:id").get(async (req, res) => {
  const user = await auth.isAuth(req.headers.user);

  if (!user) {
    return res
      .status(401)
      .send({ status: "Unauthorized", message: "no se ah autenticado" });
  }
  try {
    const { id } = req.params;
    const issues = await prisma.issue.findMany({
      where: {
        projectId: id,
      },
    });
    return res.status(200).send(issues);
  } catch (err) {}
});

export { rutasIssue };

/*

  */
