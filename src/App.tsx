import {useState, useEffect} from 'react'
import './App.css'
import { format } from 'date-fns';

interface Article {
    title: string,
    description: string,
    author: string,
    content: string,
    publishedAt: string,
    source: {
        id: string,
        name: string,
    },
    url: string,
    urlToImage: string,
}

function App() {
	const [articles, setArticles] = useState<Article[]>([]);

	useEffect(() => {
		fetch('https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=96a46b134f1e4778a720d8c250533224')
			.then(res => {
				res.json()
					.then(result => {
						setArticles(result.articles);
					});
			});
	}, []);

    useEffect(() => {
        console.log(articles);
    }, [articles]);

    const newsList = () => {
        if (articles.length > 0) {
            return articles.map((article: Article, index: number) => {
                return (
                    <div className="flex flex-col mb-10 cursor-pointer group hover:opacity-90 transition duration-200 article-list-item" key={`article-${article.source.id}-${index}`}>
						<span className="mb-1 text-sm text-red-400 whitespace-nowrap">{article.source.name}</span>

						<div className="article-image">
							<img src={article.urlToImage} alt=""/>
						</div>

						<h3 className="mt-2 mb-2 text-l font-bold group-hover:text-red-400 transition duration-200">{article.title}</h3>

						<span className="text-sm text-slate-500 whitespace-nowrap">{format(article.publishedAt, 'dd MMM yyyy')}</span>
                    </div>
                )
            })
        } else {
            return (
                <div>
                    Empty feed
                </div>
            )
        }
    }

	return (
		<div className="container max-w-2xl text-left grid grid-cols-3 gap-4 articles-list">
            {newsList()}
		</div>
	)
}

export default App
