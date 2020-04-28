import React, {Component} from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import {News} from './News.js';


class App extends Component {
	constructor(props){
		super(props);
		this.state={
			articles:[],
			hasMoreItems: true,
			page:1
		};
  }
	componentDidMount(){
		this.setState({
			articles: this.state.articles.concat(News(this.state.page))
		});
		console.log(News(this.state.page));
		if(this.state.page<10) {
			this.setState({
				page: this.state.page+1
			});
		} else {
			this.setState({
				hasMoreItems: false
			})};

	}
  
	render(){
		console.log(this.state);
		const loader = <div className="loader">Loading ...</div>;

		return (
			
			<div className="App">
				<div className="header">
					<h2> US News </h2>
					
				</div>

				
				<InfiniteScroll
                pageStart={0}
                loadMore={this.fetchNews}
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