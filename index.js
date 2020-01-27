const express = require('express');
const app = express();

app.use(express.json());

let projects = [];
let counterRequests = 0;

app.use((req, res, next) => {
    counterRequests++;
    console.log(`Número de requisições feitas: ${counterRequests}`);

    return next();
})

function checkIdExists(req, res, next){
    const projectFilter = projects.filter(project => {
        if (project.id == req.params.id){
            return project;
        }
    });

    if (!projectFilter[0]){
        return res.status(400).json({ error: 'User ID is required' });
    }

    return next();
}

app.post('/projects', (req, res) => {
    const { id, title } = req.body;
    
    projects.push({id, title, tasks: []});
    
    return res.json(projects);
});

app.get('/projects', (req, res) => {
    return res.json(projects);
});

app.put('/projects/:id', checkIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects = projects.filter(project => {
        if (project.id == id){
            project.title = title;
        }

        return project;
    });

    return res.json(projects);
});

app.delete('/projects/:id', checkIdExists, (req, res) => {
    const { id } = req.params;

    projects = projects.filter(project => {
        if (project.id != id){
            return project;
        }
    })

    return res.json(projects);
});

app.post('/projects/:id/tasks', checkIdExists, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects = projects.filter(project => {
        if (project.id == id){
            project.tasks.push(title);
        }

        return project;
    });

    return res.json(projects);
});

app.listen(3333);