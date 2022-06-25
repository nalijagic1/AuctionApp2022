import NavigationBlack from './components/navigationBlack/navigationBlack';
import NavigationWhite from './components/navigationWhite/navigationWhite';
import Footer from './components/footer/footer';
import PrivacyAndPolicy from './pages/privacyAndPolicy/privacyAndPolicy';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
    <div className="App">
        <NavigationBlack/>
        <NavigationWhite/>
        <Router>
      < Routes>
      <Route path='/privacy' element={<PrivacyAndPolicy/>}/>
      </ Routes>
    </Router>
        <Footer/>
    </div>
  );
}

export default App;
