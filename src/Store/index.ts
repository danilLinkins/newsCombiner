import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { GlobalState } from "../Types/types.ts";
import {getDataHubApi, getNewsApi, getTheNewsApi} from "../api";

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
					const result = await getNewsApi();
					const result2 = await getDataHubApi();
					const result3 = await getTheNewsApi();
					set({ articles: [ ...result || [], ...result2 || [], ...result3 || []] });
				},

				searchArticles: async (searchString: string) => {
					const keyWords = searchString.split(' ');

					const result = await getNewsApi(keyWords);
					set({ articles: result });
				},

				filterArticles: async () => {},
			}),
			{ name: 'bearStore' },
		),
	),
)

export default useGlobalStore;