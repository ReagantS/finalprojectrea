const { Task } = require('../../src/src/app');

describe('Task', () => {
  test('should create a task with valid title', () => {
    const task = new Task(1, 'Test Task');
    expect(task.id).toBe(1);
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('');
    expect(task.completed).toBe(false);
    expect(task.createdAt).toBeInstanceOf(Date);
  });

  test('should create a task with title and description', () => {
    const task = new Task(2, 'Test Task', 'Test Description');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test Description');
  });

  test('should trim title and description', () => {
    const task = new Task(3, '  Test Task  ', '  Test Description  ');
    expect(task.title).toBe('Test Task');
    expect(task.description).toBe('Test Description');
  });

  test('should throw error for empty title', () => {
    expect(() => new Task(4, '')).toThrow('Task title is required and must be a non-empty string');
  });

  test('should throw error for null title', () => {
    expect(() => new Task(5, null)).toThrow('Task title is required and must be a non-empty string');
  });

  test('should throw error for undefined title', () => {
    expect(() => new Task(6, undefined)).toThrow('Task title is required and must be a non-empty string');
  });

  test('should throw error for non-string title', () => {
    expect(() => new Task(7, 123)).toThrow('Task title is required and must be a non-empty string');
  });

  test('should mark task as complete', () => {
    const task = new Task(8, 'Test Task');
    task.markComplete();
    expect(task.completed).toBe(true);
  });

  test('should mark task as incomplete', () => {
    const task = new Task(9, 'Test Task');
    task.markComplete();
    expect(task.completed).toBe(true);
    task.markIncomplete();
    expect(task.completed).toBe(false);
  });

  test('should update title successfully', () => {
    const task = new Task(10, 'Original Title');
    task.updateTitle('Updated Title');
    expect(task.title).toBe('Updated Title');
  });

  test('should trim updated title', () => {
    const task = new Task(11, 'Original Title');
    task.updateTitle('  Updated Title  ');
    expect(task.title).toBe('Updated Title');
  });

  test('should throw error when updating to empty title', () => {
    const task = new Task(12, 'Original Title');
    expect(() => task.updateTitle('')).toThrow('Task title is required and must be a non-empty string');
  });

  test('should update description successfully', () => {
    const task = new Task(13, 'Test Task');
    task.updateDescription('New Description');
    expect(task.description).toBe('New Description');
  });

  test('should handle null description update', () => {
    const task = new Task(14, 'Test Task', 'Original Description');
    task.updateDescription(null);
    expect(task.description).toBe('');
  });

  test('should trim updated description', () => {
    const task = new Task(15, 'Test Task');
    task.updateDescription('  New Description  ');
    expect(task.description).toBe('New Description');
  });
});