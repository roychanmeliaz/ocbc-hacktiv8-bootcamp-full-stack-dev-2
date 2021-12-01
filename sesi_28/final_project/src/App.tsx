import { Outlet } from 'react-router';
import './App.css';
import AppBarComponent from './components/appbar';
import LoadingModalComponent from './modularComponents/loadingModal';

function App() {
  return (
    <>
      <AppBarComponent />
      <LoadingModalComponent />
      <Outlet />
    </>
  );
}

export default App;
