import React, { useState } from "react";
import "./searchResult.css";
import { Link } from "react-router-dom";
import Card from "../card/card";
import { BsGrid3X3, BsList } from "react-icons/bs";
import ListItem from "../listItem/listItem";

function SearchResult({ results }) {
  const [view, setView] = useState("Grid");
  return (
    <div className="result">
      <div className="chooseOptions">
        <h3 className={`viewOption ${view==="Grid" ?"selected":""}`} onClick={() => setView("Grid")}>
          <BsGrid3X3 className="viewOptionIcon" />
          Grid
        </h3>
        <h3 className={`viewOption ${view==="List" ? "selected":""}`} onClick={() => setView("List")}>
          <BsList className="viewOptionIcon"/>
          List
        </h3>
      </div>
      <div className={`resultView${view}`}>
        {results.map((product) => (
          <div key={results.id} className="resultItem">
            <Link to={`/product/${product.id}`}>
              {view === "Grid" ? (
                <Card
                  name={product.name}
                  productId={product.id}
                  price={product.startingPrice}
                />
              ) : (
                <ListItem
                  productName={product.name}
                  productDescription={product.description}
                  productId={product.id}
                  productPrice={product.startingPrice}
                ></ListItem>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResult;
