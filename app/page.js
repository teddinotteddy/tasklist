"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useCookies } from "next-client-cookies";

export default function Home() {
  const cookies = useCookies()


  const [input, setInput] = useState("")
  const [tasks, setTasks] = useState(cookies.get("tasks")?.split(",") || []);

  useEffect(() => {
    let cookieValue = cookies.get("tasks");
    if (!cookieValue) {
      setTasks([]);
    } else {
      setTasks(cookieValue.split(","));
    }
  }, [cookies.get("tasks")]);

  const addTask = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const task = formData.get("task")

    setInput("")
    const updatedTasks = [...tasks, task];
    cookies.set('tasks', updatedTasks.join(","));
  }

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    cookies.set('tasks', updatedTasks.join(","));
  }

  return (
      <main className="text-center p-4">
        <h1 className="text-4xl">Tasklist</h1>
        <Separator className="my-4" />
        <div className="flex justify-center items-center flex-col">
          <form className="flex w-full max-w-sm items-center space-x-2 justify-center" onSubmit={addTask}>
            <Input
              type="text"
              name="task"
              placeholder="Enter a task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button
              type="submit"
              variant="outline"
              size="icon"
              >
              <Plus className="h-4 w-4" />
            </Button>
          </form>
          <div className="flex w-full max-w-sm flex-col items-center">
            {tasks.map((task, index) => (
              <div className="w-full my-2 flex items-center justify-center" key={index}>
                <Checkbox id={`task-${index}`} onClick={() => removeTask(index)} />
                <label className="p-4">{task}</label>
              </div>
              ))}
          </div>
        </div>
      </main>
    );
}
