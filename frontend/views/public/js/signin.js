// Function to show popup window
document.querySelector('.signin-button').addEventListener('click', showSignin);
document.getElementById('signin-close').addEventListener('click', closeSignin);

function showSignin() {
  const signin = document.getElementById('signin');
  signin.style.display = 'block';
  document.querySelector('.overlay').classList.add('active');
}

// Function to close signin window
function closeSignin() {
  const signin = document.getElementById('signin');
  console.log('signin', signin);
  signin.style.display = 'none';
  document.querySelector('.overlay').classList.remove('active');
}

// Close signin when clicked outside of it
document.querySelector('.overlay').addEventListener('click', function (event) {
  if (event.target === this) {
    closeSignin();
  }
});
