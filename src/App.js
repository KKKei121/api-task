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
		const list = Search(this.state.articles);
		return (
			
			<div className="App">
				<div className="header">
					<h2> US News </h2>
					
				</div>

				
				<InfiniteScroll
                pageStart={0}
                loadMore={this.componentDidMount}
				hasMore={this.state.hasMoreItems}
                loader={loader}>

				<div>
					<Search articles={this.state.articles}/>
				</div>	
				</InfiniteScroll>
				
			</div>
		);
	}
}
export default App;