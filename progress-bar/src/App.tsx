import './App.css';
import ProgressBar from './component/ProgressBar';

function App() {

  const bars = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  
  return (
    <div className='container'
    >
      <h1>ProgressBar</h1>
      {(bars.map((barVal) => (
        <ProgressBar progress={barVal} />
      )))}
    </div>
  )
}

export default App
