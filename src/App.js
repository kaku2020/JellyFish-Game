
import './App.css';
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';


function App() {
  return (
    //BEM CONVENTION
    <div className="app">
      
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
