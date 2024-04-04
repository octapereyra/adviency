import './App.css';
import { Gifts } from './components/Gifts';

function App() {
  return (
    <div className="flex flex-row justify-center h-screen">
      <div className="flex flex-col justify-center items-center gap-2">
        <Gifts></Gifts>
      </div>
    </div>
  );
}

export default App;
