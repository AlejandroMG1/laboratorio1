import express from 'express';
import cors from 'cors';
import { rutasEnterprise } from './views/enterprise/rutas.js';
import { rutasIssue } from './views/issue/rutas.js';
import { rutasProject } from './views/project/rutas.js';
import { rutasUser } from './views/user/rutas.js';

const app = express();

const port = 4000;

app.use(express.json());
app.use(cors());

app.use(rutasEnterprise);
app.use(rutasIssue);
app.use(rutasProject);
app.use(rutasUser);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
