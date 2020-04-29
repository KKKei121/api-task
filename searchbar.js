import React from 'react'
import './searchbar.css'
import {News} from './News';

export function Search(x) {
const dataList = x;
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
  };


  
  return (data);

}

