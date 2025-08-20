import { useState, useEffect } from "react";
import axios from "axios";
import AddUserForm from "./components/AddUserForm";
import UserList from "./components/UserList";
import "./App.css";

function App() {
	const [users, setUsers] = useState([]);

	// Fetch users from the backend
	useEffect(() => {
		axios
			.get("http://localhost:3000/api/users")
			.then((response) => setUsers(response.data))
			.catch((error) => console.error("Error fetching users:", error));
	}, []);

	// Add a new user
	const addUser = (user) => {
		axios
			.post("http://localhost:3000/api/users", user)
			.then((response) => {
				if (response.data && response.data.id) {
					setUsers([...users, response.data]); // Add the new user to the list
				} else {
					console.error("Invalid response from the server:", response.data);
				}
			})
			.catch((error) => console.error("Error adding user:", error));
	};

	// Delete a user
	const deleteUser = (id) => {
		axios
			.delete(`http://localhost:3000/api/users/${id}`)
			.then(() => setUsers(users.filter((user) => user.id !== id)))
			.catch((error) => console.error("Error deleting user:", error));
	};

	return (
		<div className="App container mx-auto p-4">
			<h1 className="text-2xl font-bold text-center mb-4">User Management</h1>
			<AddUserForm addUser={addUser} />
			<UserList users={users} deleteUser={deleteUser} />
		</div>
	);
}

export default App;
