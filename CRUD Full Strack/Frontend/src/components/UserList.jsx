import { useState } from "react";

function UserList({ users, deleteUser }) {
	const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user

	return (
		<div className="p-4 border rounded shadow">
			<h2 className="text-xl font-semibold mb-2">User List</h2>
			<ul>
				{users.map((user) => (
					<li
						key={user.id}
						className="flex justify-between items-center mb-2 p-2 border-b cursor-pointer"
						onClick={() => setSelectedUser(user)} // Set the selected user on click
					>
						<div>
							<strong>{user.name}</strong> ({user.email}, {user.age} years old)
						</div>
						<button
							onClick={(e) => {
								e.stopPropagation(); // Prevent triggering the parent onClick
								deleteUser(user.id);
							}}
							className="bg-red-500 text-white px-2 py-1 rounded"
						>
							Delete
						</button>
					</li>
				))}
			</ul>

			{/* Display selected user details */}
			{selectedUser && (
				<div className="mt-4 p-4 border rounded shadow bg-gray-100">
					<h3 className="text-lg font-semibold">Selected User Details</h3>
					<p>
						<strong>Name:</strong> {selectedUser.name}
					</p>
					<p>
						<strong>Email:</strong> {selectedUser.email}
					</p>
					<p>
						<strong>Age:</strong> {selectedUser.age}
					</p>
				</div>
			)}
		</div>
	);
}

export default UserList;
