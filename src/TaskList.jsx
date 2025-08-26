import { useState, useEffect } from "react";

function TaskList() {
    // localStorage.clear(); // Clear localStorage for testing purposes
    const [tasks, setTasks] = useState(localStorage.getItem("currentTasks") ? JSON.parse(localStorage.getItem("currentTasks")) : []);
    const [completedTasks, setCompletedTasks] = useState(localStorage.getItem("completedTasks") ? JSON.parse(localStorage.getItem("completedTasks")) : []);

    function addTask(event) {
        event.preventDefault();
        const taskInput = event.target.elements.taskInput;
        if (taskInput.value.trim() !== "") {
            const newTasks = [...tasks, taskInput.value];
            setTasks(newTasks);
            localStorage.setItem("currentTasks", JSON.stringify(newTasks));
        }
        taskInput.value = '';
        
        console.log("Tasks stored:", localStorage.getItem("currentTasks")); 
    }
    function deleteTask(index) {
        const updatedTasks = tasks.filter((task, i) => i != index);
        setTasks(updatedTasks);
        localStorage.setItem("currentTasks", JSON.stringify(updatedTasks));

    }
    function deleteCompletedTask(index) {
        const updatedCompletedTasks = completedTasks.filter((task, i) => i != index);
        setCompletedTasks(updatedCompletedTasks);
        localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));
    }
    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = tasks[index - 1];
            updatedTasks[index - 1] = tasks[index];
            setTasks(updatedTasks);
        }
    }
    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            updatedTasks[index] = tasks[index + 1];
            updatedTasks[index + 1] = tasks[index];
            setTasks(updatedTasks);
        }
    }
    function completeTask(index) {//strikethrough and put at bottom
        const updatedTasks = tasks.filter((task, i)=> i!=index); //everything expect the completed task
        const updatedCompletedTasks =[...completedTasks, tasks[index]];
        setCompletedTasks( updatedCompletedTasks);
        localStorage.setItem("completedTasks", JSON.stringify(updatedCompletedTasks));
        
        setTasks(updatedTasks);
        localStorage.setItem("currentTasks", JSON.stringify(updatedTasks));
    }

    return(
        <div className="task-list-container">
            <h1>Task list</h1>
            {/* <p>{localStorage.getItem("currentTasks")} stored</p> */}
            <form onSubmit={addTask} className="task-list-form">
                <input name = "taskInput" className="taskInput" type="text" placeholder="Add a new task" autoComplete="off" />
                <button className = "taskSubmit" type="submit">Add</button>
            </form>
            <div className="task-list">
                <ol>
                    {tasks.map((task, index) => (

                            <li className="task-item" key={index}>
                                <span className="task-text">{task}</span>
                                <div className="task-btn-group">
                                    <button className = "completeTask" onClick = {()=> completeTask(index)}>
                                        ✅
                                    </button>
                                    <button className = "deleteTask" onClick = {() => deleteTask(index)}>
                                        ❌
                                    </button>
                                    <button className = "up" onClick = {() => moveUp(index)}>
                                        ⬆️
                                    </button> 
                                    <button className = "down" onClick = {() => moveDown(index)}>
                                        ⬇️
                                    </button>
                                </div>
                            </li>


                    ))}
                </ol>
            </div>
            <div className = "completed-task-list">
                <h2>Completed Tasks</h2>
                <ul>
                    {completedTasks.map((task, index) => (

                        <li className="completed-task-item" key={index}>
                            {task}
                            <button className="deleteCompletedTask" onClick={() => deleteCompletedTask(index)}>❌</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TaskList