import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import {GlobalState} from "../Types/types.ts";

const useGlobalStore = create<GlobalState>()(
	devtools(
		persist(
			(set) => ({
				articles: [],
				getArticles: async () => {
					const res = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=96a46b134f1e4778a720d8c250533224');
					const data = await res.json();
					set({ articles: data.articles });
				}
			}),
			{ name: 'bearStore' },
		),
	),
)

export default useGlobalStore;