"use client";

import { useRef, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Home() {
  const [input, setInput] = useState("");
  const [toast, setToast] = useState("");
  const [tasks, setTasks] = useState<{ text: string; completed: boolean }[]>(
    [],
  );
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const toastTimer = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    // ❌ instantly close previous toast
    setToast("");

    // ❌ clear previous timer
    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    // ✅ small delay ensures UI resets properly before new toast
    setTimeout(() => {
      setToast(message);

      toastTimer.current = setTimeout(() => {
        setToast("");
        toastTimer.current = null;
      }, 3000);
    }, 0);
  };

  const handleSubmit = () => {
    if (!input.trim()) {
      showToast("plese enter a text");
      return;
    }

    if (editIndex !== null) {
      setTasks((prev) =>
        prev.map((task, i) =>
          i === editIndex ? { ...task, text: input } : task,
        ),
      );

      setEditIndex(null);
      setInput("");
      showToast("Task updated successfully");
      return;
    }

    setTasks((prev) => [{ text: input, completed: false }, ...prev]);

    console.log(input);
    setInput("");
    showToast("Task added successfully");
  };

  const deleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
    showToast("Task Deleted");
  };

  const startEdit = (index: number, task: string) => {
    setEditIndex(index);
    setInput(task);
  };

  const pendingTasks = tasks.filter((task) => !task.completed);

  const completedTasks = tasks.filter((task) => task.completed);

  const chartData = [
    {
      name: "Completed",
      value: completedTasks.length,
    },
    {
      name: "Pending",
      value: pendingTasks.length,
    },
  ];

  const COLORS = ["#22c55e", "#eab308"];

  const deleteAllPending = () => {
    setTasks((prev) => prev.filter((task) => task.completed));
    showToast("All pending tasks deleted");
  };

  const deleteAllCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
    showToast("All completed tasks deleted");
  };

  return (
    <div>
      <h1 className="project-title"> Welcome to task magenement </h1>

      <div className="flex justify-center mt-10 gap-6">
        <input
          type="text"
          placeholder="Enter Task.."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          className="w-60 px-3 py-2 rounded-xl bg-slate-800 text-white border border-slate-600 
               focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 
               transition rounded-xl font-medium"
        >
          Submit
        </button>
      </div>

      <div className="flex justify-center gap-10 mt-10">
        {/* Pending Tasks */}
        <div className="w-96 bg-slate-900 p-4 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-yellow-400">Pending Tasks</h2>

            <button
              onClick={deleteAllPending}
              className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Delete All
            </button>
          </div>

          {tasks.map(
            (task, index) =>
              !task.completed && (
                <div
                  key={index}
                  draggable
                  onDragStart={() => {
                    setDragIndex(index);
                    document.body.style.cursor = "grabbing";
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={() => {
                    document.body.style.cursor = "default";

                    if (dragIndex === null) return;

                    const updatedTasks = [...tasks];

                    const draggedItem = updatedTasks[dragIndex];

                    updatedTasks.splice(dragIndex, 1);

                    updatedTasks.splice(index, 0, draggedItem);

                    setTasks(updatedTasks);
                    setDragIndex(null);
                  }}
                  className={`
              flex justify-between items-center
              p-2 mt-2 rounded-2xl
              cursor-grab active:cursor-grabbing
              transition-all duration-300 ease-in-out
              hover:scale-[1.02]
              active:scale-95
              shadow-md hover:shadow-xl

              ${
                dragIndex === index
                  ? "bg-blue-700 scale-105 opacity-70 ring-2 ring-blue-400"
                  : "bg-slate-800 hover:bg-slate-700"
              }
            `}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        setTasks((prev) =>
                          prev.map((t, i) =>
                            i === index ? { ...t, completed: !t.completed } : t,
                          ),
                        );
                      }}
                    />

                    <span>{task.text}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => startEdit(index, task.text)}
                      className="text-blue-400 hover:text-blue-600 text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(index)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ),
          )}
        </div>

        {/* Completed Tasks */}
        <div
          className="w-96 bg-slate-900 p-4 rounded-2xl shadow-xl"
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={() => {
            document.body.style.cursor = "default";

            if (dragIndex === null) return;

            setTasks((prev) =>
              prev.map((task, i) =>
                i === dragIndex ? { ...task, completed: true } : task,
              ),
            );

            setDragIndex(null);
          }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-green-400">
              Completed Tasks
            </h2>

            <button
              onClick={deleteAllCompleted}
              className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 rounded-lg"
            >
              Delete All
            </button>
          </div>

          {tasks.map(
            (task, index) =>
              task.completed && (
                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-800 p-2 mt-2 rounded-2xl"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        setTasks((prev) =>
                          prev.map((t, i) =>
                            i === index ? { ...t, completed: !t.completed } : t,
                          ),
                        );
                      }}
                    />

                    <span className="line-through text-gray-400">
                      {task.text}
                    </span>
                  </div>

                  <button
                    onClick={() => deleteTask(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ),
          )}
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
