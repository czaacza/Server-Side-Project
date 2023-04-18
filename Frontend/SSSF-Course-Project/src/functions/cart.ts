import { Book } from '../interfaces/Book';
import { Cart } from '../interfaces/Cart';
import router from '../router';

function addToCart(book: Book): void {
  // Get the current cart from the session storage
  const storedCart = sessionStorage.getItem('cart');
  const cart: Cart = storedCart ? JSON.parse(storedCart) : { books: [] };

  // Check if the book already exists in the cart
  const existingBookIndex = cart.books.findIndex(
    (cartItem) => cartItem.book._id === book._id
  );

  if (existingBookIndex !== -1) {
    // Increase the book's quantity
    cart.books[existingBookIndex].quantity += 1;
  } else {
    // Add the book to the cart with a quantity of 1
    cart.books.push({ book, quantity: 1 });
  }

  // Update the session storage with the new cart
  sessionStorage.setItem('cart', JSON.stringify(cart));

  // Update the cart's total price
  updateCartTotal(cart.books);
}

export function initAddToCartButtons(): void {
  const addToCartButtons =
    document.querySelectorAll<HTMLButtonElement>('.add-to-cart-btn');

  addToCartButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const bookData = button.dataset.book;

      if (bookData) {
        const book = JSON.parse(bookData);
        console.log('book', book);
        addToCart(book);
      }
    });
  });
}

function updateCartTotal(
  cartItems: { book: Book | string; quantity: number }[]
): void {
  let totalPrice = 0;

  cartItems.forEach((cartItem) => {
    if (typeof cartItem.book !== 'string') {
      totalPrice += cartItem.book.price * cartItem.quantity;
    }
  });

  const cartTotalPriceElements =
    document.querySelectorAll<HTMLElement>('.cart-total-price');
  if (cartTotalPriceElements) {
    cartTotalPriceElements.forEach((element) => {
      element.innerText = totalPrice.toFixed(2);
    });
  }

  const cartItemsList =
    document.querySelector<HTMLUListElement>('.cart-items-list');
  if (cartItemsList) {
    cartItemsList.innerHTML = '';
    cartItems.forEach((cartItem) => {
      if (typeof cartItem.book !== 'string') {
        cartItemsList.innerHTML += `
          <li class="cart-item-entry">
            <img src="${cartItem.book.image}" alt="${cartItem.book.title}" />
            <div>
              <strong>${cartItem.book.title}</strong><br />
              <small>by ${cartItem.book.author}</small>
              <span>Quantity: ${cartItem.quantity}</span>
            </div>
            <span>$${cartItem.book.price.toFixed(2)}</span>
          </li>
        `;
      }
    });
  }
}

export function initCart(): void {
  // Get the current cart from the session storage
  const storedCart = sessionStorage.getItem('cart');
  const cart: Cart = storedCart ? JSON.parse(storedCart) : { books: [] };

  // Update the cart's total price
  updateCartTotal(cart.books);
}

export function initCartButtonEventListener(): void {
  const cartButton = document.querySelector('.cart-item a');
  if (cartButton) {
    cartButton.addEventListener('click', (event) => {
      event.preventDefault();
      router.navigate('/cart');
    });
  }
}

export function getStoredCart(): Cart | null {
  const storedCart = sessionStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : null;
}
