import React from 'react';
import './navigationWhite.css'
import logo from '../../images/auction-app-logo 1.png'


function NavigationWhite() {
    let searchField = useRef();
    let navigate = useNavigate();
    function search() {
        if (searchField.current.value.length >= 3) navigate("/shop?search=" + searchField.current.value);
    };

    useEffect(() => {
        searchField.current = document.getElementById('searchField');
    }, []);

    return (
        <div className="whitenav">
            <div id="logo">
                <a href='/'>
                    <img src={logo} alt="Auction"></img>
                </a>
            </div>
            <div className='search'>
                <input id="searchField" type="text" placeholder="Search" onKeyDown={e => {
                    if (e.key.toLowerCase() === 'enter') search();
                }}></input>
                <input id="searchButton" type="submit" value="" onClick={search}/>
            </div>
            <div className='menu'>
                <a href='/'>HOME</a>
                <a href='/shop/all'>SHOP</a>
                <a href='/'>MY ACCOUNT</a>
            </div>
        </div>
    );
}

export default NavigationWhite;
