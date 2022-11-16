import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const AddProduct = ({ socket }) => {
  const [name, setName] = useState("")
  const [price, setPrice] = useState()
  const [price1, setPrice1] = useState()
  const [price2, setPrice2] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('addProduct', { name, price, price1, price2, owner: localStorage.getItem("userName") });
    navigate("/")
  }

  return (
    <div>
      <div className='addproduct__container'>
        <h2>Add a new bider</h2>
        <form className="addProduct__form" onSubmit={handleSubmit}>
          <label htmlFor='name'>Name of the bider</label>
          <input type="text" name='name' value={name} onChange={e => setName(e.target.value)} required />

          <label htmlFor='price'>BID 1</label>
          <input type="number" name='price' value={price} onChange={e => setPrice(e.target.value)} />
          <label htmlFor='price'>BID 2</label>
          <input type="number" name='price1' value={price1} onChange={e => setPrice1(e.target.value)} />
          <label htmlFor='price'>BID 3</label>
          <input type="number" name='price2' value={price2} onChange={e => setPrice2(e.target.value)} />

          <button className='addProduct__cta'>SEND</button>
        </form>
      </div>

    </div>
  )
}

export default AddProduct