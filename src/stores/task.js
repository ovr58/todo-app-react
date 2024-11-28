import { action, computed, makeAutoObservable, observable } from "mobx";

import { v4 as uuidv4 } from 'uuid'

export class TasksStore {
    constructor() {
        this.fetchs();
        makeAutoObservable(this, {
            tasks: observable,
            taskEdit: observable,
            getTasks: computed,
            getTaskEdit: computed,
            getCompletedTasks: computed,
            addTask: action,
            updateTask: action,
            removeTask: action,
            editTask: action,
        });
    }

    taskEdit = ''

    fetchs() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log(this.tasks)
    }

    sync() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        this.fetchs()
    }

    get getTaskEdit() {
        return this.taskEdit
    } 

    get getTasks() {
        return this.tasks.slice().
        sort((a, b) => b.updatedAt - a.updatedAt);
    }

    get getCompletedTasks() {
        return this.tasks.filter(task => task.completed).
        sort((a, b) => b.updatedAt - a.updatedAt);
    }

    editTask(task) {
        this.taskEdit = task;
    }

    addTask(task, superId) {
        this.tasks.push({
            id: uuidv4(),
            task,
            completed: false,
            ofTask: superId,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        this.sync();
    }

    updateTask(id, task) {
        const index = this.tasks.findIndex(task => task.id === id);
        this.tasks[index].task = task;
        this.tasks[index].updatedAt = Date.now();
        this.taskEdit = null;
        this.sync();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id && task.ofTask !== id);
        this.sync();
    }

    toggleCompleted(id) {
        const clickedTask = this.tasks.find(task => task.id === id);
        const indexOfClickedTask = this.tasks.findIndex(task => task.id === id);
        const indices = this.tasks.reduce((acc, task, index) => {
            if (task.ofTask === id) {
                acc.push(index);
            }
            return acc;
        }, []);
        this.tasks[indexOfClickedTask].completed = !clickedTask.completed;
        for (const index of indices) {
            this.tasks[index].completed = clickedTask.completed;
            this.tasks[index].updatedAt = Date.now();
        }
        if (clickedTask.ofTask !== '-1') {
            const allTaskOfTheSameLevel = this.tasks.filter(task => task.ofTask === clickedTask.ofTask);
            const allCompleted = allTaskOfTheSameLevel.every(task => task.completed);
            if (allCompleted) {
                const parentIndex = this.tasks.findIndex(task => task.id === clickedTask.ofTask);
                this.tasks[parentIndex].completed = true;
                this.tasks[parentIndex].updatedAt = Date.now();
            }
        }
        this.sync();
    }

}