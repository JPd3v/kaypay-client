import { NavBar } from 'components';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <NavBar />
      <Outlet />
    </div>
  );
}
