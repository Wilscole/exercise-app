import './App.css';
import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import Navigation from './components/Nav'
import { useState } from 'react';


function App() {
  const [exerciseToEdit, setExerciseToEdit] = useState([]);

  return (
    <div className="App">
      <Router>
        <Navigation />
        <header className="App-header">
          <h1>Exercise Tracker</h1>
          <p>When performance is measured, performance is improved!</p>
        </header>
        <main>
          <Route path="/" exact> <HomePage setExerciseToEdit={setExerciseToEdit} /> </Route>
          <Route path="/add-exercise"> <CreateExercisePage /> </Route>
          <Route path="/edit-exercise"><EditExercisePage exerciseToEdit={exerciseToEdit} /></Route>
        </main>
        <footer>
          <p><cite>&copy; 2022 Coleton Wilson</cite></p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
