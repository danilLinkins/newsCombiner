import { Article } from "../Types/types.ts";

type ApiResponse = {
	articles?: Article[];
	data?: Article[];
	status?: string;
	totalResults?: number;
};

type ApiConfig = {
	baseURL: string;
	apiKey: string;
	authKey?: string;
	authHeader?: string
};

const API_CONFIG = {
	newsapi: {
		baseURL: "https://newsapi.org/v2/top-headlines",
		apiKey: import.meta.env.VITE_NEWS_API_ORG_KEY || "",
		authKey: "apiKey",
	},
	datahub: {
		baseURL: "https://api.newsdatahub.com/v1/news",
		apiKey: import.meta.env.VITE_NEWS_DATA_HUB_API || "",
		authHeader: "X-Api-Key",
	},
	thenewsapi: {
		baseURL: "https://api.thenewsapi.com/v1/news/all",
		apiKey: import.meta.env.VITE_THE_NEWS_API_COM_KEY || "",
		authKey: "api_token",
	},
};

function handleNews(rawNews: any): Article {
	return {
		id: rawNews.id || rawNews.uuid || rawNews.source?.id || crypto.randomUUID(),
		title: rawNews.title || "",
		source: rawNews.source?.name || rawNews.source_title || rawNews.source || "Unknown Source",
		sourceUrl: rawNews.source?.url || rawNews.source_link || undefined,
		author: rawNews.author || rawNews.creator || undefined,
		description: rawNews.description || rawNews.snippet || "",
		url: rawNews.url || rawNews.article_link || "",
		imageUrl: rawNews.urlToImage || rawNews.image_url || rawNews.media_url || undefined,
		publishedAt: rawNews.publishedAt || rawNews.pub_date || rawNews.published_at || new Date().toISOString(),
		language: rawNews.language || "en",
		keywords: rawNews.keywords && typeof rawNews.keywords === "string"
			? rawNews.keywords.split(",").map((kw: string) => kw.trim())
			: rawNews.keywords || [],
		categories: rawNews.categories || rawNews.topics || [],
		sentiment: rawNews.sentiment || { pos: 0, neg: 0, neu: 1 },
		content: rawNews.content || "",
	};
}

const buildParams = (keyWords: string[], country: string, lng: string, categories: string, sources: string): URLSearchParams => {
	const params = new URLSearchParams();

	if (keyWords.length > 0) params.append("q", keyWords.join(","));
	if (categories) params.append("category", categories);
	if (country) params.append("country", country);
	if (lng) params.append("language", lng);
	if (sources) params.append("sources", sources);

	return params;
};

const fetchNews = async (
	apiConfig: ApiConfig,
	keyWords: string[],
	country: string,
	lng: string,
	categories: string,
	sources: string
): Promise<Article[] | void> => {
	try {
		const params = buildParams(keyWords, country, lng, categories, sources);

		const url =
			apiConfig.authKey
				? `${apiConfig.baseURL}?${params.toString()}&${apiConfig.authKey}=${apiConfig.apiKey}`
				: `${apiConfig.baseURL}?${params.toString()}`;

		const response = await fetch(url, apiConfig.authHeader ? {
			headers: {
				"X-Api-Key": apiConfig.apiKey
			},
		} : {});

		if (!response.ok) throw new Error(`Error: ${response.statusText}`);

		const result: ApiResponse = await response.json();

		return result.articles ? result.articles.map(item => handleNews(item)) :
			result.data ? result.data.map(item => handleNews(item)) : [];
	} catch (error) {
		console.error("Fetch News Error:", error);
	}
};

export const getNewsApi = (keyWords: string[] = [], country: string = "us", lng:string = "en", categories: string = "", sources: string = "") =>
	fetchNews(API_CONFIG.newsapi, keyWords, country, lng, categories, sources);

export const getDataHubApi = (keyWords: string[] = [], country: string = "us", lng:string = "en", categories: string = "", sources: string = "") =>
	fetchNews(API_CONFIG.datahub, keyWords, country, lng, categories, sources);

export const getTheNewsApi = (keyWords: string[] = [], country: string = "us", lng:string = "en", categories: string = "", sources: string = "") =>
	fetchNews(API_CONFIG.thenewsapi, keyWords, country, lng, categories, sources);

export const getAllArticles = (keyWords: string[] = [], country: string = "us", lng: string = "en", categories: string = "", sources: string = "") => {
	const request1 = fetchNews(API_CONFIG.newsapi, keyWords, country, lng, categories, sources);
	const request2 = fetchNews(API_CONFIG.datahub, keyWords, country, lng, categories, sources);
	const request3 = fetchNews(API_CONFIG.thenewsapi, keyWords, country, lng, categories, sources);

	return Promise.all([request1, request2, request3]).then((results) => {
		return results.flat();
	});
}