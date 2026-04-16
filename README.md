# Task Management System

[![CI](https://github.com/your-username/final-project-pengujian/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/final-project-pengujian/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/your-username/final-project-pengujian/badge.svg?branch=main)](https://coveralls.io/github/your-username/final-project-pengujian?branch=main)

A simple task management system built with Node.js for the Software Testing final project. This application demonstrates automated testing practices, continuous integration, and code quality assurance.

## Features

- ✅ Add tasks with title and description
- 📝 List all tasks with filtering (all, completed, pending)
- ✅ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 📊 Get task statistics (total, completed, pending)
- 🧹 Clear completed tasks

## Technology Stack

- **Language**: JavaScript (Node.js)
- **Testing Framework**: Jest
- **CI/CD**: GitHub Actions
- **Code Coverage**: Jest built-in coverage
- **Package Manager**: npm

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/final-project-pengujian.git
cd final-project-pengujian
```

2. Install dependencies:
```bash
npm install
```

## Usage

### As a Library

```javascript
const { TaskManager } = require('./src/src/app');

const taskManager = new TaskManager();

// Add a task
const task = taskManager.addTask('Buy groceries', 'Milk, bread, eggs');
console.log(`Added task: ${task.title}`);

// List all tasks
const allTasks = taskManager.listTasks();
console.log(`Total tasks: ${allTasks.length}`);

// Complete a task
taskManager.completeTask(task.id);
console.log('Task completed!');

// Get statistics
const stats = taskManager.getTaskCount();
console.log(`Completed: ${stats.completed}, Pending: ${stats.pending}`);
```

## Testing

### Running Tests

Run all tests:
```bash
npm test
```

Run unit tests only:
```bash
npm run test:unit
```

Run integration tests only:
```bash
npm run test:integration
```

Run tests with coverage report:
```bash
npm run test:coverage
```

### Testing Strategy

#### Unit Testing
- **Framework**: Jest
- **Coverage**: 100% (statements, branches, functions, lines)
- **Test Cases**: 35 unit tests
- **Files**: `tests/unit/task.test.js`, `tests/unit/taskManager.test.js`

**What we test:**
- Task creation with validation
- Task state management (complete/incomplete)
- Task updates (title, description)
- TaskManager operations (add, get, list, complete, delete)
- Input validation and error handling
- Edge cases and boundary conditions

#### Integration Testing
- **Test Cases**: 5 integration tests
- **File**: `tests/integration/taskManager.integration.test.js`

**What we test:**
- Complete task management workflows
- Data integrity across multiple operations
- State consistency
- Error handling in complex scenarios
- End-to-end task lifecycle

### Test Coverage

Current coverage: **100%**

- Statements: 100%
- Branches: 100%
- Functions: 100%
- Lines: 100%

Coverage report is generated automatically and uploaded to Codecov.

## Continuous Integration

### GitHub Actions Workflow

The CI pipeline runs on every push and pull request to main/master branches:

1. **Setup**: Node.js 18.x and 20.x (matrix testing)
2. **Dependencies**: Install with `npm ci`
3. **Testing**:
   - Unit tests
   - Integration tests
   - Full test suite with coverage
4. **Reporting**: Upload coverage to Codecov

### Pipeline Stages

```yaml
- Install dependencies
- Run unit tests
- Run integration tests
- Generate coverage report
- Upload coverage reports
```

## Project Structure

```
final-project-pengujian/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI pipeline
├── src/
│   └── src/
│       └── app.js              # Main application code
├── tests/
│   ├── unit/                   # Unit tests
│   │   ├── task.test.js
│   │   └── taskManager.test.js
│   └── integration/            # Integration tests
│       └── taskManager.integration.test.js
├── coverage/                   # Generated coverage reports
├── package.json                # Project configuration
└── README.md                   # This file
```

## Architecture

### Task Class
- Represents individual tasks
- Properties: id, title, description, completed, createdAt
- Methods: markComplete(), markIncomplete(), updateTitle(), updateDescription()

### TaskManager Class
- Manages collection of tasks
- Properties: tasks array, nextId counter
- Methods: addTask(), getTaskById(), listTasks(), completeTask(), deleteTask(), getTaskCount(), clearCompletedTasks()

### Data Storage
- In-memory storage using arrays
- No external dependencies for simplicity
- Easy to extend to file/database storage

## Validation and Error Handling

- **Input Validation**: All inputs are validated for type and content
- **Error Messages**: Clear, descriptive error messages
- **Boundary Checks**: Handles edge cases (empty strings, invalid IDs, etc.)
- **Data Integrity**: Maintains consistent state across operations

## Future Enhancements

- [ ] File-based persistence
- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] REST API endpoints
- [ ] Web interface
- [ ] User authentication
- [ ] Task categories/tags
- [ ] Due dates and reminders

## Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## License

ISC License - see package.json for details

## Author

ReagantS - Software Testing Final Project