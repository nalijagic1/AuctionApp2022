import React, { useState, useEffect, useRef } from "react";
import CategoryList from "../../components/categoryList/categoryList";
import SearchResult from "../../components/searchResult/searchResult";
import { useParams, useLocation } from "react-router-dom";
import "./shopPage.css";
import productService from "../../services/product.service";
import Button from "../../components/button/button";
import PathBar from "../../components/pathBar/pathBar";
import DidYouMean from "../../components/didYouMean/didYouMean";
import { STATUS_CODES } from "../../utils/httpStatusCode";
import Loader from "../../components/loader/loader";

function ShopPage() {
  const param = useParams();
  const INITIAL_COUNT = 9;
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const word = query.get("search");
  const [count, setCount] = useState(INITIAL_COUNT);
  let hasMore = useRef(true);
  let start = useRef(1);
  let previous = useRef("");
  const filter = word ? word : param.category;
  const [loading, setLoading] = useState(false);

  function showMore() {
    start.current += 1;
    setCount(INITIAL_COUNT * start.current);
  }

  useEffect(() => {
    const testIfFilterChanged = (change) => {
      if (previous.current !== change) setCount(INITIAL_COUNT);
    };
    if (word) {
      testIfFilterChanged(word);
      previous.current = word;
      productService.getSearchResult(word, count).then((response) => {
        if (response.status === STATUS_CODES.OK) {
          setProducts(response.data);
          hasMore.current = response.data.length === count;
        }
      });
    } else {
      testIfFilterChanged(param.category);
      previous.current = param.category;
      productService
        .getProductsFromCategory(param.category, count)
        .then((response) => {
          if (response.status === STATUS_CODES.OK) {
            setProducts(response.data);
            hasMore.current = response.data.length === count;
          }
        });
    }
  }, [param, word, count]);
  return (
    <div className="shopPage">
      {loading ? (
        <Loader></Loader>
      ) : (
        <div>
          {word && (
            <div>
              {products.length === 0 && <DidYouMean search={word} />}
              <PathBar
                prop={{
                  name: "",
                  startPoint: "Home",
                  endPoint: `Search results for ${word}`,
                }}
              ></PathBar>
            </div>
          )}
          <div className="shop">
            <CategoryList
              filter={filter}
              isLoading={(load) => setLoading(load)}
            />
            <SearchResult results={products}/>
          </div>
          {hasMore.current && (
            <div className="explore">
              <Button
                className="exploreButton"
                label="Explore More"
                buttonClass="purpleButton"
                onClick={showMore}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ShopPage;
