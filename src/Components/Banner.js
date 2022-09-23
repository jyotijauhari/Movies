import React, { Component } from 'react'
import { movies } from './getMovies'
export default class Banner extends Component {
  render() {
    // console.log(movies.results);
    let movie = movies.results[2];
    return (
        <>
        {
            movie == ''?
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>:
          <div className="card banner-card" >
            <img className="card-img-top banner-img" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title}/>
            <div className="card-body">
              <h1 className="card-title banner-title">{movie.original_title}</h1>
              <p className="card-text banner-text">{movie.overview}</p>
              {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
            </div>
          </div>
        }
        </>
    )
  }
}
