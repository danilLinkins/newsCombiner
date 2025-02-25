import {create} from 'zustand'
import {devtools, persist} from 'zustand/middleware'
import {GlobalState, Article, Filter} from "../Types/types.ts";
import {getAllArticles} from "../api";

const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				articles: [],
				isLoading: false,
				categories: [
					"Business",
					"Entertainment",
					"General",
					"Health",
					"Science",
					"Sports",
					"Technology"
				],
				currentFilter: {
					category: undefined,
					day: undefined,
					source: undefined,
				},
				userSettings: {
					sources: [],
					categories: "",
				},

				setLoading: (status: boolean) => set({isLoading: status}),

				getArticles: async (): Promise<void> => {
					set({isLoading: true});
					const articles: Article[] = await getAllArticles();
					set((state) => ({
						articles: articles,
						isLoading: false,
						categories: [...state.categories || [], ...articles.map((article) => article.categories || "").flat()],
					}));
				},

				searchArticles: async (keyWords: string[]): Promise<void> => {
					set({isLoading: true});
					const articles = await getAllArticles(keyWords);
					set({
						articles: articles,
						isLoading: false,
					});
				},

				setFilter: (filter: Filter) => {
					set((state) => ({
						currentFilter: {
							...state.currentFilter,
							...filter,
						}
					}));
				},

				filterArticles: async () => {
				},
			}),
			{name: 'bearStore'},
		),
	),
)

export default useGlobalStore;