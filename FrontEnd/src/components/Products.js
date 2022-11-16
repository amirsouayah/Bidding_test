import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const Products = () => {

  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(true)
  const [Winner, setWinner] = useState('No Winner')
  const [Prev, setPrev] = useState('')
  const [Max, setMax] = useState([])
  const Reserve = 100

  useEffect(() => {
    if (products !== null) {

      products.forEach(element => {
        let Mx = null
        if (element.price == null) {
          element.price = ''

        } if (element.price1 == null) {
          element.price1 = ''
        } if (element.price2 == null) {
          element.price2 = ''
        }
        if ((element.price1 > element.price) && (element.price1 > element.price2)) {
          Mx = element.price1
        }
        else if ((element.price2 > element.price1) && (element.price2 > element.price)) {
          Mx = element.price2
        } else {
          Mx = element.price
        }
        setMax(oldArray => [...oldArray, { name: element.name, price: Mx }])

      });

    }
  }, [products])

  useEffect(() => {
    if (Max.length > 0) {

      let MaximumBid = Math.max(...Max.map(o => o.price))

      var PriceBid = Max.filter(function (item) {
        return item.price < MaximumBid;
      });

      let PrevMaximumBids = Math.max(...PriceBid.map(o => o.price))

      var newArray = Max.filter(function (item) {
        return item.price == MaximumBid && item.name;
      });

      if (PrevMaximumBids !== -Infinity && PrevMaximumBids > Reserve) {
        setPrev(PrevMaximumBids)
      } else {

        setPrev(newArray[0].price)

      }
      setWinner(newArray[0].name)
    } else {
      setWinner('No Winner')
    }

  }, [Max])

  useEffect(() => {
    const fetchProducts = () => {
      fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
        setProducts(data.products)
        setLoading(false)

      })
    }
    fetchProducts()
  }, [])

  return (
    <div>
      <div className='table__container'>
        <Link to="/bids/add" className='products__cta'>ADD Buyers</Link>
        <div>Reserve : {Reserve} </div>
        <table>
          <thead>
            <tr>
              <th>Buyer Name</th>
              <th>Bids 1</th>
              <th>Bids 2</th>
              <th>Bids 3</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td>Loading</td></tr> : products.map(product => (
              <tr key={`${product.name}${product.price}`}>
                <td>{product.name}</td>
                <td>{product.price}  </td>
                <td>{product.price1}  </td>
                <td>{product.price2} </td>
              </tr>
            ))}

          </tbody>
        </table>
        <div>WINNER : {Winner}</div>
        <div>Mount : {(Prev > Reserve) ? Prev : "le prix n'est pas correct"} </div>
      </div>

    </div>
  )
}

export default Products