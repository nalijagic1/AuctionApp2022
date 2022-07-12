import React from 'react';
import {Tab, Tabs} from '@mui/material';
import {useEffect, useState} from "react";
import productService from '../../services/product.service';
import Card from '../card/card';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./offers.css"

function Offers() {
    const [tab,setTab] = useState(1)
    const [products, setProducts] = useState();
    const count = 8;
    const [start, setStart] = useState(0);
    const [more, setMore] = useState(true);

    function getData(option) {
        productService.getNewestOrLastChance(option, start, count).then((response) => {
            setStart(start + 1);
            if (response.data.length === 0 || response.data.length % count !== 0) {
                setMore(false);
            }
            if (products) {
                setProducts(products.concat(response.data));
            } else {
                setProducts(response.data);
            }


        })
    }

    function getNext() {
        setTimeout(() => {
            getData(tab);
        }, 500)

    }

    useEffect(() => {
        document.getElementsByClassName("offers")[0].addEventListener('click', (event) => {
            setTab(event.target.id);
            setStart(0);
            getData(event.target.id);
            setMore(true);
        });
        getData(tab, start);
    }, []);
    return (
        <div className="grid">
            <Tabs className="offers" variant="scrollable" scrollButtons={false}  textColor="secondary" indicatorColor="secondary" value={tab.toString()}>
                <Tab label="New Arrivals" id="1" value="1"/>
                <Tab label="Last Chance" id="2" value="2"/>
            </Tabs>
            <hr/>
            {products &&
            <InfiniteScroll
                className='productList'
                dataLength={products.length} //This is important field to render the next data
                next={getNext}
                hasMore={more} 
            >
                {products.map(product => (
                        <Card className="productCard" key={product.id} name={product.name} productId={product.id}
                              price={product.startingPrice}/>
                ))}
            </InfiniteScroll>
            }


        </div>
    );
}

export default Offers;
