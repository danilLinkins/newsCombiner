import './App.css'
import NewsList from "./Components/NewsList.tsx";
import SearchBox from "./Components/SearchBox.tsx";

function App() {
	return (
		<div className="flex justify-items-center bg-base-200 w-full">
			<div className="container m-auto mt-5 bg-base-200 max-w-5xl text-base-content">
				<SearchBox/>
				<NewsList/>
			</div>
		</div>
	)
}

export default App
