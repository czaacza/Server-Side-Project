// Function to show popup window
document.querySelector('.popup-button').addEventListener('click', showPopup);
document.getElementById('popup-close').addEventListener('click', closePopup);

function showPopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'block';
  document.querySelector('.overlay').classList.add('active');
}

// Function to close popup window
function closePopup() {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
  document.querySelector('.overlay').classList.remove('active');
}

// Close popup when clicked outside of it
document.querySelector('.overlay').addEventListener('click', function (event) {
  if (event.target === this) {
    closePopup();
  }
});
