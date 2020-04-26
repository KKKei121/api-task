import {Component} from 'react';
import axios from 'axios';
 
class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentWillMount() {
    axios.get('https://newsapi.org/v2/everything?sources=the-washington-post&pageSize=100&apiKey=24dc597ec27f40729ac17a7231403638')
      .then(({data})=>{
        this.setState({
          data: data.articles
        })
      });
  }

  render() {
    return (
		this.state.data
    );
  }
}
export default News;
