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