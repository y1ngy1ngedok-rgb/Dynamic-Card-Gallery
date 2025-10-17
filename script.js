// Elements
const fetchBtn = document.getElementById("fetchBtn");
const openFormBtn = document.getElementById("openFormBtn");
const cardContainer = document.getElementById("cardContainer");
const cardForm = document.getElementById("cardForm");
const modal = new bootstrap.Modal(document.getElementById("cardModal"));

// Function to create card HTML
function createCard({ title, description, image }) {
  return `
    <div class="col-md-4 col-sm-6">
      <div class="card shadow-sm h-100">
        <img src="${image}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
        </div>
      </div>
    </div>
  `;
}

// Display cards using map() – Higher-order function
function displayCards(cardsArray) {
  const cardsHTML = cardsArray.map(createCard).join("");
  cardContainer.innerHTML += cardsHTML;
}

// Fetch new cards from an API
async function fetchNewCards() {
  const res = await fetch("https://fakestoreapi.com/products?limit=3");
  const data = await res.json();
  
  const cards = data.map(item => ({
    title: item.title,
    description: item.description.slice(0, 80) + "...",
    image: item.image
  }));

  displayCards(cards);
}

// Handle form submit
cardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = {
    title: document.getElementById("titleInput").value,
    description: document.getElementById("descInput").value,
    image: document.getElementById("imgInput").value
  };

  displayCards([newCard]); // add manually created card
  cardForm.reset();
  modal.hide();
});

// Event listeners
fetchBtn.addEventListener("click", fetchNewCards);
openFormBtn.addEventListener("click", () => modal.show());
