import { format } from "date-fns";
import { Article } from "../Types/types.ts";

interface NewsListProps {
	article: Article;
}

function NewsItem(props: NewsListProps) {
	const { article } = props;

	return (
		<div className="flex flex-col mb-5 cursor-pointer group hover:opacity-90 transition duration-200 article-list-item">
			<span className="mb-1 text-sm text-red-400 whitespace-nowrap">{article.source.name}</span>

			<div className="article-image">
				<img src={article.urlToImage} alt=""/>
			</div>

			<h3 className="mt-2 mb-2 text-l font-bold group-hover:text-red-400 transition duration-200">{article.title}</h3>

			<span
				className="text-sm text-slate-500 whitespace-nowrap">{format(article.publishedAt, 'dd MMM yyyy')}</span>
		</div>
	)
}

export default NewsItem;