import Modal from "../UI/Modal";
import classes from "./Card.module.css";
import CartContext from "../../store/cart-context";
import { useContext } from "react";

const Cart = (props) => {
  const cartContext = useContext(CartContext);

  // Helper function to calculate total quantity and amount
  const { items } = cartContext;

  // Helper function to group items by id and calculate total quantity
  const groupItems = (items) => {
    const groupedItemsMap = new Map();
    items.forEach((item) => {
      if (groupedItemsMap.has(item.id)) {
        const existingItem = groupedItemsMap.get(item.id);
        existingItem.quantity += Number(item.quantity);
      } else {
        groupedItemsMap.set(item.id, { ...item });
      }
    });
    return Array.from(groupedItemsMap.values());
  };

  // Helper function to calculate total amount
  const calculateTotalAmount = (groupedItems) => {
    let totalAmount = 0;
    groupedItems.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  };

  const groupedItems = groupItems(items);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {groupedItems.map((groupedItem) => (
        <li key={groupedItem.id}>
          {groupedItem.name} x {groupedItem.quantity} - ₹
          {(groupedItem.price * groupedItem.quantity).toFixed(2)}
        </li>
      ))}
    </ul>
  );

  // Calculate total amount
  const totalAmount = calculateTotalAmount(groupedItems);

  return (
    <Modal onCloseCart={props.onCloseCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCloseCart} className={classes["button--alt"]}>
          Close
        </button>
        <button className={classes.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
