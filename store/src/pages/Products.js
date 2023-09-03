import React, { useContext } from 'react'
import { ProductsContext } from '../context/ProductsContext'
import ProductComponent from '../components/ProductComponent'

function Products() {
  const data = useContext(ProductsContext)
  return (
    <div className='container py-4'>
      <div className='row'>
        {data !== null && 
        data.map(product => 
          <div className="col-3 mb-3" key={product.id}>
            <ProductComponent product={product} />
          </div>)
        }
      </div>
    </div>
  )
}

export default Products
