import express from "express";
import pkg from "@prisma/client";
import * as auth from "./../../modules/auth.js";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const rutasIssueComment = express.Router();

rutasIssueComment.route("/comment").post(async (req, res) => {
  const { comment, issue } = req.body;
  auth
    .isAuth(req.headers.user)
    .then(async (user) => {
      if (user) {
        try {
          const newComment = await prisma.issueComment.create({
            data: {
              comment: comment,
              issue: { connect: { id: issue } },
              createdBy: { connect: { id: user.id } },
            },
          });
          console.log(newComment);
          return res.status(201).send(newComment);
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      }
    })
    .catch((err) => {
      res
        .status(404)
        .send({ status: "error", message: "Error sesion usuario" });
    });
});

export { rutasIssueComment as rutasIssueComment };
