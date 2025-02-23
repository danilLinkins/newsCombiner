import { format } from "date-fns";
import { Article } from "../Types/types.ts";

interface NewsListProps {
	article: Article;
}

function NewsItem(props: NewsListProps) {
	const { article } = props;

	return (
		<div className="flex flex-col mb-5 cursor-pointer group hover:opacity-90 transition duration-200 article-list-item">
			<span className="mb-1 text-sm text-red-400 whitespace-nowrap">{article.source}</span>

			<div className="article-image">
				<img src={article.imageUrl} alt=""/>
			</div>

			<h3 className="mt-2 mb-2 overflow-hidden line-clamp-3 text-l font-bold group-hover:text-red-400 transition duration-200">{article.title}</h3>

			{
				!article.imageUrl ? (
					<p className="mb-3 overflow-hidden line-clamp-4">{article.description}</p>
				) : null
			}

			<span
				className="text-sm text-slate-500 whitespace-nowrap">{format(article.publishedAt, 'dd MMM yyyy')}</span>
		</div>
	)
}

export default NewsItem;