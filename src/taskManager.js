let _nextId = 1;

export function resetId() {
  _nextId = 1;
}

export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  return title.trim().length >= 3;
}

export function createTask(title, priority = 'medium') {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
    priority: priority,
  };
}

// ✨ Modificado: agora verifica duplicadas antes de adicionar
export function addTask(tasks, title) {
  if (!validateTitle(title)) {
    throw new Error('Título inválido: deve ser uma string com pelo menos 3 caracteres.');
  }
  if (isDuplicate(tasks, title)) {
    throw new Error('Tarefa duplicada');
  }
  const newTask = createTask(title);
  return [...tasks, newTask];
}

export function toggleTask(task) {
  return { ...task, completed: !task.completed };
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed': return tasks.filter((t) => t.completed === true);
    case 'pending': return tasks.filter((t) => t.completed === false);
    case 'all':
    default: return [...tasks];
  }
}

export function countTasks(tasks) { return tasks.length; }
export function countCompleted(tasks) { return tasks.filter((t) => t.completed === true).length; }
export function countPending(tasks) { return tasks.filter((t) => t.completed === false).length; }

export function validatePriority(priority) {
  return priority === 'low' || priority === 'medium' || priority === 'high';
}

export function filterByPriority(tasks, priority) {
  return tasks.filter((task) => task.priority === priority);
}

// ------------------------------------------------------------
// Exercício 5: Duplicadas
// ------------------------------------------------------------
export function isDuplicate(tasks, title) {
  const normalizedTitle = title.trim().toLowerCase();
  return tasks.some((task) => task.title.trim().toLowerCase() === normalizedTitle);
}
