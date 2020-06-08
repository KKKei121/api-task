import React from 'react'
import './searchbar.css'
import './App.css'

class Search extends Component {
  state={
    filter: "",
    articles: [],
  };

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    this.setState({articles: this.prop.articles});
    const { filter, articles } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = articles.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toLowerCase().includes(lowercasedFilter)
      );
    });

    return (
      <div>
        <input value={filter} onChange={this.handleChange} />
      
        <div className="row">
        {filteredData.map((item, index)=>{
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
      </div>)
  
})}
    </div>
    </div>);
  }

}

export default Search;

