export default function navbar(user?: any): string {
  const navbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">
    <img src="/img/logo-no-bg-no-text.png" height="50" alt="Responsive image" />
  </a>
  <button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarSupportedContent"
    aria-controls="navbarSupportedContent"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/"
          >Home <span class="sr-only">(current)</span></a
        >
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">About us</a>
      </li>
      <li class="nav-item active">
        <a class="nav-link" href="#">Contact</a>
      </li>
      
      ${
        user
          ? `
      <li class="nav-item active">
        <a
          class="nav-link btn btn-account btn-primary"
          id="account-button"
          href="#"
          >My account</a
        >
      </li>
      `
          : ''
      }

    </ul>

    <ul class="navbar-nav navbar-right">

    ${
      !user
        ? `
      <li class="nav-item active">
        <a
          class="nav-link btn signin-btn signin-button"
          id="signin-button"
          href="#"
          >Sign in</a
        >
      </li>
      <li class="nav-item active">
        <a
          class="nav-link btn btn-primary signup-btn popup-button"
          id="popup-button"
          href="#"
          >Sign up</a
        >
      </li>
      `
        : ''
    }

      ${
        user
          ? `<li class="nav-item active">
      <li class="nav-item active">
        <a
          class="nav-link btn btn-primary logout-btn"
          id="logout-button"
          href="#"
          >Log out</a
        >
      </li>
      `
          : ''
      }

      <li class="nav-item active cart-item">
        <a class="nav-link" href="/cart/"
          >Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-cart"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
            />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</nav>
`;
  return navbar;
}