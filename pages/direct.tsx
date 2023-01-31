import type { NextPage } from "next";
import { Socket } from "socket.io-client";
import { useCtx } from "../contexts/AuthContext";
import { io } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
const Direct: NextPage = () => {
	const authedUser = useCtx();
	const [msgFromServer, setMsgFromServer] = useState("");

	const [token, setToken] = useState("");
	console.log("authed user", authedUser);
	const socket = useRef<Socket>();

	// useEffect(() => {
	// 	const token = localStorage.getItem("token");
	// 	if (token) setToken(token);
	// 	socket.current = io("http://localhost:4002", {
	// 		extraHeaders: {
	// 			authorization: `Bearere ${token}`,
	// 		},
	// 	});
	// 	socket.current?.on("connect", () => {
	// 		console.log("CONNECT TO SOCKER");
	// 	});
	// 	socket.current?.on("disconnect", () => {
	// 		console.log("disconnected");
	// 	});
	// 	socket?.current.on("first", (m) => {
	// 		setMsgFromServer(m);
	// 	});
	// 	socket.current.on("message", (msg) => {
	// 		setMsgFromServer(msg);
	// 	});

	// 	return () => {
	// 		console.log("cleaning up");
	// 		socket.current?.off("first");
	// 		socket.current?.off("message");
	// 		socket.current?.off("connect");
	// 		socket.current?.off("disconnect");
	// 	};
	// }, []);

	function handleSend(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const target = e.target as typeof e.target & {
			message: { value: string };
		};
		if (socket) {
			socket.current?.emit("message", target.message.value);
			target.message.value = "";
		}
	}
	return (
		<div>
			<h1>Direct messages</h1>
			<p>{msgFromServer}</p>
			<form onSubmit={handleSend}>
				<label htmlFor='msg'>Message</label>
				<input
					type='text'
					id='msg'
					name='message'
					placeholder='your message...'
				/>
				<button type='submit'>send</button>
			</form>
		</div>
	);
};

export default Direct;
