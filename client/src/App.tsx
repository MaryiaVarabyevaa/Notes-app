import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import { restoreFromStorageAction } from './store/noteReducer';


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreFromStorageAction());

  });
  return (
    <div className="App">
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </div>
  );
}

export default App;
