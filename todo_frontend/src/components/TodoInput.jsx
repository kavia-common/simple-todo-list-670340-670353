import React, {useState} from 'react';

// PUBLIC_INTERFACE
export default function TodoInput({onAdd}){
  /**
   * Input row for adding a new todo.
   * Allows adding via button click or Enter key.
   */
  const [value,setValue]=useState('');
  const submit=()=>{
    const v=value.trim();
    if(!v) return;
    onAdd(v);
    setValue('');
  };
  const onKeyDown=(e)=>{
    if(e.key==='Enter') submit();
  };
  return (
    <div className="input-row" role="group" aria-label="Add new todo">
      <input className="input" value={value} onChange={e=>setValue(e.target.value)} onKeyDown={onKeyDown} placeholder="What needs to be done?" aria-label="Todo text" />
      <button className="btn" onClick={submit} aria-label="Add todo">Add</button>
    </div>
  );
}
