"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const handleClick = () => {
    setText(input);
    listTask();
  };

  const listTask = () => {
    setTasks([...tasks, input]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  return (
    <div>
      <h1 className="flex justify-center "> Task Management</h1>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Enter Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        ></input>
        <button onClick={handleClick}> Add Task</button>
      </div>
      {tasks.map((task, index) => (
        <p key={index}>{task}</p>
      ))}
    </div>
  );
}
