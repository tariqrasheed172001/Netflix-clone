import React from 'react'
import requests from '../requests';
import Row from '../components/Row';
import Banner from "../components/Banner";
import Nav from '../components/Nav';

function Home() {
  return (
    <div>
        <Nav />

        <Banner />

        <Row title="NETFLIX ORGINALS" fetchUrl={requests.fetchNetflix0riginals} isLargeRow/>
        <Row title="Trending now" fetchUrl = {requests.fetchTrending}/>
        <Row title="Top Rated" fetchUrl = {requests.fetchTopRated}/>
        <Row title="Action Movies" fetchUrl = {requests.fetchActionMovies}/>
        <Row title="Comedy Movies" fetchUrl = {requests.fetchComedyMovies}/>
        <Row title="Horror Movies" fetchUrl = {requests.fetchHorrorMovies}/>
        <Row title="Romance Movies" fetchUrl = {requests.fetchRomanceMovies}/>
        <Row title="Documentries" fetchUrl = {requests.fetchDocumentaries}/>
    </div>
  )
}

export default Home