let category = document.querySelector(".categories__link_active").innerText; //active category title
let maxResults = 6;
let booksInStorage = JSON.parse(localStorage.getItem("goodsInCart") ?? "[]"); //items in local storage
let cardsContent = document.querySelector(".cards__content"); //cards container
let optionsCount = document.querySelector(".options__count"); //container of goods count
let count;
let btnLoad = document.querySelector(".cards__btn_load");
let categoriesList = document.querySelector(".categories__list");

function showBooks(data) {
  let content = "";

  data.forEach((element) => {
    const inCart = booksInStorage.includes(element.id);
    let card = `
          <div class="cards__card">
          <div class="cards__image">
              <img src="${
                element.volumeInfo?.imageLinks?.thumbnail ??
                "./images/noimage.webp"
              }" alt=""
                  class="cards__img"
                  />
          </div>
          <div class="cards__description">
              <span class="cards__author">${element.volumeInfo?.authors ?? ""}</span>
              <h4 class="cards__title">${element.volumeInfo.title}</h4>
              <div class="cards__rating rating">
                  <div class="rating__yellowstars" style="width:${
                    8.1 * element.volumeInfo?.averageRating ?? 0
                  }%"></div>
                  <div class="rating__greystars"></div>
                  <div class="rating__rewiews">${
                    element.volumeInfo?.ratingCount ?? ""
                  }</div>
              </div>
              <p class="cards__descr">
              ${element.volumeInfo?.description ?? ""}
              </p>
              <div class="cards__price">
                    <p class="cards__currencyCode">${
                      element.saleInfo.retailPrice?.currencyCode ?? ""
                    }</p>
                    <p class="cards__retailPrice">${
                      element.saleInfo.retailPrice?.amount ?? ""
                    }</p>
              </div>
            
              <button class="cards__btn cards__btn_buy ${
                inCart ? "cards__btn_incart" : ""
              }" data-id="${element.id}" >${
      inCart ? "in the cart" : "buy now"
    }</button>
          </div>
      </div>
    `;
    content += card;
  });

  cardsContent.innerHTML = content;
}

function getData() {
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q="subject:${category}"&key=AIzaSyBxodNBLV3Rrdq2pTSwRMIB_tRjF9k-y84&printType=books&startIndex=${0}&maxResults=${maxResults}&langRestrict=en`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      showBooks(data.items);
    });
}

function showCountInCart() {
  if (booksInStorage.length > 0) {
    optionsCount.innerText = booksInStorage.length;
    optionsCount.style.display = "flex";
  } else {
    optionsCount.style.display = "none";
  }
}

categoriesList.addEventListener("click", (e) => {
  if (e.target.classList.contains("categories__link")) {
    e.preventDefault();
    maxResults = 6;
    cardsContent.innerHTML = "";
    category = e.target.innerText;
    getData();
    document
      .querySelector(".categories__link_active")
      .classList.remove("categories__link_active");
    e.target.classList.add("categories__link_active");
  }
});

btnLoad.addEventListener("click", () => {
  maxResults += 6;
  getData();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("cards__btn_buy")) {
    const bookId = e.target.getAttribute("data-id");
    e.target.classList.toggle("cards__btn_incart");
    if (e.target.innerText === "IN THE CART") {
      e.target.innerText = "BUY NOW";
      booksInStorage.splice(booksInStorage.indexOf(bookId), 1);
    } else {
      e.target.innerText = "IN THE CART";
      booksInStorage.push(bookId);
    }
    localStorage.setItem("goodsInCart", JSON.stringify(booksInStorage));
    showCountInCart();
  }
});

getData();
showCountInCart();
