import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
	const host = "http://localhost:5151";
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handelSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		if (formData.password && formData.email) {
			signInFunction();
		} else {
			alert("Please fill all fields");
		}
	};

	const signInFunction = () => {
		let user = {
			email: formData.email,
			password: formData.password,
		};

		fetch(`${host}/user/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					alert(res.message);
				} else {
					handleSuccessfulSignin(res);
				}
			})
			.catch((err) => {
				console.log(err);
				alert(err.message);
			});
	};

	const handleSuccessfulSignin = (res) => {
		let user = res.user;
		localStorage.setItem("userInfo", JSON.stringify(user));
		localStorage.setItem("token", res.token);
		setTimeout(() => {
			navigate("/");
		}, 3000);
	};

	return (
		<div>
			<h1 className="text-3xl">Sign In</h1>
			<form className="mt-8">
				<div className="mt-3.5">
					<label htmlFor="email">Email</label>
					<br />
					<input
						type="email"
						id="email"
						name="email"
						placeholder="Enter your email address"
						value={formData.email}
						className="text-lg w-full border-0 bg-transparent outline-none custom-placeholder  border-b-2 border-black"
						onChange={handleChange}
					/>
				</div>
				<div className="mt-3.5">
					<label htmlFor="password">Password</label>
					<br />
					<input
						type={showPassword ? "text" : "password"}
						id="password"
						name="password"
						placeholder="Enter your password"
						value={formData.password}
						className="text-lg w-full border-0 bg-transparent outline-none custom-placeholder  border-b-2 border-black"
						onChange={handleChange}
					/>
				</div>
				<div className="mt-3.5">
					<input
						type="checkbox"
						onChange={() => setShowPassword(!showPassword)}
					/>
					<label className="ml-2">Show Password</label>
				</div>
				<button
					onClick={handelSubmit}
					className="bg-emerald-400 p-1 mt-3.5 px-2 rounded"
				>
					Login
				</button>
			</form>
		</div>
	);
}

export default Login;
