const { TaskManager } = require('../../src/src/app');

describe('TaskManager Integration Tests', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  test('should handle complete task management workflow', () => {
    // Add multiple tasks
    const task1 = taskManager.addTask('Buy groceries', 'Milk, bread, eggs');
    const task2 = taskManager.addTask('Clean house');
    const task3 = taskManager.addTask('Finish project', 'Complete the software testing project');

    // Verify all tasks are added
    expect(taskManager.getTaskCount().total).toBe(3);

    // Complete some tasks
    taskManager.completeTask(task1.id);
    taskManager.completeTask(task3.id);

    // Check counts
    const counts = taskManager.getTaskCount();
    expect(counts.completed).toBe(2);
    expect(counts.pending).toBe(1);

    // List completed tasks
    const completedTasks = taskManager.listTasks('completed');
    expect(completedTasks).toHaveLength(2);
    expect(completedTasks.map(t => t.title)).toEqual(['Buy groceries', 'Finish project']);

    // List pending tasks
    const pendingTasks = taskManager.listTasks('pending');
    expect(pendingTasks).toHaveLength(1);
    expect(pendingTasks[0].title).toBe('Clean house');

    // Delete a completed task
    taskManager.deleteTask(task1.id);
    expect(taskManager.getTaskCount().total).toBe(2);

    // Clear all completed tasks
    const cleared = taskManager.clearCompletedTasks();
    expect(cleared).toHaveLength(1);
    expect(cleared[0].title).toBe('Finish project');
    expect(taskManager.getTaskCount().total).toBe(1);
    expect(taskManager.getTaskCount().pending).toBe(1);
  });

  test('should handle task updates and state changes', () => {
    const task = taskManager.addTask('Initial task');

    // Update title and description
    task.updateTitle('Updated task title');
    task.updateDescription('Updated description');

    expect(task.title).toBe('Updated task title');
    expect(task.description).toBe('Updated description');

    // Mark complete and then incomplete
    taskManager.completeTask(task.id);
    expect(task.completed).toBe(true);

    task.markIncomplete();
    expect(task.completed).toBe(false);

    // Verify through listTasks
    const allTasks = taskManager.listTasks('all');
    expect(allTasks[0].completed).toBe(false);
  });

  test('should handle multiple operations in sequence', () => {
    // Add 5 tasks
    for (let i = 1; i <= 5; i++) {
      taskManager.addTask(`Task ${i}`, `Description ${i}`);
    }

    expect(taskManager.getTaskCount().total).toBe(5);

    // Complete tasks 2, 4
    taskManager.completeTask(2);
    taskManager.completeTask(4);

    // Delete task 3
    taskManager.deleteTask(3);

    // Check final state
    expect(taskManager.getTaskCount().total).toBe(4);
    expect(taskManager.getTaskCount().completed).toBe(2);
    expect(taskManager.getTaskCount().pending).toBe(2);

    // Verify remaining tasks
    const allTasks = taskManager.listTasks('all');
    const titles = allTasks.map(t => t.title).sort();
    expect(titles).toEqual(['Task 1', 'Task 2', 'Task 4', 'Task 5']);
  });

  test('should handle edge cases in task management', () => {
    // Add task
    const task = taskManager.addTask('Test task');

    // Try to complete non-existent task
    expect(() => taskManager.completeTask(999)).toThrow('Task with ID 999 not found');

    // Try to delete non-existent task
    expect(() => taskManager.deleteTask(999)).toThrow('Task with ID 999 not found');

    // Try invalid operations on existing task
    expect(() => task.updateTitle('')).toThrow('Task title is required and must be a non-empty string');

    // Verify original task is still intact
    const retrievedTask = taskManager.getTaskById(task.id);
    expect(retrievedTask.title).toBe('Test task');
    expect(retrievedTask.completed).toBe(false);
  });

  test('should maintain data integrity across operations', () => {
    // Add tasks with various data
    const task1 = taskManager.addTask('Task 1', 'Desc 1');
    const task2 = taskManager.addTask('Task 2');
    const task3 = taskManager.addTask('Task 3', 'Desc 3');

    // Store original data
    const originalData = taskManager.tasks.map(t => ({
      id: t.id,
      title: t.title,
      description: t.description,
      completed: t.completed
    }));

    // Perform various operations
    taskManager.completeTask(task1.id);
    task2.updateTitle('Updated Task 2');
    task3.updateDescription('Updated Desc 3');
    taskManager.deleteTask(task2.id);

    // Verify remaining tasks integrity
    const remainingTasks = taskManager.tasks;
    expect(remainingTasks).toHaveLength(2);

    const task1After = remainingTasks.find(t => t.id === task1.id);
    const task3After = remainingTasks.find(t => t.id === task3.id);

    expect(task1After.title).toBe('Task 1');
    expect(task1After.description).toBe('Desc 1');
    expect(task1After.completed).toBe(true);

    expect(task3After.title).toBe('Task 3');
    expect(task3After.description).toBe('Updated Desc 3');
    expect(task3After.completed).toBe(false);
  });
});