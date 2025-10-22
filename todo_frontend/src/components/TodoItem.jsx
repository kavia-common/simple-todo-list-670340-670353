import React,{useState} from 'react';

// PUBLIC_INTERFACE
export default function TodoItem({todo,onToggle,onDelete,onUpdate}){
  /**
   * A single todo item row with:
   * - checkbox to toggle completion
   * - double-click to edit inline (Enter/blur save, Esc cancel)
   * - delete button
   */
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(todo.text);
  const commit=()=>{ const t=draft.trim(); if(t && t!==todo.text) onUpdate(todo.id,t); setEditing(false); };
  const cancel=()=>{ setDraft(todo.text); setEditing(false); };
  return (
    <li className="item" role="listitem">
      <input className="checkbox" type="checkbox" checked={todo.completed} onChange={()=>onToggle(todo.id)} aria-label={`Mark ${todo.text} ${todo.completed? 'incomplete':'complete'}`} />
      {editing ? (
        <input className="input" autoFocus value={draft} onChange={e=>setDraft(e.target.value)} onBlur={commit} onKeyDown={e=>{ if(e.key==='Enter') commit(); if(e.key==='Escape') cancel(); }} aria-label="Edit todo text" />
      ) : (
        <div className={`item-text ${todo.completed?'completed':''}`} onDoubleClick={()=>setEditing(true)} title="Double-click to edit">
          {todo.text}
        </div>
      )}
      <div className="item-actions">
        {!editing && <button className="icon-btn secondary" onClick={()=>setEditing(true)} aria-label="Edit todo">✏️</button>}
        <button className="icon-btn danger" onClick={()=>onDelete(todo.id)} aria-label="Delete todo">🗑️</button>
      </div>
    </li>
  );
}
