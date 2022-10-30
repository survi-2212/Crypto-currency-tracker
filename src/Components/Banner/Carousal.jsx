import { Box, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TrendingCoins } from '../../Config/api';
import { CryptoState } from '../../CryptoContext';
import axios from 'axios'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom';



const CarousalConatiner = styled(Box)({
    height: '50%',
    display: 'flex',
    alignItems: 'center'
})
const CarousalItem = styled(Link)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    color: 'white',
    textTransform: 'uppercase'
})

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function Carousal() {

    const { currency,symbol } = CryptoState()
    const [trending,setTreanding ] = useState([]);

    const fetchTrendingCoins = async() =>{
        const { data } =await axios.get(TrendingCoins(currency));

        setTreanding(data);
    }

    // console.log(trending)

    useEffect(() => {
      fetchTrendingCoins()

    }, [currency])


    const items = trending.map((coin)=>{

        let profit = coin.price_change_percentage_24h >= 0

        return(
            <CarousalItem to={`/coins/${coin.id}`}>
                <img src={coin.image} alt={coin.name} height= '80' style={{
                    marginBottom: 10
                }} />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span style={{marginLeft: '6px', color: profit > 0 ? "green" : "red", fontWeight: 'bold'}}>
                        {profit && '+'} {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>

                <span>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </CarousalItem>
        )
    })
    
    
    const responsive = {
        0: {
            items: 2
        },
        512: {
            items: 4
        }
    }
 
  return (
    <CarousalConatiner>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />

    </CarousalConatiner>
  )
}

export default Carousal