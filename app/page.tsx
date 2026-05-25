"use client";

import { useState } from "react";

export default function Home() {
  const [showInput, setShowInput] = useState(false);
  const [taskInput, setTaskInput] = useState("");

  const [ongoingTasks, setOngoingTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  // Add task
  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    setOngoingTasks([...ongoingTasks, taskInput]);
    setTaskInput("");
    setShowInput(false);
  };

  // Move task to completed
  const handleCompleteTask = (task: string) => {
    setCompletedTasks([...completedTasks, task]);

    const updatedTasks = ongoingTasks.filter((t) => t !== task);
    setOngoingTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">Task Management</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Ongoing Tasks */}
        <div className="bg-slate-800 rounded-xl p-5 shadow-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">Ongoing Tasks</h2>

            <button
              onClick={() => setShowInput(!showInput)}
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              +
            </button>
          </div>

          {/* Input Row */}
          {showInput && (
            <div className="flex gap-3 mb-5">
              <input
                type="text"
                placeholder="Enter task"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddTask();
                  }
                }}
                className="flex-1 px-3 py-2 rounded-lg text-black bg-white outline-none"
              />

              <button
                onClick={handleAddTask}
                className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          )}

          {/* Task List */}
          <div className="space-y-3">
            {ongoingTasks.map((task, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-slate-700 p-3 rounded-lg"
              >
                <input
                  type="checkbox"
                  onChange={() => handleCompleteTask(task)}
                />

                <p>{task}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-slate-800 rounded-xl p-5 shadow-lg">
          <h2 className="text-2xl font-semibold mb-5">Completed Tasks</h2>

          <div className="space-y-3">
            {completedTasks.map((task, index) => (
              <div key={index} className="bg-green-700 p-3 rounded-lg">
                <p className="line-through">{task}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
