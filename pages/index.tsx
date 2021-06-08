import React, { useEffect, useState } from 'react';
import uuid from 'uuid-random';
import { Task, Tasks } from "../interfaces/interfaces"

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

  const handleCheckBoxEvent = (taskId) => (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`taskId: ${taskId}`);
    console.log(`check pressed ${event.target.value}`);
    const newTasks = tasks.map(task => task.id === taskId ? {...task, completed: true} : task)
    setTasks(newTasks);
  }

  const listItems = tasks.filter(task => !task.completed)
    .map((task) => {
      return (
        <div>
          <input id="task" type="checkbox" checked={task.completed} onChange={handleCheckBoxEvent(task.id)}></input>
          <label htmlFor="task" key={task.id}>{task.name}</label>
        </div>
      )
    });

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
      {listItems}
    </div>
  )
};

export default Home;
