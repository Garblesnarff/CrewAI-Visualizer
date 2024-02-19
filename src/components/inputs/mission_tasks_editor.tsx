import { Mission } from "@/types/mission";
import { Task } from "@/types/task";
import React, { useState } from "react";
import { TESelect } from "tw-elements-react";

interface MissionTaskEditorProps {
  mission: Mission;
  onMissionChange: (updatedMission: Mission) => void;
}

const MissionTaskEditor: React.FC<MissionTaskEditorProps> = ({
  mission,
  onMissionChange,
}) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskAgent, setNewTaskAgent] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    const newTask: Task = {
      name: newTaskName,
      description: newTaskDescription,
      agent: "",
    };
    const updatedTasks = [...mission.tasks, newTask];
    const updatedMission: Mission = { ...mission, tasks: updatedTasks };
    onMissionChange(updatedMission);
    setNewTaskName("");
    setNewTaskDescription("");
  };

  const handleRemoveTask = (index: number) => {
    const updatedTasks = [...mission.tasks];
    updatedTasks.splice(index, 1);
    const updatedMission: Mission = { ...mission, tasks: updatedTasks };
    onMissionChange(updatedMission);
  };

  return (
    <div>
      <h2 className="text-lg font-bold">Mission Tasks</h2>
      {mission.tasks.map((task, index) => (
        <div key={index} className="mt-4 border-b border-gray-200 pb-4">
          <div className="flex justify-between items-center">
            <h3 className="text-md font-semibold">{task.name}</h3>
            <button
              onClick={() => handleRemoveTask(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
          <div className="text-sm text-gray-300 my-2">{task.description}</div>
          <div className="ml-3">
            <strong>Agent: </strong>
            <span className="bg-gray-200 text-gray-700 rounded-full px-3 py-1 text-sm font-semibold m-1 sm:w-1/2">
              {task.agent}
            </span>
          </div>
        </div>
      ))}
      <div role="alert" className="mt-4">
        <div className="bg-success-600 text-white font-bold rounded-t px-4 py-2">
          Add New Task:
        </div>
        <div className="border border-t-0 border-success-400 rounded-b bg-success-100 px-4 py-3 text-success-700">
          <div>
            <label>Task Name: </label>
            <input
              type="text"
              placeholder="Task Name"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              className="border border-gray-300 text-black rounded px-3 py-1"
            />
          </div>
          <div>
            <label>Task Description: </label>
            <br />
            <textarea
              placeholder="Task Description"
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="w-full border border-gray-300 text-black rounded px-3 py-1 ml-2"
            />
          </div>
          <div className="m-2">
            <label>Agent</label>
            <TESelect
              className="bg-gray-700"
              data={[
                { text: "None", value: "None" },
                ...mission.crew.map((agent) => ({
                  text: agent,
                  value: agent,
                })),
              ]}
              onValueChange={(event: any) => {
                setNewTaskAgent(event.value);
              }}
            />
          </div>
          <button
            onClick={handleAddTask}
            className="bg-success-600 text-white rounded px-4 py-1 ml-2"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionTaskEditor;