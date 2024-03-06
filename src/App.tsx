import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Test from './pages/Test';
import HomePage from './pages/Home';
import CardPage from './pages/Card';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/test" Component={Test} />
          <Route path="/card/:id" Component={CardPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
