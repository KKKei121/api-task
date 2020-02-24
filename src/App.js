import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props){
		super(props);
		this.state={
			articles:[]
		};
  }
	componentDidMount(){
		fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=24dc597ec27f40729ac17a7231403638')
		.then((response) =>{
			return response.json();
		})
		.then((myJson) => {
			//console.log(myJson);
			this.setState({
				articles: myJson.articles
			});
		});	
	}
  
	render(){
		console.log(this.state);
		return (
			
			<div className="App">
				<div className="header">
					<h2> US News </h2>
				</div>
				<div className="row">
				{this.state.articles.map((item, index)=>{
					return(
						
						<div className="content" key={index}>
							
							<div>
								<h3>
									<a href={item.url} target="_blank">
										{item.title}
									</a>
								</h3>
								<p>{item.publishedAt}</p>
								
								<img src={item.urlToImage}/>

								<p>{item.description} </p>
							</div>
						</div>
					
					)
					
				})}
				</div>	
			</div>
		);
	}
}
export default App;
