import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components'

const Body = styled.div`
    display: block;
`;
const Price = styled.div`
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-style: bold;
`;
const CallToAction = styled.div`
    background: palevioletred;
    max-width: 20vw;
    margin: 2rem auto 0 auto;
    padding: 0.5rem;

    a {
        color: white;
    }
`;

function GbpPrice({name, price, currency}) {
    return (
        <>
            <Head>
                <title>
                    {name} {currency} Price Index
                </title>
            </Head>
            <Body>
                <h1>{name} {currency} Price Index </h1>
                <Price>{price} </Price>
                <CallToAction>
                    <Link href="/" cssClass="button">Back</Link>
                </CallToAction>
            </Body>
            
        </>)
}

export async function getStaticPaths() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const prices = await res.json();

    const paths = (Object.keys(prices.bpi)).map(path => {
        return `/price/${path.toLowerCase()}`
    })

    console.log(paths)

    return {
        paths,
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const prices = await res.json();

    console.log(params) 

    const currency = params.price.toUpperCase();
    return {
        props: {
            name: prices.chartName,
            price: prices.bpi[currency].rate,
            currency: currency
        }
    }
}

export default GbpPrice