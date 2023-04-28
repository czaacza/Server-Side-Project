import { doGraphQLFetch } from '../graphql/fetch';
import {
  addProductAsAdminQuery,
  deleteProductAsAdminQuery,
  getProductsQuery,
  updateProductAsAdminQuery,
} from '../graphql/queries';
import { Product } from '../interfaces/Product';
import router from '../router';

export async function fetchProducts() {
  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    getProductsQuery,
    {}
  );
  if (data && data.products) {
    return data.products;
  }

  return undefined;
}

export const productsClickHandler = (products: Product[]) => {
  const productDetailsForm = document.querySelector(
    '#product-details-form'
  ) as HTMLFormElement;

  const displayProductDetails = (product: Product) => {
    toggleAddProductForm(false);
    productDetailsForm.classList.remove('d-none');

    (document.querySelector('#product-id') as HTMLInputElement).value =
      product.id;
    (document.querySelector('#product-productname') as HTMLInputElement).value =
      product.productname;
    (document.querySelector('#product-email') as HTMLInputElement).value =
      product.email;
    (document.querySelector('#product-first-name') as HTMLInputElement).value =
      product.details!.firstName;
    (document.querySelector('#product-last-name') as HTMLInputElement).value =
      product.details!.lastName;
    (document.querySelector('#product-phone') as HTMLInputElement).value =
      product.details!.phone;
  };

  products.forEach((product) => {
    const listItem = document.querySelector(
      `.product-list-item[data-product-id="${product.id}"]`
    ) as HTMLElement;

    listItem.addEventListener('click', () => {
      displayProductDetails(product);
    });
  });
};

async function updateAdminProduct(
  product: Product
): Promise<{ success: boolean; product?: Product; error?: string }> {
  const token = sessionStorage.getItem('token')?.slice(1, -1);

  if (
    !product.email ||
    product.email.indexOf('@') === -1 ||
    product.email.indexOf('.') === -1
  ) {
    return { success: false, error: 'Email is required' };
  }

  if (!token) {
    return { success: false, error: 'Product not logged in' };
  }

  const variables = {
    product: {
      id: product.id,
      productname: product.productname,
      email: product.email,
      details: product.details,
    },
    updateProductAsAdminId: product.id,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    updateProductAsAdminQuery,
    variables,
    token
  );
  console.log(data);
  if (data) {
    return { success: true, product: data.updateProduct };
  }
  return { success: false, error: 'Update failed. Please try again.' };
}

export default async function initAdminProductUpdateButtonEventListener() {
  const updateProductButton = document.querySelector('#btn-update-product');

  updateProductButton?.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    const productId =
      document.querySelector<HTMLInputElement>('#product-id')?.value || '';
    const productname =
      document.querySelector<HTMLInputElement>('#product-productname')?.value ||
      '';
    const email =
      document.querySelector<HTMLInputElement>('#product-email')?.value || '';
    const firstName =
      document.querySelector<HTMLInputElement>('#product-first-name')?.value ||
      '';
    const lastName =
      document.querySelector<HTMLInputElement>('#product-last-name')?.value ||
      '';
    const phone =
      document.querySelector<HTMLInputElement>('#product-phone')?.value || '';

    const productToUpdate = {
      id: productId,
      productname,
      email,
      details: {
        firstName,
        lastName,
        phone,
      },
    };
    console.log('productToUpdate', productToUpdate);

    const updateResult = await updateAdminProduct(productToUpdate);
    if (updateResult.success) {
      showSuccessMessage();
    } else {
      showErrorMessage(updateResult.error);
    }
  });
}

async function deleteProductAsAdmin(
  productId: string,
  adminToken: string
): Promise<{ success: boolean; error?: string }> {
  const variables = {
    deleteProductAsAdminId: productId,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    deleteProductAsAdminQuery,
    variables,
    adminToken
  );

  if (data.deleteProductAsAdmin) {
    return { success: true };
  } else {
    return {
      success: false,
      error: 'Failed to delete product. Please try again.',
    };
  }
}

export const initDeleteButton = () => {
  const adminToken = sessionStorage.getItem('token')?.slice(1, -1) || '';

  const deleteProductButton = document.querySelector(
    '#btn-delete-product'
  ) as HTMLButtonElement;

  deleteProductButton.addEventListener('click', async () => {
    const productId = (
      document.querySelector('#product-id') as HTMLInputElement
    ).value;
    const result = await deleteProductAsAdmin(productId, adminToken);

    if (result.success) {
      // Show success message and remove product from the list
      showSuccessMessage('Product deleted successfully');
      const productItem = document.querySelector(
        `[data-product-id="${productId}"]`
      ) as HTMLElement;
      productItem.remove();
      // Clear product details form
      const productDetailsForm = document.querySelector(
        '#product-details-form'
      ) as HTMLFormElement;
      productDetailsForm.classList.add('d-none');
    } else {
      // Show error message
      showErrorMessage(result.error);
    }
  });
};

