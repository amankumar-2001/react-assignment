import Navbar from './Components/Navbar';
import Homescreen from './screens/Homescreen';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cartscreen from './screens/Cartscreen';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" exact element={<Homescreen />} />
          <Route path="/cart" exact element={<Cartscreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
    