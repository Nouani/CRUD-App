const express = require('express');
const app = express();

app.use(express.json());

let projects = [];

app.post('/projects', (req, res) => {
    const { id, title } = req.body;
    
    projects.push({id, title, tasks: []});
    
    return res.json(projects);
});

app.get('/projects', (req, res) => {
    return res.json(projects);
});

app.put('/projects/:id', (req, res) => {
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

app.delete('/projects/:id', (req, res) => {
    const { id } = req.params;

    projects = projects.filter(project => {
        if (project.id != id){
            return project;
        }
    })

    return res.json(projects);
});

app.listen(3333);