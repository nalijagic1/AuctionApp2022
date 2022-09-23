import React, { useState } from "react";
import "./landingPage.css";
import CategoryList from "../../components/categoryList/categoryList";
import Offers from "../../components/offers/offers";
import ProductHighlight from "../../components/productHighlight/productHightlight";
import Loader from "../../components/loader/loader";

function LandingPage() {
  const [loading, isLoading] = useState(false);
  console.log(loading);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="home">
            <CategoryList isLoading={(loading) => isLoading(loading)} />
            <ProductHighlight />
          </div>
          <Offers />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
