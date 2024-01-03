import axios from "axios";

const fetcher = async (url: string) => {
  const res = await axios.get(url,{
    params: {
        count: '10',
        cursor: '0'
      },
      headers: {
        'X-RapidAPI-Key': '0bc12f896dmsha7aa00e7fbc6f96p1bbdb4jsn078219290364',
        'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
      }
  });
  res.data;
};

export default fetcher;