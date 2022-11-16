import AddProduct from "./components/AddProduct"
import BidProduct from "./components/BidProduct"
import Products from "./components/Products"
import { Route, Routes } from "react-router-dom"
import socketIO from "socket.io-client"

const socket = socketIO.connect("http://localhost:4000")
function App() {
  localStorage.setItem("userName", 'TEST')
  return (
    <div>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/bids/add" element={<AddProduct socket={socket} />} />
        <Route path="/bids/bid/:name/:price" element={<BidProduct socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
