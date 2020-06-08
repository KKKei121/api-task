import axios from 'axios';
 
export function News (x,filter){
  var news= [];
  var URL = 'https://newsapi.org/v2/everything?';
  if (filter==null)
{
    URL=URL+'sources=the-washington-post&pageSize=10&page='+x+'&apiKey=24dc597ec27f40729ac17a7231403638';
}
else{
  URL=URL+'q='+filter+'sources=the-washington-post&pageSize=10&page='+x+'&apiKey=24dc597ec27f40729ac17a7231403638';
}
  axios.get(URL)
      .then(({data})=>{
          news= data.articles;
        })
  return news;
}




