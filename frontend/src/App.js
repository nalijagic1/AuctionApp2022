import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBlack from "./components/navigationBlack/navigationBlack";
import NavigationWhite from "./components/navigationWhite/navigationWhite";
import Footer from "./components/footer/footer";
import PrivacyAndPolicy from "./pages/privacyAndPolicy/privacyAndPolicy";
import TermsAndConditions from "./pages/termsAndConditions/termsAndConditions";
import AboutUs from "./pages/aboutUs/aboutUs";
import LandingPage from "./pages/landingPage/landingPage";
import SingleProduct from "./pages/singleProduct/singleProduct";
import { Helmet } from "react-helmet";
import ShopPage from "./pages/shopPage/shopPage";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import LogIn from "./pages/logIn/logIn";
import Registration from "./pages/registration/registration";
import Payment from "./pages/payment/payment";
import SuccesfulPayment from "./pages/succesfulPayment/succesfulPayment";
import AddNewItem from "./pages/addNewItem/addNewItem";
import personService from "./services/person.service";
import { ROLES } from "./utils/roles";
import SideBar from "./components/sideBar/sideBar";
import { useState } from "react";
import UserManagement from "./pages/userManagement/userManagement";
import AuthVerify from "./utils/auth-verify";

function App() {
  const user = personService.getCurrentUser();
  const [expanded,setExpanded] = useState(false)
  return (
    <div className="App">
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css?family=Lato:400,700"
          rel="stylesheet"
          type="text/css"
        />
      </Helmet>
      <div className="content">
        <NavigationBlack />
        {user && user.role === ROLES.ADMIN && <SideBar expanded = {(expand) => setExpanded(expand)}/>}
        <NavigationWhite expanded = {expanded} />
        <div className={expanded ? "compressContent":""}>
          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/privacy" element={<PrivacyAndPolicy />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/shop/:category" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentComplete" element={<SuccesfulPayment />} />
          <Route path ="/addItem" element={<AddNewItem/>}/>
          <Route path="/userManagement" element={<UserManagement/>}/>
        </Routes>
        </div>
        <AuthVerify/>
      </div>
      <footer className="foot">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
