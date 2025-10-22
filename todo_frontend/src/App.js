import React,{useEffect,useMemo,useState} from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const STORAGE_KEY='todos_v1';
const uid=()=> Math.random().toString(36).slice(2)+Date.now().toString(36);

// PUBLIC_INTERFACE
export default function App(){
  /**
   * Main Todo application component.
   * - Manages todo state and persistence to localStorage (best-effort).
   * - Provides filtering (all/active/completed), counts, and clear completed.
   * - Composes Header, TodoInput, and TodoList components.
   */
  const [todos,setTodos]=useState(()=>{
    try{ const raw=localStorage.getItem(STORAGE_KEY); return raw? JSON.parse(raw):[]; }catch{ return []; }
  });
  const [filter,setFilter]=useState('all');

  useEffect(()=>{ try{ localStorage.setItem(STORAGE_KEY,JSON.stringify(todos)); }catch{} },[todos]);

  // PUBLIC_INTERFACE
  const addTodo=(text)=> setTodos(prev=> [{id:uid(),text,completed:false},...prev]);
  // PUBLIC_INTERFACE
  const toggleTodo=(id)=> setTodos(prev=> prev.map(t=> t.id===id? {...t,completed:!t.completed}:t));
  // PUBLIC_INTERFACE
  const deleteTodo=(id)=> setTodos(prev=> prev.filter(t=> t.id!==id));
  // PUBLIC_INTERFACE
  const updateTodo=(id,text)=> setTodos(prev=> prev.map(t=> t.id===id? {...t,text}:t));
  // PUBLIC_INTERFACE
  const clearCompleted=()=> setTodos(prev=> prev.filter(t=> !t.completed));

  const counts=useMemo(()=>{
    const total=todos.length; const completed=todos.filter(t=>t.completed).length; const active=total-completed; return {total,completed,active};
  },[todos]);

  const filtered=useMemo(()=>{
    if(filter==='active') return todos.filter(t=>!t.completed);
    if(filter==='completed') return todos.filter(t=>t.completed);
    return todos;
  },[todos,filter]);

  return (
    <div className="App">
      <div className="container">
        <div className="card" aria-label="Todo app">
          <Header />
          <TodoInput onAdd={addTodo} />
          <div className="toolbar" role="toolbar" aria-label="Todo filters and actions">
            <div className="filters" role="group" aria-label="Filters">
              {['all','active','completed'].map(f=> (
                <button key={f} className={`filter-btn ${filter===f?'active':''}`} onClick={()=>setFilter(f)} aria-pressed={filter===f} aria-label={`Show ${f}`}>
                  {f[0].toUpperCase()+f.slice(1)}
                </button>
              ))}
            </div>
            <div className="counts" aria-live="polite">
              {counts.active} active • {counts.completed} completed
            </div>
            <button className="btn secondary" onClick={clearCompleted} disabled={counts.completed===0} aria-label="Clear completed">
              Clear Completed
            </button>
          </div>
          <TodoList todos={filtered} onToggle={toggleTodo} onDelete={deleteTodo} onUpdate={updateTodo} />
          <div className="footer">Data is saved in your browser (localStorage).</div>
        </div>
      </div>
    </div>
  );
}
