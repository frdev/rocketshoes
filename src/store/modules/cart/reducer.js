import produce from 'immer';
import { formatPrice } from '../../../util/format';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.product.id);

        if (productIndex >= 0) {
          draft[productIndex].amount += 1;
          draft[productIndex].subtotal = formatPrice(
            draft[productIndex].price * draft[productIndex].amount
          );
        } else {
          draft.push({
            ...action.product,
            amount: 1,
            subtotal: formatPrice(action.product.price),
          });
        }
      });

    case '@cart/REMOVE':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) draft.splice(productIndex, 1);
      });

    case '@cart/UPDATE_AMOUNT':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = action.amount;
          draft[productIndex].subtotal = formatPrice(
            draft[productIndex].price * draft[productIndex].amount
          );
        }
      });

    default:
      return state;
  }
}
