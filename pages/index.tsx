import React, { useEffect, useState } from 'react';
import uuid from 'uuid-random';
import { Task, Tasks } from "../interfaces/interfaces"

interface TaskListProps {
  tasks: Tasks;
  onCompleted: (taskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {};
}

const TaskList = ({ tasks, onCompleted }: TaskListProps) => {
  return (
    <>
      {tasks.filter(task => !task.completed)
        .map(task => (
          <div key={task.id}>
            <input id="task" type="checkbox" checked={task.completed} onChange={onCompleted(task.id)}></input>
            <label htmlFor="task">{task.name}</label>
          </div>
        ))}
    </>)
}

const Home = () => {
  const initialState = {
    id: "",
    name: "",
    completed: false
  }

  const UUID = uuid();

  const [task, setTask] = useState<Task>(initialState);
  const [tasks, setTasks] = useState<Tasks>([]);

  useEffect(() => {
    console.log(`home component render - CURRENT TASKS: ${JSON.stringify(tasks)}`)
  }, [tasks])

  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({
      id: UUID,
      name: event.target.value,
      completed: false
    });
  }

  const handleKeyEvent = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && task.name !== "") {
      console.log(`***Enter pressed*** current task ${task.name}`)
      setTasks([...tasks, task])
      setTask(initialState);
    }
  }

  const handleCheckBoxEvent = (taskId: string) => (event: React.ChangeEvent<HTMLInputElement>): any => {
    console.log(`check box with taskId has been pressed: ${taskId}`);
    const newTasks = tasks.map(task => task.id === taskId ? { ...task, completed: true } : task)
    setTasks(newTasks);
  }

  return (
    <div>
      <h1>Task Manager</h1>

      <div>
        <label htmlFor="task">Add New Task</label>
        <input
          id="task"
          name="task"
          type="text"
          value={task.name}
          onChange={handleChangeEvent}
          onKeyPress={handleKeyEvent} />
      </div>
      <TaskList tasks={tasks} onCompleted={handleCheckBoxEvent} />
    </div>
  )
};

export default Home;
