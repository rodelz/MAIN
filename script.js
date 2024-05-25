// Function to add item to cart
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} has been added to your cart.`);
}

function displayCartItems() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    let totalAmount = 0;
    cart.forEach(item => {
      let itemElement = document.createElement('div');
      itemElement.className = 'cart-item';
      itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="250px">
        <h3>${item.name}</h3>
        <p>Price: ₱${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
      `;

      totalAmount += item.price * item.quantity;
      cartItemsContainer.appendChild(itemElement);
    });

    let totalAmountElement = document.createElement('div');
    totalAmountElement.className = 'total-amount';
    totalAmountElement.innerHTML = `<h3>Total Amount: ₱${totalAmount.toFixed(2)}</h3>`;
    cartItemsContainer.appendChild(totalAmountElement);
  }
}

function clearCart() {
  localStorage.removeItem('cart');
  displayCartItems();
  alert('The cart has been cleared.');
}

function placeOrder(event) {
  event.preventDefault();
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let phone = document.getElementById('phone').value;
  let address = document.getElementById('address').value;

  let orderDetails = {
    name,
    email,
    phone,
    address,
    cart: JSON.parse(localStorage.getItem('cart')) || []
  };

  console.log('Order Placed:', orderDetails);
  alert('Your order has been placed!');

  clearCart();

  document.getElementById('orderForm').reset();
}

if (window.location.pathname.endsWith('cart.html')) {
  document.addEventListener('DOMContentLoaded', displayCartItems);
}
