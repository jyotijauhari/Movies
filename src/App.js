import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import {BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Navbar/>  
    <Switch>
    <Route path='/' exact render={(props)=>(
      <>
        <Banner {...props}/>
        <Movies {...props}/>
      </>
    )}/>
    <Route path='/favourites' component={Favourite}/>
    </Switch>
      {/* <Banner/>
      <Movies/>
      <Favourite/> */}
    </Router>
  );
}

export default App;
