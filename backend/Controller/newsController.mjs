// backend/Controller/newsController.mjs
import NodeCache from "node-cache";
import dotenv from "dotenv";
import NewsAPI from "newsapi";

dotenv.config();

const cache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes (600 seconds)
const newsapi = new NewsAPI(process.env.API_KEY); // Initialize NewsAPI with API key

export const getNews = async (req, res) => {
  const cacheKey = "top-headlines";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    console.log("Returning cached data");
    return res.status(200).json(cachedData);
  }

  try {
    const response = await newsapi.v2.topHeadlines({
      country: "in",
      pageSize: 5,
    });

    cache.set(cacheKey, response.articles);
    console.log("Fetched and cached new data");
    res.status(200).json(response.articles);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news headlines" });
  }
};
