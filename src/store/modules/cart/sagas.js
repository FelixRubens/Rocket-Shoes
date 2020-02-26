import { put, all, call, select, takeLatest } from 'redux-saga/effects';
import {toast} from 'react-toastify'
import api from '../../../services/api';
import { formateddPrice } from '../../../utils/intl'
import {addToCartSuccess, updateAmountSuccess} from './actions'

function* addToCart({id}) {

    const productExist = yield select(
        state => state.cart.find(p => p.id === id)
    )

    const stock = yield call(api.get, `/stock/${id}`)
    const stockAmount = stock.data.amount
    const currentAmount = productExist ? productExist.amount : 0

    const amount = currentAmount + 1

    if(amount > stockAmount){
        toast.error('Estoque Esgotado')
        return;
    }

    if(productExist){

        yield put(updateAmountSuccess(productExist, amount))

    }else {
        const response = yield api.call(api.get, `/products/${id}`)

        const data = {
            ...response.data,
            amount: 1,
            formateddPrice: formateddPrice(response.data.price)
        }

        yield put(addToCartSuccess(data))
    }

}


function* updateAmount({product, amount}) {
    if(amount < 0) return

    const productExist = yield select(
        state => state.cart.find(p => p.id === product.id)
    )

    if(productExist){

        const stock = yield call(api.get, `/stock/${product.id}`)
        const stockAmount = stock.data.amount

        if(amount <= stockAmount) yield put(updateAmountSuccess(productExist, amount))
        else{
            toast.error('Estoque Esgotado')
            return;
        }
    }
}

export default all([
    takeLatest('@cart/ADD_REQUEST', addToCart),
    takeLatest('@cart/UPDATE_REQUEST', updateAmount)
])
