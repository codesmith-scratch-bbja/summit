import React from 'react';
import { Link } from 'react-router-dom';
import { NavBar, PathWidget, HorizontalScroll } from '../../components';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <NavBar />
      <Link to="/discover">Discover</Link>
      <HorizontalScroll>
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
        <PathWidget />
      </HorizontalScroll>
    </div>
  );
}
