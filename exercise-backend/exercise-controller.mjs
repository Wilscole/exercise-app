import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise-server.mjs';


const PORT = process.env.PORT

const app = express();

const validUnits = ['kgs', 'lbs', 'miles', 'seconds', 'minutes']


app.use(express.json())

app.post('/exercises', (req, res) => {

    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise);
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Request Failed' })
        })

})

app.get('/exercises', (req, res) => {
    let filter = {}
    exercises.findExercise(filter)
        .then(exercises => {
            res.json(exercises)
        })
        .catch(error => {
            console.error(error)
            res.status(400).json({ Error: 'Invalid Request' });
        })
})

app.get('/exercises/:_id', (req, res) => {
    const exerciseId = req.params._id
    exercises.findExerciseById(exerciseId)
        .then(exercise => {
            if (exercise !== null) {
                res.json(exercise)
            } else {
                res.status(404).json({ Error: 'Resource not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' });
        })

})

app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdate => {
            if (numUpdate === 1) {
                res.json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(400).json({ Error: 'Invalid Request' })
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({ Error: 'Invalid Request' })
        });
})

app.delete('/exercises/:_id', (req, res) => {
    exercises.deleteById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({ Error: 'Document not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ error: 'Request to delete a document failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})