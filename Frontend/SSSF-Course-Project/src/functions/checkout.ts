export const checkIfCheckoutAllowed = () => {
  if (sessionStorage.getItem('checkoutAllowed') !== 'true') {
    return false;
  } else {
    sessionStorage.removeItem('checkoutAllowed');
    return true;
  }
};
