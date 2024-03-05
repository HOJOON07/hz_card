import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import Test from './pages/Test';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/test" Component={Test} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
