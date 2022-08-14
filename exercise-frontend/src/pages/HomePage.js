import React from 'react';
import ExerciseList from '../components/ExerciseList';
import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([])

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
        }
    }
    const history = useHistory();

    const onEdit = async exercise => {
        setExerciseToEdit(exercise);
        history.push("/edit-exercise");

    }



    const loadExercises = async () => {
        const response = await fetch('/exercises')      //is a promise
        const exerciseData = await response.json();     // also a promise
        setExercises(exerciseData);
    }

    useEffect(() => {
        loadExercises();
    }, []);         //called when the component is first mounted


    return (
        <>
            <h2>Home Page</h2>
            <p>Below is a list of logged exercises with the corresponding exercise name, number of reps,
                the weight, the unit of measure, and the date of the exericse. Additionally, you may use the
                edit and delete buttons to modify or remove a given exercise!
            </p>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
        </>
    )
}

export default HomePage