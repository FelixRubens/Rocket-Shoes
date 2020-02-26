import React from 'react';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { Container, ProductTable, Total } from './styles';

import { formateddPrice } from '../../utils/intl'
import * as cartActions from '../../store/modules/cart/actions'

function Cart({ total, products, updateAmountRequest, removeProductFromCart }) {

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
                            <button type="button" onClick={() => updateAmountRequest(product, product.amount - 1)}>
                                <MdRemoveCircleOutline size={20} color="#7159c1" />
                            </button>
                            <input type="number" readOnly value={product.amount}/>
                            <button type="button" onClick={() => updateAmountRequest(product, product.amount + 1)}>
                                <MdAddCircleOutline size={20} color="#7159c1" />
                            </button>
                        </div>
                    </td>
                    <td>
                        <strong>{product.subtotal}</strong>
                    </td>
                    <td>
                        <button type="button" onClick={() => removeProductFromCart(product)}>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(cartActions, dispatch);

const mapStateToProps = state => ({
    products: state.cart.map(product => ({
        ...product,
        subtotal: formateddPrice(product.price * product.amount)
    })),
    total: formateddPrice(state.cart.reduce((total, product) => total + (product.price * product.amount), 0))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
