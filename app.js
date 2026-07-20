//

const searchInput = document.querySelector(".search input");
const cartIcon = document.querySelector(".fa-cart-shopping");
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
const themeBtn = document.querySelector(".theme-btn");

let allProducts = [];      
let cartProducts = [];     

let API = "https://fakestoreapi.com/products";
const wrapper = document.querySelector(".product-list");
const searchInp = document.querySelector(".search input");



const getProducts = async (inpValue = "") => {
  try {
    const request = await fetch(API);
    const products = await request.json();
    allProducts = products; 

    
    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(inpValue.toLowerCase());
    });

    wrapper.innerHTML = "";

    filteredProducts.forEach((item) => {
      let newTitle = item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title;

      
      wrapper.innerHTML += `
        <div class='card'>
            <img src='${item.image}' width='300' />
            <h3>${newTitle}</h3>
            <h4><mark>${item.price} $</mark></h4>
            <button class='buyNowBtn' onclick="addToCart(${item.id})">Buy Now</button>
            <span class="like" onclick="toggleLike(this)">🤍</span>
        </div>`;
    });
  } catch (error) {
    console.log(error);
  }
};

getProducts();

searchInp.addEventListener("input", (e) => {
  getProducts(e.target.value);
});


const headerBtn = document.getElementById("headerBtn");
const cartCount = document.getElementById("cartCount");
const cart = document.getElementById("cart");
const cartClose = document.getElementById("cartClose");
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
const cartItems = document.getElementById("cartItems");
const clearCarts = document.getElementById('clearCarts');

      

headerBtn.addEventListener("click", () => {
  cart.style.display = "block";
});
cartClose.addEventListener("click", () => {
  cart.style.display = "none";
});


const addToCart = (productId) => {
  
  const foundProduct = allProducts.find(item => item.id === productId);
  
  if (foundProduct) {
    cartProducts.push(foundProduct);
    renderCart();
  }
};

const deleteCartItem = (index) => {
  cartProducts.splice(index, 1);
  
  
  renderCart();
};


const renderCart = () => {
  cartItems.innerHTML = ""; 
  let currentTotal = 0;

  
  cartProducts.forEach((item, index) => {
    let shortTitle = item.title.length > 20 ? item.title.slice(0, 20) + "..." : item.title;
    currentTotal += item.price;

    cartItems.innerHTML += `
      <div class='cartItem'>
          <img src='${item.image}' alt='${item.title}' width='50' />
          <div>
              <h3>${shortTitle}</h3>
              <p>${item.price} $</p>
          </div>
          
      </div>
    `;
  });

  
  cartCount.textContent = cartProducts.length;
  totalItems.textContent = cartProducts.length;
  totalPrice.textContent = currentTotal.toFixed(2); yaxlitlaydi
};



clearCarts.addEventListener("click", () => {
  cartProducts = []; 
  renderCart();      
});

function toggleLike(element) {
  if (element.innerText === "🤍") {
    element.innerText = "❤️";
  } else {
    element.innerText = "🤍";
  }
}
