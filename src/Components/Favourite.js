import React, { Component } from 'react'
import { movies } from './getMovies'

export default class Favourite extends Component {
    constructor(){
        super();
        this.state = {
            genres:[],
            currgen:'All Genres',
            movies:[],
            currText:'',
            limit:5,
            currPage:1,
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

    handlePageChange = (pageNo) => {
        this.setState({
            currPage:pageNo,
        })
    }

    handleDelete = (movieId) => {
        let temp = this.state.movies.filter((movieObj)=>movieObj.id != movieId);
        localStorage.setItem("movies",JSON.stringify(temp));
        this.setState({
            movies:[...temp]
        })
    }

  render() {
    // const movie = movies.results
    // console.log(movie);
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    
    let filterArr = [];
    if(this.state.currText == ''){
        filterArr = [...this.state.movies]
    }
    else{
        filterArr=this.state.movies.filter((movieObj)=>{
            let title = movieObj.original_title.toLowerCase();
            return title.includes(this.state.currText.toLowerCase());
        })
    }

    if(this.state.currgen!='All Genres'){
        filterArr =  this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currgen)
    }

    let pages = Math.ceil(filterArr.length/this.state.limit);
    let pagesArr = [];
    for (let i = 1; i <= pages; i++) {
        pagesArr.push(i);
    }
    let si = (this.state.currPage-1)*this.state.limit;
    let ei = si+this.state.limit;
    filterArr=filterArr.slice(si,ei);
    
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
                    <input type="text" className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}></input>
                    <input type="number" className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
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
                                    <td> <button type="button" class="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Delete</button></td>
                                </tr>
                            ))}
                    </tbody>
                 </table>
                 <nav aria-label="Page navigation example">
                    <ul class="pagination">
                        {
                            pagesArr.map((pageNo)=>(
                                <li class="page-item"><a class="page-link" onClick={()=>this.handlePageChange(pageNo)}>{pageNo}</a></li>
                            ))
                        }
                        
                    </ul>
                </nav>
            </div>
        </div>
      </div>
      </>
    )
  }
}
