import express, { Request, Response } from 'express';
import cors from 'cors';
import { courses, students } from './database';
import { COURSE_STACK, TCourse, TStudent } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)
});

//* req -> método de req do front; query -> método de pesquisa; q variável de busca; as string -> tipagem do valor da pesquisa;

//* o as string para query é mais indicado por não possuirmos type para query pré determinado, então quando possuirmos type para tipar, usar type, quando não, as type;

app.get('/courses/search', (req: Request, res: Response) => {
    const q = req.query.q as string
    const result: TCourse[] = courses.filter(course => course.name.toLowerCase().includes(q.toLowerCase()))
    res.status(200).send(result)
});

//* Criar variáveis que recebam requesição de criação de body para o servidor;

//* Podemos criar individualmente as variáveis cada uma com seu tipo de valor a receber, ou desestruturar em objeto os valores que serão requisitados e o valor será o formato da requisição req.body;

app.post('/courses', (req: Request, res: Response) => {

    // const id = req.body.id as string
    // const name = req.body.name as string
    // const lessons = req.body.lessons as number
    // const stack = req.body.stack as COURSE_STACK

    //* Vou receber um objeto com chaves e valores, e este tipo de variável é do tipo que já tenho no meu types.ts, indico a tipagem dele após a criação da desestruturação dos valores const {des, ses, tru, tu, ra, ção}: Ttypes;

    const { id, name, lessons, stack }: TCourse = req.body;

    //* Como os valores das chaves serão declarados pelo usuário, só indicamos a criação e o formato do objeto com as chaves sem atribuir valores neste caso;

    const newCourse = {
        id,
        name,
        lessons,
        stack
    };

    courses.push(newCourse);

    res.status(201).send('Novo curso criado com sucesso!');
});

app.post('/students', (req: Request, res: Response) => {
    const { id, name, age }: TStudent = req.body;
    const newStudent = {
        id,
        name,
        age
    };
    students.push(newStudent);
    res.status(201).send('Novo cadastro estudantil realizado.')
});

app.get('/students/search', (req: Request, res: Response) => {
    const q = req.query.q as string;
    const result: TStudent[] = students.filter(student => student.name.toLowerCase().includes(q.toLowerCase()))
    res.status(200).send(result)
});

app.get('/students', (req: Request, res: Response) => {
    res.status(200).send(students)
});