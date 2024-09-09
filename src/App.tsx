import React from 'react';
import DataTable from './components/DataTable/DataTable';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App" style={{ height: '100vh', overflow: 'auto' }}>
      <DataTable />
    </div>
  );
};

export default App;