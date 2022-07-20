import React, {useState, useEffect, useRef} from 'react';
import CategoryList from '../../components/categoryList/categoryList';
import SearchResult from '../../components/searchResult/searchResult';
import {useParams, useLocation} from 'react-router-dom';
import './shopPage.css'
import productService from '../../services/product.service';
import Button from '../../components/button/button';
import PathBar from '../../components/pathBar/pathBar';
import DidYouMean from '../../components/didYouMean/didYouMean';

function ShopPage() {
    const param = useParams();
    const initCount = 9;
    const [products, setProducts] = useState([]);
    const query = new URLSearchParams(useLocation().search);
    const word = query.get("search");
    const [count, setCount] = useState(initCount);
    let hasMore = useRef(true);
    let start = useRef(1);
    let previous = useRef("");
    const filter = word ? word : param.category;

    function showMore() {
        start.current += 1;
        setCount(initCount * start.current);
    }

    useEffect(() => {
        const testIfFilterChanged = ((change) => {
            if (previous.current !== change) setCount(initCount);
        })
        if (word) {
            testIfFilterChanged(word);
            previous.current = word;
            productService.getSearchResult(word, count)
                .then((response) => {
                    setProducts(response.data);
                    hasMore.current = response.data.length === count;
                });
        } else {
            testIfFilterChanged(param.category);
            previous.current = param.category
            productService.getProductsFromCategory(param.category, count)
                .then((response) => {
                    setProducts(response.data);
                    hasMore.current = response.data.length === count;
                });
        }

    }, [param, word, count]);
    return (
        <div className="shopPage">
            {word &&
            <div>
                {products.length === 0 &&
                    <DidYouMean search={word}/>
                }
                <PathBar prop={{name: "", startPoint: "Home", endPoint: `Search results for ${word}`}}></PathBar>
            </div>

            }
            <div className="shop">
                <CategoryList filter={filter}/>
                <SearchResult results={products}/>
            </div>
            {hasMore.current &&
            <div className="explore">
                <Button className="exploreButton" lable="Explore More" onClick={showMore}/>
            </div>}

        </div>
    );
}

export default ShopPage;
