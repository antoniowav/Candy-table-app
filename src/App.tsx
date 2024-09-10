import React from 'react';
import DataTable from './components/DataTable/DataTable';

import './App.css';
import Header from './components/Header/Header';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <DataTable />
    </div>
  );
};

export default App;