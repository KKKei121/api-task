import axios from 'axios';
 
export async function News (x,filter){
  var news= [];
  var URL;
  var word = filter.toLowerCase();
  if (filter==null)
{
    URL='https://newsapi.org/v2/everything?sources=the-washington-post&pageSize=10&page='+x+'&apiKey=24dc597ec27f40729ac17a7231403638';
}
else{
  URL='https://newsapi.org/v2/everything?q='+word+'sources=the-washington-post&pageSize=10&page='+x+'&apiKey=24dc597ec27f40729ac17a7231403638';
}
  axios.get(URL)
      .then(({data})=>{
          news= data.articles;
        })
  console.log(news);
  return news;
}




