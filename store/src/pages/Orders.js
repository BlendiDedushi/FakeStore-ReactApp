import React, { useEffect, useState } from 'react'
import { getOrders } from '../helpers/storage'

function Orders() {
  const [orders, setOrders] = useState()

  useEffect(() => {
    setOrders(getOrders())
  }, [])

  return (
    <section className="py-5">
      <div className="container">
      {
        (orders && orders.length>0) ? 
          <>
          <h3 className="mb-4">{ orders.length } orders</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order, index) => <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{order.fullname}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>{order.items.length}</td>
                  </tr>)
              }
            </tbody>
          </table>
          </> : <p>0 Orders</p>
      }
      </div>
    </section>
  )
}

export default Orders