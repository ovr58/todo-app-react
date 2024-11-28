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
        console.log(localStorage.getItem('tasks'))
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        console.log(this.tasks)
    }

    sync() {
        console.log(localStorage.getItem('tasks'))
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
        // Рекурсивная функция для удаления подзадач
        const removeSubTasks = (taskId) => {
            this.tasks
            .filter(task => task.ofTask === taskId)
            .forEach(subTask => {
                removeSubTasks(subTask.id);
                this.tasks = this.tasks.filter(task => task.id !== subTask.id);
            });
        };
    
        // Удаляем подзадачи
        removeSubTasks(id);
    
        // Удаляем саму задачу
        this.tasks = this.tasks.filter(task => task.id !== id);
  
        this.sync();
    }

    toggleCompleted(id) {
        //находим задачу которую кликнули
        const taskIndex = this.tasks.findIndex(task => task.id === id)
        if (taskIndex === -1) return
        //меняем статус задачи
        const clickedTask = this.tasks[taskIndex];
        clickedTask.completed = !clickedTask.completed;
        clickedTask.updatedAt = Date.now()

        // Рекурсивно обновляем статус подзадач
        const updateSubTasks = (parentTaskId, completedStatus) => {
            this.tasks.forEach(task => {
            if (task.ofTask === parentTaskId) {
                task.completed = completedStatus;
                task.updatedAt = Date.now();
                updateSubTasks(task.id, completedStatus);
            }
            });
        };
    
        updateSubTasks(clickedTask.id, clickedTask.completed)
         // Рекурсивно проверяем и обновляем статус родительских задач
        const updateParentTasks = (taskId) => {
            const task = this.tasks.find(task => task.id === taskId);
            if (task && task.ofTask) {
                const allTaskOfTheSameLevel = this.tasks.filter(t => t.ofTask === task.ofTask);
                const allCompleted = allTaskOfTheSameLevel.every(t => t.completed);
                const parentIndex = this.tasks.findIndex(t => t.id === task.ofTask);
                if (parentIndex !== -1) {
                    this.tasks[parentIndex].completed = allCompleted;
                    this.tasks[parentIndex].updatedAt = Date.now();
                    updateParentTasks(this.tasks[parentIndex].id);
                }
            }
        };
    
        updateParentTasks(clickedTask.id);
        this.sync();
    }

}