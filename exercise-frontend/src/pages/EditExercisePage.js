import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const EditExercisePage = ({ exerciseToEdit }) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date.substring(0, 10));
    const [btn, setBtn] = useState(false)


    const history = useHistory();
    const hanldleChange = (name, reps, weight, unit, date) => {
        if (name && reps > 0 && weight > 0 && unit && date) {
            setBtn(false)
        } else {
            setBtn(true)
        }
    }
    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date }
        const response = await fetch(`/exercises/${exerciseToEdit._id}`,
            {
                method: 'PUT',
                body: JSON.stringify(editedExercise),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.status === 200) {
            alert("Exercise edited successfully!")
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`)
        }
        history.push('/');
    }

    return (
        <>
            <article>
                <h2>Edit your Exercise</h2>
                <p>On this page, you can make modifications to an existing entry. Similar to creating an exercise,
                    the application only allows weights and reps greater than 0. The 'Submit' field will be enabled
                    when all exercise data has been added!
                </p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset>
                        <legend>Which exercise are you adding?</legend>
                        <label for="name">Exercise Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => { setName(e.target.value); hanldleChange(e.target.value, reps, weight, unit, date) }}
                            id="name"
                            required />

                        <label for="reps">Reps Completed</label>
                        <input
                            type="number"
                            value={reps}
                            onChange={e => { setReps(e.target.value); hanldleChange(name, e.target.value, weight, unit, date) }}
                            id="reps"
                            min="1"
                            required />

                        <label for="weight">Weight</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={e => { setWeight(e.target.value); hanldleChange(name, reps, e.target.value, unit, date) }}
                            id="weight"
                            min="1"
                            required />

                        <label for="unit">Unit</label>
                        <select value={unit} onChange={e => { setUnit(e.target.value); hanldleChange(name, reps, weight, e.target.value, date) }} id="unit" required>
                            <option value='lbs'>lbs</option>
                            <option value='kgs'>kgs</option>
                            <option value='miles'>miles</option>
                        </select>

                        <label for="date">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={e => { setDate(e.target.value); hanldleChange(name, reps, weight, unit, e.target.value) }}
                            id="date"
                            required />

                        <label for="submit">
                            <button
                                disabled={btn}
                                onClick={editExercise}
                            >Save</button> to the collection</label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default EditExercisePage;