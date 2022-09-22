import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route exact path="/" element={<ProductList/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/:id/edit" element={<EditProduct/>}/>
        </Routes>
                            
      </BrowserRouter>

    </div>
  );
}
export default App;
