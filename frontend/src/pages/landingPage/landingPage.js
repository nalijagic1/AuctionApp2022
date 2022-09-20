import React,{Suspense}from "react";
import "./landingPage.css";

function LandingPage() {
  const CategoryList = React.lazy(() => import("../../components/categoryList/categoryList"));
  const ProductHighlight = React.lazy(() => import("../../components/productHighlight/productHightlight"));
  const Offers = React.lazy(() => import("../../components/offers/offers"));
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
    <div>
      <div className="home">
        <CategoryList />
        <ProductHighlight />
      </div>
      <Offers />
    </div></Suspense>
  );
}

export default LandingPage;
