import React, { useState } from "react";
import "./landingPage.css";
import CategoryList from "../../components/categoryList/categoryList";
import Offers from "../../components/offers/offers";
import ProductHighlight from "../../components/productHighlight/productHightlight";
import CircularProgress from '@mui/material/CircularProgress';

function LandingPage() {
  const [loading,isLoading] = useState(false);
  return (
    <div>
      {loading ? <CircularProgress/> :
      <div>
      <div className="home">
        <CategoryList isLoading ={(loading)=> isLoading(loading)}/>
        <ProductHighlight isLoading ={(loading)=> isLoading(loading)}/>
      </div>
      <Offers isLoading ={(loading)=> isLoading(loading)}/>
      </div>}
    </div>
  );
}

export default LandingPage;
