import React, { useState } from 'react';
import DataTable from './components/DataTable/DataTable';
import Header from './components/Header/Header';

import './App.css';

const App: React.FC = () => {
  const [isListView, setIsListView] = useState(true);

  return (
    <div className="App">
      <Header />
      <DataTable isListView={isListView} setIsListView={setIsListView} />
    </div>
  );
};

export default App;
