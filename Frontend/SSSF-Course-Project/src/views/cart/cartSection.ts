export default function cartSection(): string {
  const modalHtml = `<section class="cart-section">
    <div class="container">
      <h2 class="text-center mb-5">Your Shopping Cart</h2>
      <div class="row">
        <div class="col-md-8 cart-item">
          <div class="card mb-4">
            <div class="row no-gutters">
              <div class="col-md-3">
                <img
                  class="card-img cart-item-img"
                  src="../img/book.png"
                  alt="Book Cover"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Book Title</h5>
                  <p class="card-text">Author Name</p>
                  <div class="form-group">
                    <label for="quantitySelect">Quantity:</label>
                    <select
                      class="form-control cart-item-select"
                      id="quantitySelect"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <p class="card-text">
                    <strong>Price: </strong>
                    <span id="price">$19.99</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Order Summary</h5>
              <p class="card-text">
                Subtotal: <span id="subtotal">$19.99</span>
              </p>
              <p class="card-text">Shipping: Free</p>
              <h4 class="card-title">
                Total: <span id="total">$19.99</span>
              </h4>
              <a href="/checkout" class="btn btn-primary btn-block mt-3">
                Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
`;
  return modalHtml;
}
