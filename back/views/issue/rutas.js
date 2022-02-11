import express from "express";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasIssue = express.Router();

rutasIssue.route("/issue").get(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.headers.user },
  });
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
  res.status(200).send({ issues });
});

rutasIssue.route("/issue").post(async (req, res) => {
  const { description, category, priority, dueDate, project } = req.body;
  const user = await prisma.user.findUnique({
    where: { id: req.headers.user },
  });
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
          clients: { some: { user: user } },
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
      }else{

      }
      break;
    case "Desarrollador":
      res.status(401).send();
      break;
  }
  res.status(401).send();
});

export { rutasIssue };

/*
switch (user.role) {
    case "Administrador":
      break;
    case "Cliente":
      break;
    case "Desarrollador":
      break;
  }
  */
