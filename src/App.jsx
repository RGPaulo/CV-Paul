import React from 'react';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import ChatBot from './components/ChatBot';
import { cvData } from './data';

function App() {
  return (
    <div className="cv-container">
      <Sidebar data={cvData} />
      <Main data={cvData} />
      <ChatBot />
    </div>
  );
}

export default App;
