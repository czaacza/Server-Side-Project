import { Book } from '../../interfaces/Book';

export default function adminProductPanel(books?: Book[]): string {
  const modalHtml = `
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4">
          <h3>Products</h3>
          <input type="text" class="form-control mb-3" id="search-products" placeholder="Search products...">
          <ul class="list-group products-list">
            
          </ul>
          <button class="btn btn-primary mt-3 btn-squared" id="btn-add-product">Add New Product</button>
        </div>
        <div class="col-md-8">
          <h3>Product Details</h3>
          <form id="product-details-form" class="d-none">
            <input type="hidden" id="product-id">
            <div class="mb-3" id="productname-field-container">
              <label for="product-productname" class="form-label">Productname</label>
              <input type="text" class="form-control" id="product-productname" required>
            </div>
            <div class="mb-3" id="password-field-container">
              <label for="product-password" class="form-label">Password</label>
              <input type="password" class="form-control" id="product-password" required>
            </div>
            <div class="mb-3">
              <label for="product-email" class="form-label">Email</label>
              <input type="email" class="form-control" id="product-email" required>
            </div>
            <div class="mb-3">
              <label for="product-first-name" class="form-label">First Name</label>
              <input type="text" class="form-control" id="product-first-name" required>
            </div>
            <div class="mb-3">
              <label for="product-last-name" class="form-label">Last Name</label>
              <input type="text" class="form-control" id="product-last-name" required>
            </div>
            <div class="mb-3">
              <label for="product-phone" class="form-label">Phone</label>
              <input type="tel" class="form-control" id="product-phone" required>
            </div>
            <button type="submit" class="btn btn-primary btn-squared btn-danger" id="btn-update-product">Update Product</button>
            <button type="button" class="btn btn-danger btn-squared" id="btn-delete-product">Delete Product</button>
            <button type="submit" class="btn btn-primary btn-squared" id="btn-add-product-form">Add new Product</button>
          </form>
            <div id="admin-success-message" class="success-message">
            Profile details updated successfully!
          </div>
          <div id="admin-error-message" class="error-message">
            Error updating profile details. Please try again.
          </div>  
        </div>
      </div>
    </div>
  `;

  return modalHtml;
}
