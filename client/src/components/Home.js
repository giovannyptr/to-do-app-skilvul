import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getTasks, addTask, editTask, deleteTask,
    getActiveTasks, getCompletTasks, editStatus
} from "../store/actions.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

import './home.css'

function Home() {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.taskReducer.tasks);

    const [task, setTask] = useState("");
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    const handleAdd = async () => {
        await dispatch(addTask({ title: task }));
        dispatch(getTasks());
        setTask("");
    };

    const startEditing = (id, title) => {
        setEditingTaskId(id);
        setEditingTaskText(title);
    };

    const handleEditSave = async (id) => {
        if (editingTaskText.trim()) {
            await dispatch(editTask({ title: editingTaskText }, id));
            dispatch(getTasks());
            setEditingTaskId(null);
            setEditingTaskText('');
        }
    };

    const handleStatusChange = (id, currentStatus) => {
        const newStatus = currentStatus === "completed" ? "active" : "completed";
        dispatch(editStatus({ status: newStatus }, id));
        dispatch(getTasks());
    };

	return (
        <div className="justify-content-center">
            <h1>What's the plan for today?</h1>
            <input
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a task"
            />
            <button className="button-task" onClick={handleAdd}>Add</button>
            <div className="task-filter-buttons">
                <button onClick={() => dispatch(getTasks())}>All Tasks</button>
                <button onClick={() => dispatch(getActiveTasks())}>Active Tasks</button>
                <button onClick={() => dispatch(getCompletTasks())}>Completed Tasks</button>
            </div>
            <ul>
                {tasks.map((t) => (
                    <li key={t.id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={t.status === "completed"}
                                onChange={() => handleStatusChange(t.id, t.status)}
                            />
                            {editingTaskId === t.id ? (
                                <>
                                    <input
                                        value={editingTaskText}
                                        onChange={(e) => setEditingTaskText(e.target.value)}
                                    />
                                    <button onClick={() => handleEditSave(t.id)}>
                                        <FontAwesomeIcon icon={faCheck} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className={t.status === "completed" ? "completed-task" : ""}>
                                        {t.title}
                                    </span>
                                    <button className="icon-button" onClick={() => startEditing(t.id, t.title)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                </>
                            )}
                        </label>
                        <button className="icon-button" onClick={() => dispatch(deleteTask(t.id))}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;
