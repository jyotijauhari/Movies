import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            genres:[],
            currgen:'All Genres',
            movies:[]
        }
    }

    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data = JSON.parse(localStorage.getItem("movies") || "[]");
        // console.log("====" + data);

        let temp = []   
        data.forEach(movieObj => {
            if(!temp.includes(genreids[movieObj.genre_ids[0]])){
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        });  
        temp.unshift('All Genres');
        this.setState({
            genres:[...temp],
            movies:[...data]
        })
        // console.log("temp: " + temp);  
    }

    handleGenreClick = (genre) => {
        this.setState({
            currgen:genre,
        })
    }

  render() {
    // const movie = movies.results
    // console.log(movie);
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    
    let filterArr = [];
    if(this.state.currgen!='All Genres'){
        filterArr =  this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
    }
    else{
        filterArr = [...this.state.movies]
    }
    return (
      <>
      <div className='main'>
        <div className='row'>
            <div className='col-3'>
            <ul class="list-group favourites-genres">
                {
                    this.state.genres.map((genre)=>(
                        this.state.currgen==genre?
                        <li class="list-group-item" style={{background:"#3f51b5",color:'white',fontWeight:'bold'}}>{genre}</li>
                        :<li class="list-group-item" onClick={()=>this.handleGenreClick(genre)}>{genre}</li>
                    ))
                }
            </ul>
            </div>
            <div className='col-9 favourites-table'>
                <div className='row'>
                    <input type="text" className='input-group-text col' placeholder='Search'></input>
                    <input type="number" className='input-group-text col' placeholder='Rows Count'></input>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Popularity</th>
                        <th scope="col">Rating</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterArr.map((movieObj)=> (
                                <tr>
                                    <td> <img src={"https://image.tmdb.org/t/p/original" + movieObj.poster_path} alt={movieObj.title} style={{width:'3rem'}}></img> {movieObj.original_title}</td>
                                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                                    <td>{movieObj.popularity}</td>
                                    <td>{movieObj.vote_average}</td>
                                    <td> <button type="button" class="btn btn-danger">Delete</button></td>
                                </tr>
                            ))}
                    </tbody>
                 </table>
                 <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        <li class="page-item"><a class="page-link" href="#">1</a></li>
                        <li class="page-item"><a class="page-link" href="#">2</a></li>
                        <li class="page-item"><a class="page-link" href="#">3</a></li>
                    </ul>
                </nav>
            </div>
        </div>
      </div>
      </>
    )
  }
}
