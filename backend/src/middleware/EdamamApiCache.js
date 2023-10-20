import NodeCache from 'node-cache';
import axios from 'axios';
const myCache = new NodeCache({ stdTTL: 0, checkperiod: 120 });
const url = `https://api.edamam.com/api/recipes/v2/?type=public&q=pasta&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;
function getCache(req, res, next) {
  // Check if the request method is not GET
  if (req.method !== 'GET') {
    console.log('Not a GET method');
    return next();
  }

  // Generate a unique cache key based on the request URL
  const cacheKey = req.originalUrl;


  // Check if the data exists in the cache
  const cachedData = myCache.get(cacheKey);
  if ( cachedData !== undefined) {
    console.log('Cache hit');
    return res.json(cachedData); // Send cached data as a response
  } else {
    console.log('Cache miss');
  

    // If data is not in the cache, continue with the request
    const getPosts = async()=>{
      const posts = await axios(url).then(data=>data).then(data=>{
        // console.log(data)
     req.body = data.data
     myCache.set(cacheKey,req.body); 
    }); 
    }
    getPosts();
   
    return next();
  }
}
;
export default {
    getCache
};