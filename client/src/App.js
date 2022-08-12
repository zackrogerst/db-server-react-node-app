import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [input, setInput] = useState("");
	const [serverInfo, setServerInfo] = useState([]);

	function handleInput(e) {
		setInput(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();

		axios
			.post("http://localhost:3035/api/info", {
				text: input
			})
			.then(res => {
				setServerInfo(res.data);
			})
			.catch(err => {
				console.log(err);
			});

		console.log(input);
		setInput("");
	}

	useEffect(() => {
		axios
			.get("http://localhost:3035/api/info")
			.then(res => {
				console.log("RES", res.data);
				setServerInfo(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}, [input]);

	function handleComponents() {
		return serverInfo.map((item, index) => {
			return (
				<div key={index}>
					<h1>{item.text}</h1>
				</div>
			);
		});
	}

	return (
		<div className="App App-header">
			<form onSubmit={handleSubmit}>
				<input onChange={handleInput} value={input}></input>
				<button type="submit">Submit</button>
			</form>
			<br />

			{handleComponents()}

			<br />
		</div>
	);
}

export default App;
