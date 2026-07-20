let allProducts = [];
let API = "https://fakestoreapi.com/products?limit=8";
let wrapper = document.querySelector(".wrapper-new");
let searchInp = document.querySelector(".searchInp");

let getProducts = async (inpValue = "") => {
  try {
    let request = await fetch(API);
    let products = await request.json();
    console.log(products);
    allProducts = products;

    let filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(inpValue.toLowerCase());
    });

    wrapper.innerHTML = "";

    filteredProducts.forEach((item) => {
      let newTitle =
        item.title.length > 30 ? item.title.slice(0, 30) + "..." : 

      wrapper.innerHTML += `
        <div class='product-card'>
            <img src='${item.image}' />
            <h3>${newTitle}</h3>
            <h4>${item.price}</h4>
            <button class='product-btn' onclick="addToCart(${item.id})">Buy Now</button>
            <span class="like">🤍</span>
        </div>`;
    });

    // Likee
    const likes = document.querySelectorAll(".like");

    likes.forEach((like) => {
      like.addEventListener("click", () => {
        like.classList.toggle("active");
        if (like.classList.contains("active")) {
          like.textContent = "❤️";
        } else {
          like.textContent = "🤍";
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

getProducts();

searchInp.addEventListener("input", (e) => {
  getProducts(e.target.value);
});

// Two Likee
const likes = document.querySelectorAll(".twoLike");

likes.forEach((like) => {
  like.addEventListener("click", () => {
    like.classList.toggle("active");
    if (like.classList.contains("active")) {
      like.textContent = "❤️";
    } else {
      like.textContent = "🤍";
    }
  });
});

//////////////////////////////// Savatcha ////////////////////////
const headerBtn = document.querySelector(".headerBtn");
const cartCount = document.getElementById("cartCount");

// Carts Chaqirdimda
const cart = document.getElementById("cart");
const cartClose = document.getElementById("cartClose");
const cartItems = document.getElementById("cartItems");
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
const clearCarts = document.getElementById("clearCarts");

let count = 0;
let total = 0;

headerBtn.addEventListener("click", () => {
  cart.style.display = "block";
});

cartClose.addEventListener("click", () => {
  cart.style.display = "none";
});

const addToCart = (id) => {
  const product = allProducts[id - 1];

  const img = product.image;
  const title = product.title;
  const price = product.price;

  cartItems.innerHTML += `
        <div class="cartItem">
            <img src="${img}" alt="${title}"/>
            <div>
                <h3>${title}</h3>
                <p>${price}$</p>
            </div>
        </div>
    `;

  count++;
  total += price;

  cartCount.textContent = count;
  totalItems.textContent = count;
  totalPrice.textContent = total;
};
clearCarts.addEventListener("click", () => {
  cartItems.innerHTML = "";
  cartCount.textContent = 0;
  totalItems.textContent = 0;
  totalPrice.textContent = 0;
});