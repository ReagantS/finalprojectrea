const { TaskManager } = require('../../src/src/app');

describe('TaskManager', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  test('should initialize with empty tasks array', () => {
    expect(taskManager.tasks).toEqual([]);
    expect(taskManager.nextId).toBe(1);
  });

  test('should add a task successfully', () => {
    const task = taskManager.addTask('Test Task');
    expect(task.id).toBe(1);
    expect(task.title).toBe('Test Task');
    expect(taskManager.tasks).toHaveLength(1);
    expect(taskManager.nextId).toBe(2);
  });

  test('should add a task with description', () => {
    const task = taskManager.addTask('Test Task', 'Test Description');
    expect(task.description).toBe('Test Description');
  });

  test('should get task by valid ID', () => {
    const addedTask = taskManager.addTask('Test Task');
    const retrievedTask = taskManager.getTaskById(1);
    expect(retrievedTask).toBe(addedTask);
  });

  test('should return undefined for non-existent ID', () => {
    const task = taskManager.getTaskById(999);
    expect(task).toBeUndefined();
  });

  test('should throw error for invalid ID type', () => {
    expect(() => taskManager.getTaskById('invalid')).toThrow('Invalid task ID');
  });

  test('should throw error for zero ID', () => {
    expect(() => taskManager.getTaskById(0)).toThrow('Invalid task ID');
  });

  test('should throw error for negative ID', () => {
    expect(() => taskManager.getTaskById(-1)).toThrow('Invalid task ID');
  });

  test('should list all tasks', () => {
    taskManager.addTask('Task 1');
    taskManager.addTask('Task 2');
    const tasks = taskManager.listTasks();
    expect(tasks).toHaveLength(2);
  });

  test('should list only completed tasks', () => {
    const task1 = taskManager.addTask('Task 1');
    const task2 = taskManager.addTask('Task 2');
    task1.markComplete();
    const completedTasks = taskManager.listTasks('completed');
    expect(completedTasks).toHaveLength(1);
    expect(completedTasks[0]).toBe(task1);
  });

  test('should list only pending tasks', () => {
    const task1 = taskManager.addTask('Task 1');
    const task2 = taskManager.addTask('Task 2');
    task1.markComplete();
    const pendingTasks = taskManager.listTasks('pending');
    expect(pendingTasks).toHaveLength(1);
    expect(pendingTasks[0]).toBe(task2);
  });

  test('should throw error for invalid filter', () => {
    expect(() => taskManager.listTasks('invalid')).toThrow('Invalid filter. Use "all", "completed", or "pending"');
  });

  test('should complete a task', () => {
    const task = taskManager.addTask('Test Task');
    const completedTask = taskManager.completeTask(1);
    expect(completedTask.completed).toBe(true);
    expect(completedTask).toBe(task);
  });

  test('should throw error when completing non-existent task', () => {
    expect(() => taskManager.completeTask(999)).toThrow('Task with ID 999 not found');
  });

  test('should delete a task', () => {
    taskManager.addTask('Task 1');
    const deletedTask = taskManager.deleteTask(1);
    expect(deletedTask.title).toBe('Task 1');
    expect(taskManager.tasks).toHaveLength(0);
  });

  test('should throw error when deleting non-existent task', () => {
    expect(() => taskManager.deleteTask(999)).toThrow('Task with ID 999 not found');
  });

  test('should get correct task count', () => {
    taskManager.addTask('Task 1');
    taskManager.addTask('Task 2');
    taskManager.addTask('Task 3');
    taskManager.completeTask(1);
    taskManager.completeTask(2);

    const count = taskManager.getTaskCount();
    expect(count.total).toBe(3);
    expect(count.completed).toBe(2);
    expect(count.pending).toBe(1);
  });

  test('should clear completed tasks', () => {
    const task1 = taskManager.addTask('Task 1');
    const task2 = taskManager.addTask('Task 2');
    const task3 = taskManager.addTask('Task 3');
    task1.markComplete();
    task3.markComplete();

    const clearedTasks = taskManager.clearCompletedTasks();
    expect(clearedTasks).toHaveLength(2);
    expect(clearedTasks).toContain(task1);
    expect(clearedTasks).toContain(task3);
    expect(taskManager.tasks).toHaveLength(1);
    expect(taskManager.tasks[0]).toBe(task2);
  });
});