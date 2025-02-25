import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Anasayfa from './components/Anasayfa';
import Onay from './components/Onay';
import Siparis from './components/Siparis';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Anasayfa />
        </Route>
        <Route path="/siparis">
          <Siparis />
        </Route>
        <Route path="/onay">
          <Onay />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
