import React from "react";
import useGlobalStore from '../Store';

function FilterBox(){
	const categories = useGlobalStore().categories;
	const { currentFilter, setFilter } = useGlobalStore();

	const handleChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter({
			...currentFilter,
			category: event.target.value
		});
	}

	const handleChangeDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		const days = value === "yesterday" ? 1
			: value === "week" ? 7
				: value === "month" ? 30 : 0;
		const now = new Date();
		const yesterday = new Date(now);
		yesterday.setDate(now.getDate() - days);
		const timestamp = yesterday.getTime();

		setFilter({
			...currentFilter,
			date: timestamp,
		});
	}

	return (
		<div className="flex place-content-start space-x-2">
			<select defaultValue="Category" className="select select-xs w-fit" onChange={(e) => handleChangeCategory(e)}>
				<option value="Category" disabled>Category</option>

				{categories?.map((category, index) => <option key={`select-${category}-${index}`} value={category.toLowerCase()}>{category}</option>)}
			</select>

			<select defaultValue="Today" className="select select-xs w-fit" onChange={(e) => handleChangeDate(e)}>
				<option value="Today" disabled>Today</option>
				<option>Yesterday</option>
				<option>1 Week Ago</option>
				<option>Previous</option>
			</select>

			<select defaultValue="Source" className="select select-xs w-fit">
				<option value="Source" disabled>Source</option>
				<option>BBC News</option>
				<option>The Verge</option>
				<option>Bloomberg</option>
			</select>
		</div>
	)
}

export default FilterBox;