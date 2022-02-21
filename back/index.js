import express from 'express';
import { rutasEnterprise } from './views/enterprise/rutas.js';
import { rutasIssue } from './views/issue/rutas.js';
import { rutaLogin } from './views/login/rutas.js';
import { rutasProject } from './views/project/rutas.js';
import { rutasUser } from './views/user/rutas.js';
import cors from 'cors';
import { rutasIssueComment } from './views/issueComment/rutas.js';

const app = express();
app.use(cors());
const port = 4000;

app.use(express.json());

app.use(rutasEnterprise);
app.use(rutasIssue);
app.use(rutaLogin);
app.use(rutasProject);
app.use(rutasUser);
app.use(rutasIssueComment);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
