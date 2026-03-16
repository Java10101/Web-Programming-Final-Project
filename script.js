//This initializes the variables for the slide carousel
const slides = [
    {
        image: "https://m.media-amazon.com/images/I/81sBKBIcwvL._UF1000,1000_QL80_.jpg",
        caption: "Abbey Road by The Beatles - $29.99",
        alt: "Abbey Road album cover"
    },
    {
        image: "images/rumours.jpg",
        caption: "Rumours by Fleetwood Mac - $24.99",
        alt: "Rumours album cover"
    },
    {
        image: "images/thriller.jpg",
        caption: "Thriller by Michael Jackson - $27.99",
        alt: "Thriller album cover"
    },
    {
        image: "images/back-to-black.jpg",
        caption: "Back to Black by Amy Winehouse - $26.99",
        alt: "Back to Black album cover"
    }
];

// //this will set up the image carousel
let currentSlide = 0;

const track = document.querySelector(".carousel-track");
const slide = document.querySelectorAll(".slide");

function updateCarousel(){
track.style.transform = `translateX(-${currentSlide * 100}%)`;
}


// //This will go to the next slide of the image carousel
function nextSlide(){
    currentSlide++;

if(currentSlide >= slides.length){
    currentSlide = 0;
}

updateCarousel();
}

// //This will go back through the image carousel
function prevSlide(){
currentSlide--;

if(currentSlide < 0){
    currentSlide = slides.length - 1;
}

updateCarousel();
}

setInterval(nextSlide,4000);

//this will add items to cart from the vinyl section
//This will add items to cart from the CD section
//This will add items to the cart from the merch category
function addToCart(itemName, price) {
    alert(itemName + " added to cart!");

    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            name: itemName,
            price: price
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    } catch (error) {
        alert("There was a problem adding the item to the cart.");
    }
}

//This will show the cart on the cart page
function displayCart() {
    let cartItemsDiv = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    if (!cartItemsDiv || !cartTotal) {
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    let total = 0;
    let output = "<ul>";

    for (let i = 0; i < cart.length; i++) {
        output += "<li>" + cart[i].name + " - $" + cart[i].price.toFixed(2) + "</li>";
        total += cart[i].price;
    }

    output += "</ul>";
    cartItemsDiv.innerHTML = output;
    cartTotal.textContent = "Total: $" + total.toFixed(2);
}

//This will give the clear cart button functionality
function clearCart() {
    localStorage.removeItem("cart");
    alert("Cart cleared.");
    displayCart();
    updateCartCount();
}

//This is the function used to validate the form on the index page)
function validateForm() {

let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let artist = document.getElementById("artist").value.trim();
let message = document.getElementById("message").value.trim();

if (name === "" || email === "" || artist === "" || message === "") {
    alert("Please fill out all fields.");
    return false;
}

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return false;
}

if (message.length < 10) {
    alert("Message must be at least 10 characters.");
    return false;
}

alert("Thank you! Your message has been submitted.");

return true;
}


//Add Count to Cart (and show the number functionality)
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartCount = document.getElementById("cart-count");

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

showSlide(currentSlide);
displayCart();
updateCartCount();

//Random Playlist!
function suggestPlaylist() {

let playlists = [
"Classic Rock Revival",
"Pop Essentials",
"Late Night Vinyl",
"Soul Session"
];

let randomIndex = Math.floor(Math.random() * playlists.length);

document.getElementById("playlistSuggestion").textContent =
"Try listening to: " + playlists[randomIndex];

}
