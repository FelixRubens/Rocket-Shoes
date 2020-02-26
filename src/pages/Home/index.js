import React, {useEffect, useState} from 'react';
import { MdAddShoppingCart } from 'react-icons/md'
import { connect, useSelector, useDispatch } from 'react-redux'
import { formateddPrice }  from '../../utils/intl'
import api from '../../services/api'

import * as cartActions from '../../store/modules/cart/actions'

import { ProductList } from './styles';


function Home({amount}) {
    const [products, setProducts] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        async function getProducts(){
            const response = await api.get('/products')

            const values = response.data.map((value) => ({
                ...value,
                formateddPrice: formateddPrice(value.price)
            }))

            setProducts(values)
        }

        getProducts()
    }, [])


  return (
    <ProductList>
        {products.map(product => (
            <li key={product.id}>
            <img
                src={product.image}
                alt="Tênis"
            />
            <strong>{product.title}</strong>
            <span>{product.formateddPrice}</span>

            <button type="button" onClick={() => dispatch(cartActions.addToCartRequest(product.id))}>
                <div>
                    <MdAddShoppingCart size={20} color='#fff'/> {amount[product.id] || 0}
                </div>

                <span>ADICIONAR AO CARRINHOS</span>
            </button>
        </li>
        ))}
    </ProductList>
  );
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
      amount[product.id] = product.amount
      return amount
  }, {})
});

export default connect(mapStateToProps)(Home)
