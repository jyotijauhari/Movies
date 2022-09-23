import React, { Component } from 'react'
import { movies } from './getMovies'
import axios from 'axios';
const config = require('./temp/keys.js');

export default class Movies extends Component {
    constructor(){
        super();
        this.state = {
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }

    async componentDidMount(){
        //sideeffectwork
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${config.getApiKey()}&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        // console.log(data);
        this.setState({
            movies:[...data.results]
        })
        // console.log("mount");
        // console.log(config.getApiKey());
    }

    changeMovies=async ()=>{
        let res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${config.getApiKey()}&language=en-US&page=${this.state.currPage}`)
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=()=>{
        let temparr = [];
        for (let i = 1; i <= this.state.parr.length+1; i++) {
            temparr.push(i);
        }

        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage + 1
        },this.changeMovies)
    }

    handleLeft=async()=>{
        if(this.state.currPage != 1){
            this.setState({
                currPage:this.state.currPage - 1
            },this.changeMovies)
        } 
    }

    handleClick = (value) =>{
        if(value!=this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }

    handleFavourites = (movie) => {
        let oldData = JSON.parse(localStorage.getItem("movies") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id);
        }
        else{
            oldData.push(movie);
        }
        localStorage.setItem("movies", JSON.stringify(oldData));
        this.handleFavouritesState();
    }

    handleFavouritesState = async () => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        let temp = oldData.map((movie)=>movie.id);
        await this.setState({
            favourites:[...temp]
        })
    }
  
  
    render() {
    // let movie = movies.results;
    // console.log("render");
    return (
        <>
        {
            this.state.movies.length == 0 ?
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>:
            <div>
                <h3 className='text-center'><strong>Trending</strong></h3>
                <div className='movies-list'>
                    {
                        this.state.movies.map((movieObj)=>(
                            <div className="card movies-card" onMouseEnter={()=>{this.setState({hover:movieObj.id});
                            this.handleFavouritesState()}} onMouseLeave={()=>this.setState({hover:''})}>
                                <img className="card-img-top movies-img" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={this.state.movies.title} />
                                <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                <div className='button-wrapper' style={{display:'flex', width:'100%', justifyContent:'center'}}>
                                    {
                                        this.state.hover == movieObj.id &&
                                        <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)}>
                                            {
                                            this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to favourite"
                                            }
                                            </a>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                        <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.parr.map((value)=>(
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                ))
                            }
                            <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        }
        </>
    )
  }
}
