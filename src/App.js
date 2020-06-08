import React, {Component} from 'react';
import './App.css';
import InfiniteScroll from 'react-infinite-scroller';
import {News} from './News.js';
import {Search} from './searchbar.js'


class App extends Component {
	constructor(props){
		super(props);
		this.state={
			articles:[],
			hasMoreItems: true,
			page:1,
			filter:""
		};
  }
	componentDidMount(){
		this.setState({
			articles: this.state.articles.concat(News(this.state.page,this.state.filter))
		});
		console.log(News(this.state.page,this,state,filter));
		if(this.state.page<10) {
			this.setState({
				page: this.state.page+1
			});
		} else {
			this.setState({
				hasMoreItems: false
			})};

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
					<input value={filter} onChange={this.handleChange} />
				</div>

				
				<InfiniteScroll
                pageStart={0}
                loadMore={this.componentDidMount}
				hasMore={this.state.hasMoreItems}
                loader={loader}>

				<div className="row">
				{this.state.articles.map((item, index)=>{
					return(
						<div>
							
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
						</div>)
					
				})}
			</div>	
				</InfiniteScroll>
				
			</div>
		);
	}
}
export default App;