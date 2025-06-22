// Prompt: Alert when adopt button clicked
function adoptPet() {
  alert("Thank you for choosing to adopt a pet! 🐾");
}

// Prompt: List of pets to display dynamically
const pets = [
  { name: "Buddy", type: "Dog", age: 3, img: "img/dogs/dog01.jpg" },
  { name: "Charlie", type: "Dog", age: 2, img: "img/dogs/dog02.jpg" },
  { name: "Whiskers", type: "Cat", age: 2, img: "img/cats/cat01.jpg" },
  { name: "Mittens", type: "Cat", age: 2, img: "img/cats/cat02.jpg" },
  { name: "Leo", type: "Cat", age: 1, img: "img/cats/cat03.jpg" },
  { name: "Rex", type: "Bird", age: 4, img: "img/birds/bird01.jpg" },
  { name: "BoBo", type: "Capybara", age: 1, img: "img/capybaras/capybara01.jpg" },
  { name: "Amy", type: "Capybara", age: 4, img: "img/capybaras/capybara02.jpg" }
];

// Function to filter pets by type
function filterPets() {
  const filterSelect = document.getElementById('pet-type-filter');
  const selectedType = filterSelect.value;
  
  const petList = document.getElementById('pet-list');
  if (!petList) return;
  
  // Clear current pets
  petList.innerHTML = '';
  
  // Filter pets based on selection
  const filteredPets = selectedType === 'all' 
    ? pets 
    : pets.filter(pet => pet.type.toLowerCase() === selectedType);
  
  // Display filtered pets
  filteredPets.forEach(pet => {
    const petItem = document.createElement('div');
    petItem.className = 'pet';
    petItem.innerHTML = `
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button onclick="adoptPet()">Adopt Now</button>
    `;
    petList.appendChild(petItem);
  });
}

// Prompt: Load pets when page is ready
function loadPets() {
  const petList = document.getElementById('pet-list');
  if (!petList) return;

  pets.forEach(pet => {
    const petItem = document.createElement('div');
    petItem.className = 'pet';
    petItem.innerHTML = `
      <img src="${pet.img}" alt="${pet.name}">
      <h3>${pet.name}</h3>
      <p>Type: ${pet.type}</p>
      <p>Age: ${pet.age} years</p>
      <button onclick="adoptPet()">Adopt Now</button>
    `;
    petList.appendChild(petItem);
  });

  console.log('Pets loaded successfully.');
}

document.addEventListener('DOMContentLoaded', loadPets);
