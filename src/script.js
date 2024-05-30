document.addEventListener("DOMContentLoaded", function () {
  const categories = {
    Електроніка: [
      {
        name: "Телефон",
        description: "Сучасний смартфон з високою роздільною здатністю екрану.",
      },
      {
        name: "Телевізор",
        description: "Тільки природна передача яскравості і кольорів",
      },
    ],
    Одяг: [
      {
        name: "Футболка",
        description: "Зручна футболка з натуральної бавовни.",
      },
      { name: "Джинси", description: "Модні джинси з міцної тканини." },
    ],
    Продукти: [
      { name: "Яблука", description: "Свіжі соковиті яблука." },
      { name: "Молоко", description: "Органічне молоко без консервантів." },
    ],
  };

  const categoriesList = document.getElementById("categoriesList");
  const productsList = document.getElementById("productsList");
  const productInfo = document.getElementById("productInfo");

  for (let category in categories) {
    const li = document.createElement("li");
    li.textContent = category;
    li.addEventListener("click", function () {
      displayProducts(category);
    });
    categoriesList.appendChild(li);
  }

  function displayProducts(category) {
    productsList.innerHTML = "";
    productInfo.innerHTML = "";
    categories[category].forEach((product) => {
      const li = document.createElement("li");
      li.textContent = product.name;
      li.addEventListener("click", function () {
        displayProductInfo(product);
      });
      productsList.appendChild(li);
    });
  }

  function displayProductInfo(product) {
    productInfo.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button onclick="buyProduct('${product.name}', '${product.description}')">Купити</button>
        `;
  }

  window.buyProduct = function (name, description) {
    document.querySelector(".store").classList.add("hidden");
    document.getElementById("orderFormContainer").classList.remove("hidden");

    const orderForm = document.getElementById("orderForm");
    orderForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(orderForm);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      displayOrderResult(name, description, data);
      orderForm.reset();
    });
  };

  function displayOrderResult(name, description, data) {
    const orderResult = document.getElementById("orderResult");
    orderResult.innerHTML = `
            <h2>Замовлення підтверджено</h2>
            <p><strong>Товар:</strong> ${name}</p>
            <p><strong>Опис:</strong> ${description}</p>
            <p><strong>ПІБ покупця:</strong> ${data.buyerName}</p>
            <p><strong>Місто:</strong> ${data.city}</p>
            <p><strong>Склад Нової пошти:</strong> ${data.warehouse}</p>
            <p><strong>Спосіб оплати:</strong> ${data.paymentMethod}</p>
            <p><strong>Кількість продукції:</strong> ${data.quantity}</p>
            <p><strong>Коментар до замовлення:</strong> ${data.comment}</p>
        `;
    orderResult.classList.remove("hidden");
  }

  const registrationForm = document.getElementById("registrationForm");
  registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(registrationForm);
    const data = {};
    formData.forEach((value, key) => {
      if (!data[key]) {
        data[key] = value;
      } else {
        if (!Array.isArray(data[key])) {
          data[key] = [data[key]];
        }
        data[key].push(value);
      }
    });

    displayRegistrationResult(data);
    registrationForm.reset();
    registrationForm.classList.add("hidden");
  });

  function displayRegistrationResult(data) {
    const resultContainer = document.getElementById("resultContainer");
    resultContainer.innerHTML = `
            <table>
                <tr><th>Ім'я</th><td>${data.firstName}</td></tr>
                <tr><th>Прізвище</th><td>${data.lastName}</td></tr>
                <tr><th>Дата народження</th><td>${data.dob}</td></tr>
                <tr><th>Стать</th><td>${data.gender}</td></tr>
                <tr><th>Місто</th><td>${data.city}</td></tr>
                <tr><th>Адреса</th><td>${data.address}</td></tr>
                <tr><th>Мови</th><td>${
                  Array.isArray(data.languages)
                    ? data.languages.join(", ")
                    : data.languages
                }</td></tr>
            </table>
        `;
    resultContainer.classList.remove("hidden");
  }
});
