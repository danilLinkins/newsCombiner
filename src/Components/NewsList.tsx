import { useEffect } from "react";
import useGlobalStore from "../Store";
import { Article } from "../Types/types.ts";
import NewsItem from "./NewsItem.tsx";

function NewsList() {
	const { articles, getArticles } = useGlobalStore();
	const isLoading = useGlobalStore((state) => state.isLoading)

	useEffect(() => {
		getArticles()
			.then(() => {
				console.log('Articles loaded');
			})
			.catch((error: string) => {throw new Error(error)});
	}, []);

	const newsList = () => {
		if ((articles || []).length > 0 && !isLoading) {
			return (articles || []).map((article: Article, index: number) => {
				return (
					<NewsItem
						key={`article-${article.source}-${index}`}
						article={article}
					/>
				)
			})
		} else {
			return (
				<>
					{
						[... new Array(12)].map((el, index) => {
							return (
								<div key={`skeleton-${index}${el}`} className="flex w-full flex-col gap-4">
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
		<div className="w-full sm:w-5xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-left articles-list">
			{newsList()}
		</div>
	)
}

export default NewsList;