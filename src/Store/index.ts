import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { GlobalState } from "../Types/types.ts";
import { getAllArticles } from "../api";

const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				articles: [],
				userSettings: {
					sources: [],
					categories: "",
				},

				getArticles: async () => {
					const articles = await getAllArticles();
					set({ articles: articles });
				},

				searchArticles: async (keyWords: string[]): Promise<void> => {
					const articles = await getAllArticles(keyWords);
					set({ articles: articles });
				},

				filterArticles: async () => {},
			}),
			{ name: 'bearStore' },
		),
	),
)

export default useGlobalStore;