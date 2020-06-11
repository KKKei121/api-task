import React, {Component} from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import axios from 'axios';



class App extends Component {
	constructor(props){
		super(props);
		this.state={
			articles: [],
			filter: null,
			hasMoreItems: true,
			page:1
		};
  }

	componentDidMount(){
		console.log(this.state);
		let now = this;
		if (now.state.hasMoreItems){
			var URL;
			if(now.state.filter!=null){
				URL= 'https://newsapi.org/v2/everything?q='+now.state.filter+'sources=the-washington-post&pageSize='+10*now.state.page+'&page=1&apiKey=24dc597ec27f40729ac17a7231403638'
			}
			else
				URL= 'https://newsapi.org/v2/everything?sources=the-washington-post&pageSize='+10*now.state.page+'&page=1&apiKey=24dc597ec27f40729ac17a7231403638'

			
			now.fetchNews(URL);
		}
			
	}

	fetchNews=(URL)=>{
		axios.get(URL)
		.then((response) =>{
			this.setState({
				articles: response.data.articles
			});
			console.log(response.data);
			if(this.state.page<10) {
				this.setState({
					page: this.state.page+1
				});
			} else {
				this.setState({
					hasMoreItems: false
				})};
		});
	}

	handleChange = event => {
		this.setState({ filter: event.target.value.toLowerCase() });
		axios.get('https://newsapi.org/v2/everything?q='+this.state.filter+'&sources=the-washington-post&pageSize='+10*this.state.page+'&page=1&apiKey=24dc597ec27f40729ac17a7231403638'
		).then((response) =>{
			this.setState({
				articles: response.data.articles
			})
	});}
  
	render(){
		console.log(this.state);
		const loader = <div className="loader">Loading ...</div>;
		var DISPLAY = this.state.articles;
		return (
			
			<div className="App">
				<div className="header">
					<h2> US News </h2>
					<input value={this.state.filter} onChange={this.handleChange} />
				</div>

				
				<InfiniteScroll
                pageStart={0}
                loadMore={() => {this.componentDidMount()}}
				hasMore={this.state.hasMoreItems}
                loader={loader}>

				<div className="row">
				{DISPLAY.map((item, index)=>{
					return(
						
							<div className="card" key={index}>
							<div>
								<img className="image" src={item.urlToImage}/>
								<h3 className='link'>
									<a href={item.url} target="_blank" >
										{item.title}
									</a>
								</h3>
								<p className='publishedAt'>{item.publishedAt}</p>
								<p className="description">{item.description} </p>
							</div>
							</div>
						)
					
				})}
			</div>	
				</InfiniteScroll>
				
			</div>
		);
	}
}
export default App;