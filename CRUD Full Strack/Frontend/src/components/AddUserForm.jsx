import { useState } from "react";

function AddUserForm({ addUser }) {
	const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });

	const handleSubmit = (e) => {
		e.preventDefault();
		addUser(newUser);
		setNewUser({ name: "", email: "", age: "" });
	};

	return (
		<form onSubmit={handleSubmit} className="mb-4 p-4 border rounded shadow">
			<h2 className="text-xl font-semibold mb-2">Add New User</h2>
			<div className="mb-2">
				<input
					type="text"
					placeholder="Name"
					value={newUser.name}
					onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<div className="mb-2">
				<input
					type="email"
					placeholder="Email"
					value={newUser.email}
					onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<div className="mb-2">
				<input
					type="number"
					placeholder="Age"
					value={newUser.age}
					onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
					className="w-full p-2 border rounded"
					required
				/>
			</div>
			<button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
				Add User
			</button>
		</form>
	);
}

export default AddUserForm;
