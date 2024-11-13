// Initial sample tasks
const initialTasks = [
  {
    id: 1,
    title: "Build a Snowman",
    description:
      "Create a jolly snowman in the backyard with carrot nose and button eyes",
    dueDate: "2024-03-20",
    completed: false,
  },
  {
    id: 2,
    title: "Winter Shopping",
    description: "Buy warm gloves, a scarf, and a new winter coat",
    dueDate: "2024-03-21",
    completed: false,
  },
  {
    id: 3,
    title: "Hot Chocolate Evening",
    description:
      "Make hot chocolate with marshmallows and watch a winter movie",
    dueDate: "2024-03-22",
    completed: false,
  },
];

// State management
let _tasks = JSON.parse(localStorage.getItem("tasks"));
// If there are no tasks in localStorage, use the initial tasks
if (!_tasks || _tasks.length === 0) {
  _tasks = initialTasks;
  localStorage.setItem("tasks", JSON.stringify(_tasks));
}

let _isAnimating = false;
let _lastCompletedCount = _tasks.filter((task) => task.completed).length;

// Getters and setters
export const tasks = {
  get: () => _tasks,
  set: (newTasks) => {
    _tasks = newTasks;
  },
};

export const isAnimating = {
  get: () => _isAnimating,
  set: (value) => {
    _isAnimating = value;
  },
};

export const lastCompletedCount = {
  get: () => _lastCompletedCount,
  set: (value) => {
    _lastCompletedCount = value;
  },
};

export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(_tasks));
}
