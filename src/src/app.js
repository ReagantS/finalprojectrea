class Task {
  constructor(id, title, description = '') {
    if (!title || typeof title !== 'string' || title.trim() === '') {
      throw new Error('Task title is required and must be a non-empty string');
    }
    this.id = id;
    this.title = title.trim();
    this.description = description.trim();
    this.completed = false;
    this.createdAt = new Date();
  }

  markComplete() {
    this.completed = true;
  }

  markIncomplete() {
    this.completed = false;
  }

  updateTitle(newTitle) {
    if (!newTitle || typeof newTitle !== 'string' || newTitle.trim() === '') {
      throw new Error('Task title is required and must be a non-empty string');
    }
    this.title = newTitle.trim();
  }

  updateDescription(newDescription) {
    this.description = newDescription ? newDescription.trim() : '';
  }
}

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(title, description = '') {
    const task = new Task(this.nextId++, title, description);
    this.tasks.push(task);
    return task;
  }

  getTaskById(id) {
    if (typeof id !== 'number' || id <= 0) {
      throw new Error('Invalid task ID');
    }
    return this.tasks.find(task => task.id === id);
  }

  listTasks(filter = 'all') {
    if (!['all', 'completed', 'pending'].includes(filter)) {
      throw new Error('Invalid filter. Use "all", "completed", or "pending"');
    }

    return this.tasks.filter(task => {
      if (filter === 'completed') return task.completed;
      if (filter === 'pending') return !task.completed;
      return true;
    });
  }

  completeTask(id) {
    const task = this.getTaskById(id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found`);
    }
    task.markComplete();
    return task;
  }

  deleteTask(id) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    return this.tasks.splice(index, 1)[0];
  }

  getTaskCount() {
    return {
      total: this.tasks.length,
      completed: this.tasks.filter(task => task.completed).length,
      pending: this.tasks.filter(task => !task.completed).length
    };
  }

  clearCompletedTasks() {
    const completedTasks = this.tasks.filter(task => task.completed);
    this.tasks = this.tasks.filter(task => !task.completed);
    return completedTasks;
  }
}

module.exports = { Task, TaskManager };
