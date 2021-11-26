import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import MenuAppBar from "./component/TopBar";
import Index from "./component/Index";

function App() {
  return (
    <div>
      <MenuAppBar/>
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Index/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
