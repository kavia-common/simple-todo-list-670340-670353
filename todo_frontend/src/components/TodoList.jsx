import React from 'react';
import TodoItem from './TodoItem';

// PUBLIC_INTERFACE
export default function TodoList({todos,onToggle,onDelete,onUpdate}){
  /** Renders a list of todos or a friendly empty state. */
  if(!todos.length){
    return <div style={{padding:16,color:'#64748b'}}>No tasks yet. Add your first todo above.</div>;
  }
  return (
    <ul className="list" role="list">
      {todos.map(t=> (
        <TodoItem key={t.id} todo={t} onToggle={onToggle} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </ul>
  );
}
