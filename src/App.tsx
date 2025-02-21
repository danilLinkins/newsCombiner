import './App.css'
import NewsList from "./Components/NewsList.tsx";
import SearchBox from "./Components/SearchBox.tsx";

function App() {
	return (
		<div className="container w-full max-w-2xl">
			<SearchBox/>
			<NewsList/>
		</div>
	)
}

export default App
