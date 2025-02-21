import { useEffect, useState } from "react";
import { Article } from "../Types/types.ts";
import NewsItem from "./NewsItem.tsx";

function NewsList() {
	const [articles, setArticles] = useState<Article[]>([]);

	useEffect(() => {
		fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=96a46b134f1e4778a720d8c250533224')
			.then(res => {
				console.log(res);
				res.json()
					.then(result => {
						console.log(result);
						setArticles(result.articles);
					});
			});
	}, []);

	const newsList = () => {
		if (articles?.length > 0) {
			return articles.map((article: Article, index: number) => {
				return (
					<NewsItem
						key={`article-${article.source.id}-${index}`}
						article={article}
					/>
				)
			})
		} else {
			return (
				<>
					{
						[... new Array(12)].map(() => {
							return (
								<div className="flex w-52 flex-col gap-4">
									<div className="skeleton h-32 w-full"></div>
									<div className="skeleton h-4 w-28"></div>
									<div className="skeleton h-4 w-full"></div>
									<div className="skeleton h-4 w-full"></div>
								</div>
							)
						})
					}
				</>
			)
		}
	}

	return (
		<div className="text-left grid grid-cols-3 gap-4 articles-list">
			{newsList()}
		</div>
	)
}

export default NewsList;