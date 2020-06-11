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
		if (this.state.hasMoreItems){
			if(this.state.filter!=null)
				this.setState({filter: this.state.filter.toLowerCase()});
			this.fetchNews();
		}
			
	}

	fetchNews=()=>{
		axios.get('https://newsapi.org/v2/everything?q='+this.state.filter+'sources=the-washington-post&pageSize=10&page='+this.state.page+'&apiKey=24dc597ec27f40729ac17a7231403638')
		.then((response) =>{
			this.setState({
				articles: this.state.articles.concat(response.data.articles)
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
		this.setState({ filter: event.target.value });
	};
  
	render(){
		console.log(this.state);
		const loader = <div className="loader">Loading ...</div>;
		return (
			
			<div className="App">
				<div className="header">
					<h2> US News </h2>
					<input value={this.state.filter} onChange={this.handleChange} />
				</div>

				
				<InfiniteScroll
                pageStart={0}
                loadMore={this.componentDidMount}
				hasMore={this.state.hasMoreItems}
                loader={loader}>

				<div className="row">
				{this.state.articles.map((item, index)=>{
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