import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Container, ProductTable, Total } from './styles';

import { formateddPrice } from '../../utils/intl'
import * as cartActions from '../../store/modules/cart/actions'

export default function Cart() {

    const dispatch = useDispatch()

    const products = useSelector(state=> state.cart.map(product => ({
        ...product,
        subtotal: formateddPrice(product.price * product.amount)
    })))

    const total = useSelector(state=> formateddPrice(state.cart.reduce((total, product) => total + (product.price * product.amount), 0)))

    return (
    <Container>
        <ProductTable>
            <thead>
                <tr>
                    <th />
                    <th>PRODUTO</th>
                    <th>QTD</th>
                    <th>SUBTOTAL</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr>
                    <td>
                        <img src={product.image} alt={product.title} />
                    </td>
                    <td>
                        <strong>{product.title}</strong>
                        <span>{product.formateddPrice}</span>
                    </td>
                    <td>
                        <div>
                            <button type="button" onClick={() => dispatch(cartActions.updateAmountRequest(product, product.amount - 1))}>
                                <MdRemoveCircleOutline size={20} color="#7159c1" />
                            </button>
                            <input type="number" readOnly value={product.amount}/>
                            <button type="button" onClick={() => dispatch(cartActions.updateAmountRequest(product, product.amount + 1))}>
                                <MdAddCircleOutline size={20} color="#7159c1" />
                            </button>
                        </div>
                    </td>
                    <td>
                        <strong>{product.subtotal}</strong>
                    </td>
                    <td>
                        <button type="button" onClick={() =>dispatch(cartActions.removeProductFromCart(product))}>
                            <MdDelete size={20} color="#7159c1" />
                        </button>
                    </td>
                </tr>
                ))}

            </tbody>
        </ProductTable>
        <footer>
            <button type="button">Finalizar Pedido</button>

            <Total>
                <span>TOTAL</span>
                <strong>{total}</strong>
            </Total>
        </footer>
    </Container>
    );
}
