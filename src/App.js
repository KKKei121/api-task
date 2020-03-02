import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import { Searchbar } from 'react-native-paper';


class App extends Component {
	constructor(){
		super();
		this.state={
			articles: [],
			hasMoreItems: true,
			page:1
		};
		this.fetchData = this.fetchData.bind(this);
	  }
	
	componentDidMount(){
		this.fetchNews();
	}


	fetchNews=()=>{
		axios.get('https://newsapi.org/v2/everything?sources=the-washington-post&pageSize=10&page='+this.state.page+'&apiKey=24dc597ec27f40729ac17a7231403638')
		.then((response) =>{
			return response.json();
		})
		.then((result) => {
			this.setState({
				articles: this.state.articles.concat(result.articles)

			});
			if(this.state.page<10) {
				this.setState({
					page: this.state.page+1
				});
			} else {
				this.setState({
					hasMoreItems: false
				})}
		});	;
	} 
  
	componentWillUnmount() {
		this.serverRequest.abort();
	  }

	render(){
		console.log(this.state);
		const loader = <div className="loader">Loading ...</div>;
		var firstQuery = '';
		return (
			
			<div className="App">
				<div className="header">
					<h2> US News </h2>

					<Searchbar
        			placeholder="Search"
       				onChangeText={query => { this.setState({ firstQuery: query }); }}
       				value={firstQuery}
      				/>
				</div>
				
				
				<InfiniteScroll
                pageStart={0}
                loadMore={this.fetchNews}
				hasMore={this.state.hasMoreItems}
                loader={loader}>

            
				{this.state.articles.map((item, index)=>{
					return(
						
						<div className="news-card" key={index}>
							
							<div>
								<h3>
									<a href={item.url} target="_blank">
										{item.title}
									</a>
								</h3>
								<p>{item.publishedAt}</p>
								
								<img className="image" src={item.urlToImage}/>

								<p>{item.description} </p>
							</div>
						</div>
					
					)
					
				})}	
                
            	</InfiniteScroll>
				
				
			</div>
		);
	}
}

export default App;
