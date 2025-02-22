function FilterBox(){
	return (
		<div className="flex place-content-start space-x-2">
			<select defaultValue="Category" className="select select-xs w-fit">
				<option value="Category" disabled>Category</option>
				<option>Business</option>
				<option>Entertainment</option>
				<option>General</option>
				<option>Health</option>
				<option>Science</option>
				<option>Sports</option>
				<option>Technology</option>
			</select>

			<select defaultValue="Today" className="select select-xs w-fit">
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