async function addNewProduct(
  productInput: any,
  adminToken: string
): Promise<{ success: boolean; product?: Product; error?: string }> {
  const variables = {
    product: productInput,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    addProductAsAdminQuery,
    variables,
    adminToken
  );
  console.log('data', data);

  if (data.addProductAsAdmin && data.addProductAsAdmin.product) {
    return { success: true, product: data.addProductAsAdmin.product };
  } else {
    return {
      success: false,
      error:
        data.register.message || 'Failed to add product. Please try again.',
    };
  }
}

export const initAddNewProductButton = () => {
  const adminToken = sessionStorage.getItem('token')?.slice(1, -1) || '';
  const addNewProductButton = document.querySelector(
    '#btn-add-product'
  ) as HTMLButtonElement;
  const productDetailsForm = document.querySelector(
    '#product-details-form'
  ) as HTMLFormElement;

  const clearProductDetailsForm = () => {
    productDetailsForm.reset();
    productDetailsForm.classList.add('d-none');
  };

  addNewProductButton.addEventListener('click', async () => {
    clearProductDetailsForm();
    productDetailsForm.classList.remove('d-none');
    toggleAddProductForm(true); // Show the password field

    productDetailsForm.onsubmit = async (event: Event) => {
      event.preventDefault();

      const newProduct = {
        productname: (
          document.querySelector('#product-productname') as HTMLInputElement
        ).value,
        email: (document.querySelector('#product-email') as HTMLInputElement)
          .value,
        password: (
          document.querySelector('#product-password') as HTMLInputElement
        ).value,
        details: {
          firstName: (
            document.querySelector('#product-first-name') as HTMLInputElement
          ).value,
          lastName: (
            document.querySelector('#product-last-name') as HTMLInputElement
          ).value,
          phone: (document.querySelector('#product-phone') as HTMLInputElement)
            .value,
        },
      };

      const result = await addNewProduct(newProduct, adminToken);

      if (result.success && result.product) {
        showSuccessMessage('Product added successfully');
        const productsList = document.querySelector(
          '.products-list'
        ) as HTMLElement;
        productsList.innerHTML += generateProductListItem(result.product);

        toggleAddProductForm(false);
      } else {
        showErrorMessage(result.error);
      }
    };
  });
};

function showSuccessMessage(message?: string) {
  const successElement = document.getElementById('admin-success-message');
  if (successElement) {
    if (message) {
      successElement.innerText = message;
    }
    successElement.style.display = 'block';
    successElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      successElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      successElement.style.opacity = '0';
      setTimeout(() => {
        successElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}

function showErrorMessage(error: string | undefined) {
  const errorElement = document.getElementById('admin-error-message');
  errorElement!.innerText = error || 'An error occurred';

  console.log(errorElement);

  if (errorElement) {
    errorElement.style.display = 'block';
    errorElement.style.transition = 'opacity 1s';
    setTimeout(() => {
      errorElement.style.opacity = '1';
    }, 50);

    setTimeout(() => {
      errorElement.style.opacity = '0';
      setTimeout(() => {
        errorElement.style.display = 'none';
      }, 1000);
    }, 3000);
  }
}

export function filterProducts(
  products: Product[],
  searchText: string
): Product[] {
  if (!searchText) {
    return products;
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.productname.toLowerCase().includes(searchText.toLowerCase()) ||
      product.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return filteredProducts;
}

export const initSearchProducts = (products: Product[]) => {
  const searchInput = document.querySelector(
    '#search-products'
  ) as HTMLInputElement;
  const productsList = document.querySelector('.products-list') as HTMLElement;

  searchInput.addEventListener('input', () => {
    const searchText = searchInput.value;
    const filteredProducts = filterProducts(products, searchText);
    productsList.innerHTML = generateProductsList(filteredProducts);
  });
};

export function generateProductsList(products: Product[] | undefined) {
  if (!products) {
    return '';
  }

  return products
    .map(
      (product) => `
        <li class="list-group-item product-list-item product-list-item" data-product-id="${product.id}">
          <span class="product-name">${product.productname}</span> - <span class="product-email">${product.email}</span>
        </li>
      `
    )
    .join('');
}

function generateProductListItem(product: Product): string {
  return `
    <li class="list-group-item product-list-item" data-product-id="${product.id}">
      <span class="product-name">${product.productname}</span> - <span class="product-email">${product.email}</span>
    </li>
  `;
}

function toggleAddProductForm(visible: boolean) {
  const passwordFieldContainer = document.getElementById(
    'password-field-container'
  );
  const addProductFormButton = document.getElementById('btn-add-product-form');

  const updateProductButton = document.getElementById('btn-update-product');
  const deleteProductButton = document.getElementById('btn-delete-product');

  if (visible) {
    passwordFieldContainer!.style.display = 'block';
    addProductFormButton!.style.display = 'block';

    updateProductButton!.style.display = 'none';
    deleteProductButton!.style.display = 'none';
  } else {
    passwordFieldContainer!.style.display = 'none';
    addProductFormButton!.style.display = 'none';

    updateProductButton!.style.display = 'inline-block';
    deleteProductButton!.style.display = 'inline-block';
  }
}
