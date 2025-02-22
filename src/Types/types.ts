export interface Article {
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

export interface UserSettings {
	sources: string[],
	categories: '' | 'Business' | 'Entertainment' | 'General' | 'Health' | 'Science' | 'Sports' | 'Technology',
}

export interface GlobalState {
	articles: Article[] | void;
	userSettings: UserSettings | null;
	getArticles: () => Promise<Article[] | void>;
	searchArticles: (searchString: string) => Promise<Article[] | void>;
	filterArticles: () => Promise<Article[] | void>;
}