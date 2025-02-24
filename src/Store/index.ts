import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { GlobalState, Article } from "../Types/types.ts";
import { getAllArticles } from "../api";

const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				articles: [],
				isLoading: false,
				userSettings: {
					sources: [],
					categories: "",
				},

				setLoading: (status: boolean) => set({ isLoading: status }),

				getArticles: async (): Promise<void> => {
					set({ isLoading: true });
					const articles: Article[] = await getAllArticles();
					set({ articles: articles, isLoading: false });
				},

				searchArticles: async (keyWords: string[]): Promise<void> => {
					set({ isLoading: true });
					const articles = await getAllArticles(keyWords);
					set({ articles: articles, isLoading: false });
				},

				filterArticles: async () => {},
			}),
			{ name: 'bearStore' },
		),
	),
)

export default useGlobalStore;