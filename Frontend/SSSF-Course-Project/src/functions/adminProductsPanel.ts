import { doGraphQLFetch } from '../graphql/fetch';
import {
  addProductAsAdminQuery,
  deleteProductAsAdminQuery,
  getProductsQuery,
  updateProductAsAdminQuery,
} from '../graphql/queries';
import { Book as Product } from '../interfaces/Book';
import router from '../router';
import { showErrorMessage, showSuccessMessage } from './admin';

export const initUserSectionEventListeners = (): void => {
  initAdminProductUpdateButtonEventListener();
  initDeleteButton();
  initAddNewProductButton();
};

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
    productDetailsForm.classList.remove('d-none');

    (document.querySelector('#product-id') as HTMLInputElement).value =
      product._id;
    (document.querySelector('#product-title') as HTMLInputElement).value =
      product.title;
    (document.querySelector('#product-author') as HTMLInputElement).value =
      product.author;
    (document.querySelector('#product-description') as HTMLInputElement).value =
      product.description;
    (document.querySelector('#product-price') as HTMLInputElement).value =
      product.price.toFixed(2).toString();
    (document.querySelector('#product-image') as HTMLInputElement).value =
      product.image;
  };

  products.forEach((product) => {
    const listItem = document.querySelector(
      `.product-list-item[data-product-id="${product._id}"]`
    ) as HTMLElement;

    listItem.addEventListener('click', () => {
      displayProductDetails(product);
    });
  });
};

async function updateAdminProduct(
  product: Product
): Promise<{ success: boolean; product?: Product; error?: string }> {
  if (
    !product.author ||
    product.author.indexOf('@') === -1 ||
    product.author.indexOf('.') === -1
  ) {
    return { success: false, error: 'Email is required' };
  }

  const variables = {
    bookModifyInput: {
      id: product._id,
      title: product.title,
      author: product.author,
      description: product.description,
      price: product.price,
      image: product.image,
    },
    updateProductAsAdminId: product._id,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    updateProductAsAdminQuery,
    variables
  );
  console.log(data);
  if (data) {
    return { success: true, product: data.updateBook };
  }
  return { success: false, error: 'Update failed. Please try again.' };
}

export default async function initAdminProductUpdateButtonEventListener() {
  const updateProductButton = document.querySelector('#btn-update-product');

  updateProductButton?.addEventListener('click', async (event: Event) => {
    event.preventDefault();
    const productId =
      document.querySelector<HTMLInputElement>('#product-id')?.value || '';
    const title =
      document.querySelector<HTMLInputElement>('#product-title')?.value || '';
    const author =
      document.querySelector<HTMLInputElement>('#product-author')?.value || '';
    const description =
      document.querySelector<HTMLInputElement>('#product-description')?.value ||
      '';
    const price =
      document.querySelector<HTMLInputElement>('#product-price')?.value || '';
    const image =
      document.querySelector<HTMLInputElement>('#product-image')?.value || '';

    const productToUpdate = {
      _id: productId,
      title,
      author,
      description,
      price: parseFloat(price),
      image,
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
  productId: string
): Promise<{ success: boolean; error?: string }> {
  const variables = {
    deleteBookId: productId,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    deleteProductAsAdminQuery,
    variables
  );

  if (data.deleteBook) {
    return { success: true };
  } else {
    return {
      success: false,
      error: 'Failed to delete product. Please try again.',
    };
  }
}

export const initDeleteButton = () => {
  const deleteProductButton = document.querySelector(
    '#btn-delete-product'
  ) as HTMLButtonElement;

  deleteProductButton.addEventListener('click', async () => {
    const productId = (
      document.querySelector('#product-id') as HTMLInputElement
    ).value;
    const result = await deleteProductAsAdmin(productId);

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
  productInput: any
): Promise<{ success: boolean; product?: Product; error?: string }> {
  const variables = {
    bookInput: productInput,
  };

  const data = await doGraphQLFetch(
    `${import.meta.env.VITE_GRAPHQL_URL}`,
    addProductAsAdminQuery,
    variables
  );
  console.log('data', data);

  if (data.CreateBook) {
    return { success: true, product: data.CreateBook };
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

    productDetailsForm.onsubmit = async (event: Event) => {
      event.preventDefault();

      const newProduct = {
        title: (document.querySelector('#product-title') as HTMLInputElement)
          .value,
        author: (document.querySelector('#product-author') as HTMLInputElement)
          .value,
        description: (
          document.querySelector('#product-description') as HTMLInputElement
        ).value,
        price: parseFloat(
          (document.querySelector('#product-price') as HTMLInputElement).value
        ),
        image: (document.querySelector('#product-image') as HTMLInputElement)
          .value,
      };

      const result = await addNewProduct(newProduct);

      if (result.success && result.product) {
        showSuccessMessage('Product added successfully');
        const productsList = document.querySelector(
          '.products-list'
        ) as HTMLElement;
        productsList.innerHTML += generateProductListItem(result.product);
      } else {
        showErrorMessage(result.error);
      }
    };
  });
};

export function filterProducts(
  products: Product[],
  searchText: string
): Product[] {
  if (!searchText) {
    return products;
  }

  const filteredProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(searchText.toLowerCase()) ||
      product.author.toLowerCase().includes(searchText.toLowerCase())
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
        <li class="list-group-item product-list-item product-list-item" data-product-id="${product._id}">
          <span class="product-name">${product.title}</span> - <span class="product-author">${product.author}</span>
        </li>
      `
    )
    .join('');
}

function generateProductListItem(product: Product): string {
  return `
    <li class="list-group-item product-list-item" data-product-id="${product._id}">
      <span class="product-name">${product.title}</span> - <span class="product-author">${product.author}</span>
    </li>
  `;
}
