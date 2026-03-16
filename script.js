//This initializes the variables for the slide carousel
let currentSlide = 0;
const track = document.querySelector(".carousel-track");
const slideElements = document.querySelectorAll(".slide");

//this will update the carousel position
function updateCarousel() {
    //only run if the page actually has a carousel
    if (!track || slideElements.length === 0) {
        return;
    }

    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

//this moves the carousel to the next slide
function nextSlide() {
    if (!track || slideElements.length === 0) {
        return;
    }

    currentSlide++;

    if (currentSlide >= slideElements.length) {
        currentSlide = 0;
    }

    updateCarousel();
}

//this moves the carousel to the previous slide
function prevSlide() {
    if (!track || slideElements.length === 0) {
        return;
    }

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = slideElements.length - 1;
    }

    updateCarousel();
}

//only start the carousel if the page has one
if (track && slideElements.length > 0) {
    updateCarousel();
    setInterval(nextSlide, 4000);
}

//this function adds items to the cart
function addToCart(itemName, price) {
    try {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            name: itemName,
            price: Number(price)
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        alert(itemName + " added to cart!");

    } catch (error) {
        console.error("Error adding to cart:", error);
        alert("There was a problem adding the item to the cart.");
    }
}

//this displays the cart items on the cart page
function displayCart() {

    const cartItemsDiv = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    //stop if we are not on the cart page
    if (!cartItemsDiv || !cartTotal) {
        return;
    }

    let cart = [];

    try {
        cart = JSON.parse(localStorage.getItem("cart")) || [];
    } catch (error) {
        cartItemsDiv.innerHTML = "<p>There was a problem loading your cart.</p>";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    let total = 0;
    let output = "<ul>";

    for (let i = 0; i < cart.length; i++) {

        const itemPrice = Number(cart[i].price) || 0;

        output += `<li>${cart[i].name} - $${itemPrice.toFixed(2)}</li>`;

        total += itemPrice;
    }

    output += "</ul>";

    cartItemsDiv.innerHTML = output;

    cartTotal.textContent = "Total: $" + total.toFixed(2);
}

//this clears the cart
function clearCart() {

    localStorage.removeItem("cart");

    alert("Cart cleared.");

    displayCart();

    updateCartCount();
}

//this updates the cart count in the navigation bar
function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) {
        return;
    }

    try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cartCount.textContent = cart.length;

    } catch (error) {
        cartCount.textContent = "0";
    }
}

//this validates the forms on the site
function validateForm() {

    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const artistEl = document.getElementById("artist");
    const messageEl = document.getElementById("message");

    const name = nameEl ? nameEl.value.trim() : "";
    const email = emailEl ? emailEl.value.trim() : "";
    const artist = artistEl ? artistEl.value.trim() : "";
    const message = messageEl ? messageEl.value.trim() : "";

    //check required fields
    if (name === "" || email === "" || artist === "") {
        alert("Please fill out all required fields.");
        return false;
    }

    //email validation using regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    //only check message if the page has a message field
    if (messageEl) {

        if (message === "") {
            alert("Please fill out all required fields.");
            return false;
        }

        if (message.length < 10) {
            alert("Message must be at least 10 characters.");
            return false;
        }
    }

    alert("Thank you! Your message has been submitted.");

    return true;
}

//this suggests a random playlist
function suggestPlaylist() {

    const playlists = [
        "Classic Rock Revival",
        "Pop Essentials",
        "Late Night Vinyl",
        "Soul Session"
    ];

    const randomIndex = Math.floor(Math.random() * playlists.length);

    const suggestionEl = document.getElementById("playlistSuggestion");

    if (suggestionEl) {
        suggestionEl.textContent = "Try listening to: " + playlists[randomIndex];
    }
}

//this runs when the page loads
displayCart();
updateCartCount();
