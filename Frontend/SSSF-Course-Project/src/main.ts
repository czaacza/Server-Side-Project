// import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <!-- hero section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6">
            <h1 class="pb-4 hero-heading">
              Unleash the power of digital reading
            </h1>
            <p class="lead">
              Access favourite e-books at your fingertips. Discover and purchase
              your next great read on our user-friendly digital platform, where
              convenience meets accessibility. Experience the power of digital
              reading with eBookery.
            </p>
            <button class="btn btn-primary px-4 py-3">Get Started</button>
          </div>
          <div class="col-md-6">
            <img src="/img/logo.png" class="img-fluid" alt="Hero Image" />
          </div>
        </div>
      </div>
    </section>

    <!-- <%- include('popup.ejs') %> <%- include('signin.ejs') %> -->

    <!-- product section -->

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

    <!-- testimonials section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="text-center mb-5">What Our Customers Say</h2>
        <div class="row d-flex align-items-stretch">
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="img-container">
                <img
                  class="card-img-top testimonial-img"
                  src="img/person1.jpg"
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <p class="card-text">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat."
                </p>
                <p class="font-weight-bold text-right">- John Doe</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="img-container">
                <img
                  class="card-img-top testimonial-img"
                  src="img/person2.jpg"
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <p class="card-text">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat."
                </p>
                <p class="font-weight-bold text-right">- Jane Doe</p>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card mb-4">
              <div class="img-container">
                <img
                  class="card-img-top testimonial-img"
                  src="img/person3.jpg"
                  alt="Card image cap"
                />
              </div>
              <div class="card-body">
                <p class="card-text">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat."
                </p>
                <p class="font-weight-bold text-right">- John Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
