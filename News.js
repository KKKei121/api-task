import axios from 'axios';
 
export function News (x){
  var news= [];
  axios.get('https://newsapi.org/v2/everything?sources=the-washington-post&pageSize=10&page='+x+'&apiKey=24dc597ec27f40729ac17a7231403638')
      .then(({data})=>{
          news= data.articles;
        })
  return news;
}
