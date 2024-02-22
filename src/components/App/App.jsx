import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';
import BmiForm from '../BmiForm/BmiForm';
import Info from '../Info/Info';
import Bar from '../Bar/Bar';
import { getData, storeData } from '../../helpers/localStorage';

const App = () => {
  const initialState = () => getData('data') || [];

  const [state, setState] = useState(initialState);
  const [prevState, setPrevState] = useState([]);

  // submit handler
  const handleChange = val => {
    let heightInM = val.height / 100;
    val.bmi = (val.weight / (heightInM * heightInM)).toFixed(2);
    val.id = uuidv4();
    let newVal = [...state, val];
    let len = newVal.length;
    if (len > 7) newVal = newVal.slice(1, len);
    setState(newVal);

    /**
     * Clear any delete history before the current submission.
     * We're doing 'undo' for delete only, so we don't want the
     * 'undo' button to show after adding a new entry, making it
     * look ambiguous (i.e. as if an addition can be undone).
     */
    setPrevState([]);

    // Update local storage
    storeData('data', newVal);
  };

  const handleDelete = id => {
    setPrevState([...prevState, [...state]]);

    let newState = state.filter(i => {
      return i.id !== id;
    });
    setState(newState);

    storeData('data', newState);
  };

  const handleUndo = () => {
    if (prevState.length) {
      const newState = prevState.pop();

      setPrevState([...prevState]);

      setState(newState);

      storeData('data', newState);
    }
  };

  // Used to calculate the chart's data during rendering.
  const getChartData = () => ({ labelData: state.map(s => s.date), bmiData: state.map(s => s.bmi) });

  return (
    <div className='container'>
      <div className='row center'>
        <h1 className='white-text'> BMI Tracker </h1>
      </div>
      <div className='row'>
        <div className='col m12 s12'>
          <BmiForm change={handleChange} />
          <Bar chartData={getChartData()} />
          <div>
            <div className='row center'>
              <h4 className='white-text'>7 Day Data</h4>
            </div>
            <div className='data-container row'>
              {state.length > 0 ? (
                <>
                  {state.map(info => (
                    <Info
                      key={info.id}
                      id={info.id}
                      weight={info.weight}
                      height={info.height}
                      date={info.date}
                      bmi={info.bmi}
                      deleteCard={handleDelete}
                    />
                  ))}
                </>
              ) : (
                  <div className='center white-text'>No log found</div>
                )}
            </div>
          </div>
          {prevState.length > 0 && (
            <div className='center'>
              <button className='calculate-btn' onClick={handleUndo}>
                Undo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
