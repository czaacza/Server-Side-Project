export default function productSection(): string {
  const modalHtml = `
    <section class="product-section">
          <div class="container">
            <h2 class="text-center mb-5">Products</h2>
            <div class="row products-row gx-4">
              <div class="col-md-4">
                <div class="card mb-4">
                  <img class="card-img-top" src="/img/book.png" alt="Book Cover" />
                  <div class="card-body">
                    <h5 class="card-title">Book Title</h5>
                    <p class="card-text">Author Name</p>
                    <p class="card-text">$19.99</p>
                    <button class="btn btn-primary add-to-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-4">
                  <img class="card-img-top" src="/img/book.png" alt="Book Cover" />
                  <div class="card-body">
                    <h5 class="card-title">Book Title</h5>
                    <p class="card-text">Author Name</p>
                    <p class="card-text">$24.99</p>
                    <button class="btn btn-primary add-to-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="card mb-4">
                  <img class="card-img-top" src="/img/book.png" alt="Book Cover" />
                  <div class="card-body">
                    <h5 class="card-title">Book Title</h5>
                    <p class="card-text">Author Name</p>
                    <p class="card-text">$17.99</p>
                    <button class="btn btn-primary add-to-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    `;
  return modalHtml;
}
