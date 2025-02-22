import { Article } from "../Types/types.ts";

type ApiResponse = {
	articles: Article[];
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

const buildParams = (keyWords: string[], country: string, categories: string, sources: string): URLSearchParams => {
	const params = new URLSearchParams();

	if (keyWords.length > 0) params.append("q", keyWords.join(","));
	if (categories) params.append("category", categories);
	if (country) params.append("country", country);
	if (sources) params.append("sources", sources);

	return params;
};

const fetchNews = async (
	apiConfig: ApiConfig,
	keyWords: string[],
	country: string,
	categories: string,
	sources: string
): Promise<Article[] | void> => {
	try {
		const params = buildParams(keyWords, country, categories, sources);

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
		return result.articles || [];
	} catch (error) {
		console.error("Fetch News Error:", error);
	}
};

export const getNewsApi = (keyWords: string[] = [], country: string = "us", categories: string = "", sources: string = "") =>
	fetchNews(API_CONFIG.newsapi, keyWords, country, categories, sources);

export const getDataHubApi = (keyWords: string[] = [], country: string, categories: string = "", sources: string = "") =>
	fetchNews(API_CONFIG.datahub, keyWords, country, categories, sources);

export const getTheNewsApi = (keyWords: string[] = [], country: string, categories: string = "", sources: string = "") =>
	fetchNews(API_CONFIG.thenewsapi, keyWords, country, categories, sources);