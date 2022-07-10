import React from 'react';
import {Tab, Tabs} from '@mui/material';
import {useEffect, useState} from "react";
import productService from '../../services/product.service';
import Card from '../card/card';
import InfiniteScroll from 'react-infinite-scroll-component';
import "./offers.css"

function Offers() {
    var tab = 1;
    const [products, setProducts] = useState();
    const count = 8;
    const [start, setStart] = useState(0);
    const [more, setMore] = useState(true);

    function getData(option) {
        productService.getNewestOrLastChance(option, start, count).then((response) => {
            setStart(start + 1);
            if (response.data.length == 0 || response.data.length % count != 0) {
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
            tab = event.target.id;
            setStart(0);
            getData(tab, start);
            setMore(true);
        });
        getData(tab, start);
    }, []);
    return (
        <div className="grid">
            <Tabs className="offers" variant="scrollable" scrollButtons={false} indicatorColor="primary">
                <Tab label="New Arrivals" id="1" value="1"/>
                <Tab label="Last Chance" id="2" value="2"/>
            </Tabs>
            <hr/>
            {products &&
            <InfiniteScroll
                className='productList'
                dataLength={products.length} //This is important field to render the next data
                next={getNext}
                hasMore={more} np
            >
                {products.map(product => (
                    <div className="productCard">
                        <Card key={product.id} name={product.name} productId={product.id}
                              price={product.startingPrice}/>
                    </div>
                ))}
            </InfiniteScroll>
            }


        </div>
    );
}

export default Offers;
