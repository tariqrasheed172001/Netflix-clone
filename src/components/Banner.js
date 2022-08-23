import React, { useEffect, useState } from 'react'
import axios from "../axios";
import requests from '../requests';
import TypeWriterEffect from 'react-typewriter-effect';
import "./Banner.css";

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect( () => {
        async function fetchData() {

            const request = await axios.get(requests.fetchNetflix0riginals)

            setMovie(
              request.data.results[
                    Math.floor(Math.random() * 20 )
                ]
            )
            return request;
        }
        fetchData();
    },[]);

    console.log(movie)

    function truncate(str,n){
      return str?.length > n ? str.substr(0,n-1)+"...": str; 
    }


  return (
    <header className='banner'
      style={{
        backgroundSize: "cover",
        backgroundImage:`url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition:"center center",
      }}
    > 
      <div className='banner_contents'>
              <h1 className='banner_title'>

              <TypeWriterEffect
                textStyle={{

                  color: '#fff',
                }}
                startDelay={1000}
                cursorColor="rgba(255, 255, 255, 0)"
                multiText={[
                  movie?.title || movie?.name || movie?.original_name
                ]}
                multiTextDelay={1000}
                typeSpeed={150}
              />
              </h1>
          
          
        

        <div className='banner_buttons'>
          <button className='banner_button'>Play</button>
          <button className='banner_button'>My List</button>
        </div>

        <h1 className='banner_description'>

        <TypeWriterEffect
                textStyle={{

                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '1.5em',
                }}
                startDelay={1000}
                cursorColor="rgba(255, 255, 255, 0)"
                multiText={[
                  truncate(movie?.overview,150)
                ]}
                multiTextDelay={1000}
                typeSpeed={20}
              />      


          
        </h1>

      </div>

      <div className="banner--fadeBottom" />
    </header>
  )
}

export default Banner