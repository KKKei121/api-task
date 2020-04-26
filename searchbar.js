import React from 'react'
import axios from 'axios';
import './searchbar.css'

function Search() {
  const dataList =  axios.get('https://newsapi.org/v2/everything?sources=the-washington-post&pageSize=100&apiKey=24dc597ec27f40729ac17a7231403638')
  .then(({data})=>{
    return data.json});
 
    const dataList=this.state.articles;
		const [searchText, setSearchText] = useState("");
  		const [data, setData] = useState(dataList);

  // exclude column list from filter
  		const excludeColumns = ["source", "author","url","urlToImage","publishedAt","content"];

  // handle change event of search input
  		const handleChange = value => {
   		 setSearchText(value);
   		 filterData(value);
 		 };

  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(dataList);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }

  return (
    <div className="App">
      <div className="row">
				{data.map((item, index)=>{
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
				<div className="clearboth"></div>
    </div>
  );

}

