import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

export const CreateExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const [btn, setBtn] = useState(true)

    const history = useHistory();


    const hanldleChange = (name, reps, weight, unit, date) => {
        if (name && reps > 0 && weight > 0 && unit && date) {
            setBtn(false)
        } else {
            setBtn(true)
        }
    }

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date }
        const response = await fetch('/exercises',
            {
                method: 'POST',
                body: JSON.stringify(newExercise),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        if (response.status === 201) {
            alert("Exercise added successfully!")
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`)
        }
        history.push('/');
    }

    return (
        <>
            <article>
                <h2>Add to the collection</h2>
                <p>On this page, you can add new exercises. Please note the application does not allow weights or
                    reps below 0. Once all fields have been updated with exercise data, the 'Add' field
                    will be enabled for submission!
                </p>
                <form onSubmit={(e) => { e.preventDefault(); }}>
                    <fieldset>
                        <legend>Which exercise are you adding?</legend>
                        <label for="name">Exercise Name</label>
                        <input
                            type="text"
                            placeholder="Name of Exercise"
                            value={name}
                            onChange={e => { setName(e.target.value); hanldleChange(e.target.value, reps, weight, unit, date) }}
                            id="name"
                            required />

                        <label for="reps">Reps Completed</label>
                        <input
                            type="number"
                            value={reps}
                            placeholder="0"
                            onChange={e => { setReps(e.target.value); hanldleChange(name, e.target.value, weight, unit, date) }}
                            id="reps"
                            min="1"
                            required />

                        <label for="weight">Weight</label>
                        <input
                            type="number"
                            placeholder="0"
                            value={weight}
                            onChange={e => { setWeight(e.target.value); hanldleChange(name, reps, e.target.value, unit, date) }}
                            id="weight"
                            min="1"
                            required />

                        <label for="unit">Unit</label>
                        <select value={unit} onChange={e => { setUnit(e.target.value); hanldleChange(name, reps, weight, e.target.value, date) }} id="unit" required>
                            <option></option>
                            <option value='lbs'>lbs</option>
                            <option value='kgs'>kgs</option>
                            <option value='miles'>miles</option>
                        </select>

                        <label for="date">Date</label>
                        <input
                            type="date"
                            placeholder={Date()}
                            value={date}
                            onChange={e => { setDate(e.target.value); hanldleChange(name, reps, weight, unit, e.target.value) }}
                            id="date"
                            required />

                        <label for="submit">
                            <button
                                disabled={btn}
                                type="submit"
                                onClick={addExercise}
                                id="submit"
                            >Add</button> to the collection</label>
                    </fieldset>
                </form>
            </article>
        </>
    );
}

export default CreateExercisePage;