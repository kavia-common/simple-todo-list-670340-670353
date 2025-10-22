import React from 'react';
// PUBLIC_INTERFACE
export default function Header(){
  /** Header banner displaying the app title and subtitle. */
  return (
    <header className="header" role="banner">
      <h1>Simple Todo</h1>
      <p>Fast, minimal, and persistent locally</p>
    </header>
  );
}
