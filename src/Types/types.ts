export interface Article {
	id: string;
	title: string;
	source: string;
	sourceUrl?: string;
	author?: string;
	description?: string;
	url: string;
	imageUrl?: string;
	publishedAt: string;
	language?: string;
	keywords?: string[];
	categories?: string[];
	sentiment?: {
		pos: number;
		neg: number;
		neu: number;
	};
	content?: string;
}

export interface UserSettings {
	sources: string[],
	categories: '' | 'Business' | 'Entertainment' | 'General' | 'Health' | 'Science' | 'Sports' | 'Technology',
}

export interface GlobalState {
	articles: Article[];
	isLoading: boolean;
	setLoading: (status: boolean) => void;
	userSettings: UserSettings | null;
	getArticles: () => Promise<Article[] | void>;
	searchArticles: (keyWords: string[]) => Promise<void>;
	filterArticles: () => Promise<Article[] | void>;
}