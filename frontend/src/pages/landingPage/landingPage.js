import React from "react";
import CategoryList from "../../components/categoryList/categoryList";
import "./landingPage.css"
import ProductHighlight from "../../components/productHighlight/productHightlight";
import Offers from "../../components/offers/offers";

function LandingPage() {
    return (
        <div>
            <div className="home">
                <CategoryList />
                <ProductHighlight />
            </div>
            <Offers />

        </div>
    );
}

export default LandingPage;
