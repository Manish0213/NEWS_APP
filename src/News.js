import React, { useEffect, useState } from "react";

const News = ({category}) => {
    const API_KEY = '227b2c5bedb44060bd9bd76fd99efcd7'
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const fetchNews = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&pageSize=10&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setNews(data.articles);
        setTotalResults(data.totalResults);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };
  
    const handlePrevClick = () => {
      if (page > 1) {
        setPage(page - 1);
      }
    };
  
    const handleNextClick = () => {
      if (page < Math.ceil(totalResults / 10)) {
        setPage(page + 1);
      }
    };
  
    useEffect(() => {
      fetchNews();
    }, [category, page]);

  return (
   <>
   {loading && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-striped progress-bar-animated"
            role="progressbar"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ width: "100%" }}
          ></div>
        </div>
      )}
      <div className="row mx-2 my-3">
        {news.map((article, index) => (
          <div className="col-md-3 my-3" key={index}>
            <div className="card" style={{ width: "19rem" }}>
              <img src={article.urlToImage || "https://via.placeholder.com/150"} className="card-img-top" alt="Article" width="300" height="200" />
              <div className="card-body">
                <h5 className="card-title">{article.title && article.title.split(' ').slice(0, 10).join(' ')}</h5>
                <p className="card-text">{article.description && article.description.split(' ').slice(0, 10).join(' ')}</p>
                <a href={article.url} className="btn btn-dark" target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between mx-4 my-3">
      <button type="button" className="btn btn-dark" onClick={handlePrevClick} disabled={page === 1}>Prev</button>
        <button type="button" className="btn btn-dark" onClick={handleNextClick} disabled={page >= Math.ceil(totalResults / 10)}>Next</button>
      </div>
      </>
  );
};

export default News;