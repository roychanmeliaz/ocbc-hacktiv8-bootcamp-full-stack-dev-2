import './App.css';
import AppBarComponent from './components/appbar';
import Articles from './components/articles';
import { Grid } from '@mui/material';

function App() {
  return (

    <div
      style={{
      backgroundColor: '#F4f9fb',
    }}>
      <AppBarComponent/>
      <Articles/>        
    </div>

  );
}

export default App;
