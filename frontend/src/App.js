import NavigationBlack from './components/navigationBlack/navigationBlack';
import NavigationWhite from './components/navigationWhite/navigationWhite';
import Footer from './components/footer/footer';
import PrivacyAndPolicy from './pages/privacyAndPolicy/privacyAndPolicy';
import TermsAndConditions from './pages/termsAndConditions/termsAndConditions';
import AboutUs from './pages/aboutUs/aboutUs';
import LandingPage from './pages/landingPage/landingPage';
import SingleProduct from './pages/singleProduct/signgleProduct';
import "./App.css"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <head>
      <link href='http://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'/>
      </head>
      <div className='content'>
        <NavigationBlack/>
        <NavigationWhite/>
        <Router>
      < Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/privacy' element={<PrivacyAndPolicy/>}/>
      <Route path='/terms' element={<TermsAndConditions/>}/>
      <Route path='/aboutUs' element={<AboutUs/>}/>
      <Route path='/product/:productId' element={<SingleProduct/>}/>
      </Routes>
    </Router>
    </div>
    <footer className='foot'>
      <Footer/>
    </footer>
  </div>
  );
}

export default App;
