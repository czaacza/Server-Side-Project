function addToCart(book: any): void {
  // Get the current cart items from the session storage
  const storedCartItems = sessionStorage.getItem('cartItems');
  const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];

  // Add the book to the cart
  cartItems.push(book);

  // Update the session storage with the new cart items
  sessionStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Update the cart's total price
  updateCartTotal(cartItems);
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

function updateCartTotal(books: any[]): void {
  const totalPrice = books.reduce((sum, book) => sum + book.price, 0);
  const totalPriceElement =
    document.querySelector<HTMLDivElement>('.cart-total-price');

  console.log(totalPriceElement);

  if (totalPriceElement) {
    totalPriceElement.textContent = `${totalPrice.toFixed(2)}`;
  }
}
