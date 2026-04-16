#!/usr/bin/env node

const { TaskManager } = require('./src/src/app');

function demonstrateTaskManager() {
  console.log('🚀 Task Management System Demo\n');

  const taskManager = new TaskManager();

  // Add some tasks
  console.log('📝 Adding tasks...');
  const task1 = taskManager.addTask('Buy groceries', 'Milk, bread, eggs, and fruits');
  const task2 = taskManager.addTask('Clean the house', 'Vacuum, dust, and mop floors');
  const task3 = taskManager.addTask('Finish software testing project', 'Complete unit tests and integration tests');
  const task4 = taskManager.addTask('Call mom', 'Check up on family');

  console.log(`✅ Added ${taskManager.getTaskCount().total} tasks\n`);

  // List all tasks
  console.log('📋 All tasks:');
  taskManager.listTasks().forEach(task => {
    console.log(`  ${task.id}. ${task.completed ? '✅' : '⏳'} ${task.title}`);
    if (task.description) {
      console.log(`     ${task.description}`);
    }
  });
  console.log();

  // Complete some tasks
  console.log('✅ Completing tasks...');
  taskManager.completeTask(task1.id);
  taskManager.completeTask(task3.id);
  console.log(`Completed: "${task1.title}" and "${task3.title}"\n`);

  // Show statistics
  const stats = taskManager.getTaskCount();
  console.log('📊 Task Statistics:');
  console.log(`  Total: ${stats.total}`);
  console.log(`  Completed: ${stats.completed}`);
  console.log(`  Pending: ${stats.pending}\n`);

  // List completed tasks
  console.log('✅ Completed tasks:');
  taskManager.listTasks('completed').forEach(task => {
    console.log(`  ${task.id}. ${task.title}`);
  });
  console.log();

  // List pending tasks
  console.log('⏳ Pending tasks:');
  taskManager.listTasks('pending').forEach(task => {
    console.log(`  ${task.id}. ${task.title}`);
  });
  console.log();

  // Delete a task
  console.log('🗑️ Deleting task...');
  const deletedTask = taskManager.deleteTask(task4.id);
  console.log(`Deleted: "${deletedTask.title}"\n`);

  // Clear completed tasks
  console.log('🧹 Clearing completed tasks...');
  const clearedTasks = taskManager.clearCompletedTasks();
  console.log(`Cleared ${clearedTasks.length} completed tasks\n`);

  // Final state
  console.log('📋 Final task list:');
  taskManager.listTasks().forEach(task => {
    console.log(`  ${task.id}. ${task.completed ? '✅' : '⏳'} ${task.title}`);
  });

  const finalStats = taskManager.getTaskCount();
  console.log(`\n📊 Final Statistics: ${finalStats.total} total, ${finalStats.completed} completed, ${finalStats.pending} pending`);

  console.log('\n🎉 Demo completed successfully!');
}

if (require.main === module) {
  demonstrateTaskManager();
}

module.exports = { demonstrateTaskManager };