import { User } from '../../interfaces/User';

export default function accountSection(user?: User): string {
  const { id, username, email, details } = user || {};
  const { firstName, lastName, phone } = details || {};

  const modalHtml = `<div class="container">
    <h2 class="text-center mt-5 mb-5">Welcome, <span id="username">${
      username || 'User'
    }</span>!</h2>
    <div class="row mt-5">
      <div class="col-md-4 text-center">
        <img
          src="img/person1.jpg"
          alt="Profile picture"
          id="profilePicture"
          class="profile-picture"
        />
        <input
          type="file"
          id="changeProfilePicture"
          class="form-control mt-2"
          accept="image/*"
          style="display: none"
        />
        <button class="btn btn-secondary mt-2" id="changePictureBtn">
          Change Profile Picture
        </button>
      </div>
      <div class="col-md-8">
        <h3>Edit Account Details</h3>
        <form id="accountForm">
          <div class="mb-3">
            <label for="firstName" class="form-label">First Name</label>
            <input type="text" class="form-control" id="firstName" value="${
              firstName || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" id="lastName" value="${
              lastName || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" value="${
              email || ''
            }" required />
          </div>
          <div class="mb-3">
            <label for="phoneNumber" class="form-label">Phone Number</label>
            <input
              type="tel"
              class="form-control"
              id="phoneNumber"
              value="${phone || ''}"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
  `;
  return modalHtml;
}
