import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const MainTitle = styled.h1`
  font-size: 1.5em;
`;

const Body = styled.div``;

const Button = styled.button`    
    background: palevioletred;
    margin: 2rem;
    padding: 0.5rem;
    color: white;
    border-color: white;
`;

function Home( {currencies} ) {
    const router = useRouter()
    const handleClick = (e, url) => { 
        e.preventDefault()
        router.push(`price/${url.toLowerCase()}`) 
    }

    var buttons = currencies.map(path => {
        return <Button onClick={(e) => handleClick(e, path)}>{path}</Button>
    })

    return (
        <>
            <Head>
                <title>
                    BitCoin Price Index
                </title>
            </Head>
            <Body>
                <MainTitle>
                    BitCoin Price Index
                </MainTitle>
                {buttons}
            </Body>
        </>)
}

export async function getStaticProps() {
    const res = await  fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const prices = await res.json();
    return {
        props: {
            currencies: Object.keys(prices.bpi)
        }
    }
}

export default Home