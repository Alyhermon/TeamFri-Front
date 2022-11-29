import './app.scss';
import NavBar from './components/navbar/navbar';
import DashBoard from './components/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <div>
        <NavBar />
      </div>
      <div className='content'>
        <DashBoard />
      </div>
    </div>
  );
}

export default App;
