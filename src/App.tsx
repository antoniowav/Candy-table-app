import React, { useState } from 'react';
import DataTable from './components/DataTable/DataTable';
import Header from './components/Header/Header';
import ViewSwitch from './components/ViewSwitch/ViewSwitch';

import './App.css';

const App: React.FC = () => {
  const [isListView, setIsListView] = useState(true);

  return (
    <div className="App">
      <Header />
      <ViewSwitch isListView={isListView} setIsListView={setIsListView} />
      <DataTable isListView={isListView} />
    </div>
  );
};

export default App;
