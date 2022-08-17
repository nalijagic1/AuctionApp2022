import React from "react";
import { Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import productService from "../../services/product.service";
import Card from "../card/card";
import InfiniteScroll from "react-infinite-scroll-component";
import "./offers.css";

function Offers() {
  const [tab, setTab] = useState(1);
  const [products, setProducts] = useState();
  const count = 8;
  const [start, setStart] = useState(0);
  const [more, setMore] = useState(true);
  var lastTab = useRef(0);

  function changeTab(event) {
    setTab(event.target.id);
    setStart(0);
    setMore(true);
  }

  function getNext() {
    setTimeout(() => {
      setStart(start + 1);
    }, 500);
  }

  useEffect(() => {
    const getData = (option) => {
      productService
        .getNewestOrLastChance(option, start, count)
        .then((response) => {
          if (
            response.data.length === 0 ||
            response.data.length % count !== 0
          ) {
            setMore(false);
          }
          if (lastTab.current === option) {
            setProducts((p) => p.concat(response.data));
          } else {
            setProducts(response.data);
            lastTab.current = option;
          }
        });
    };
    getData(tab);
  }, [tab, start]);
  return (
    <div className="grid">
      <Tabs
        className="offers"
        variant="scrollable"
        scrollButtons={false}
        TabIndicatorProps={{ style: { background: "#8367D8" } }}
        textColor="inherit"
        value={tab.toString()}
      >
        <Tab label="New Arrivals" id="1" value="1" onClick={changeTab} />
        <Tab label="Last Chance" id="2" value="2" onClick={changeTab} />
      </Tabs>
      <hr />
      {products && (
        <InfiniteScroll
          className="productList"
          dataLength={products.length} //This is important field to render the next data
          next={getNext}
          hasMore={more}
        >
          {products.map((product) => (
            <div key={product.id} className="productCard">
              <Link to={`/product/${product.id}`}>
                <Card
                  name={product.name}
                  productId={product.id}
                  price={product.startingPrice}
                />
              </Link>
            </div>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
}

export default Offers;
