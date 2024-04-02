"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus } from "lucide-react";
import { useCookies } from "next-client-cookies";

export default function Home() {
  const cookies = useCookies();

  const expires = new Date();
  expires.setDate(expires.getDate() + 30);

  const [input, setInput] = useState("");
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
    e.preventDefault();

    const formData = new FormData(e.target);
    const task = formData.get("task");

    setInput("");
    const updatedTasks = [...tasks, task];
    cookies.set("tasks", updatedTasks.join(","), { expires });
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    cookies.set("tasks", updatedTasks.join(","), { expires });
  };

  return (
    <main className="p-4 text-center">
      <h1 className="text-4xl">Tasklist</h1>
      <Separator className="my-4" />
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex w-full max-w-sm items-center justify-center space-x-2"
          onSubmit={addTask}
        >
          <Input
            type="text"
            name="task"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button type="submit" variant="outline" size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </form>
        <div className="flex w-full max-w-sm flex-col items-center">
          {tasks.map((task, index) => (
            <div
              className="my-2 flex w-full items-center justify-center"
              key={index}
            >
              <Checkbox
                id={`task-${index}`}
                onClick={() => removeTask(index)}
              />
              <label className="p-4">{task}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto">
        <Separator />
        <p className="py-2 text-xs">Made with ❤️</p>
        <div className="flex justify-center">
          <Link href="https://github.com/teddinotteddy">
            <Image src="/github.svg" width={15} height={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}
