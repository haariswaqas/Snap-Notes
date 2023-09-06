import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'




import './App.css';

function App() {
  return (
    <Router>
    

    <div className="App">
    <Header/>
      <Routes>
     
      <Route path ="/" element = {<NotesListPage/>} />
      <Route path ="note/:id" element = {<NotePage/>} />
      

      </Routes>
    
      
     
     
    </div>
    </Router>
    
    
   
  );
}

export default App;
