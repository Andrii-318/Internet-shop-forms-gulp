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
  const ordersContainer = document.getElementById("ordersContainer");
  const ordersList = document.getElementById("ordersList");

  document
    .getElementById("viewOrdersBtn")
    .addEventListener("click", function () {
      displayOrders();
      document.querySelector(".store").classList.add("hidden");
      ordersContainer.classList.remove("hidden");
    });

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

      saveOrder(name, description, data);
      orderForm.reset();
    });
  };

  function saveOrder(name, description, data) {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrder = {
      id: Date.now(),
      name,
      description,
      data,
      date: new Date().toLocaleString(),
    };
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    displayOrderResult(newOrder);
  }

  function displayOrderResult(order) {
    const orderResult = document.getElementById("orderResult");
    orderResult.innerHTML = `
      <h2>Замовлення підтверджено</h2>
      <p><strong>Товар:</strong> ${order.name}</p>
      <p><strong>Опис:</strong> ${order.description}</p>
      <p><strong>ПІБ покупця:</strong> ${order.data.buyerName}</p>
      <p><strong>Місто:</strong> ${order.data.city}</p>
      <p><strong>Склад Нової пошти:</strong> ${order.data.warehouse}</p>
      <p><strong>Спосіб оплати:</strong> ${order.data.paymentMethod}</p>
      <p><strong>Кількість продукції:</strong> ${order.data.quantity}</p>
      <p><strong>Коментар до замовлення:</strong> ${order.data.comment}</p>
    `;
    orderResult.classList.remove("hidden");
  }

  function displayOrders() {
    ordersList.innerHTML = "";
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.forEach((order) => {
      const li = document.createElement("li");
      li.classList.add("order-item");
      li.innerHTML = `
        <span>${order.date} - ${order.name}</span>
        <button onclick="toggleOrderDetails(${order.id})">Деталі</button>
        <button onclick="deleteOrder(${order.id})">Видалити</button>
        <div id="orderDetails-${order.id}" class="hidden">
          <p><strong>Опис:</strong> ${order.description}</p>
          <p><strong>ПІБ покупця:</strong> ${order.data.buyerName}</p>
          <p><strong>Місто:</strong> ${order.data.city}</p>
          <p><strong>Склад Нової пошти:</strong> ${order.data.warehouse}</p>
          <p><strong>Спосіб оплати:</strong> ${order.data.paymentMethod}</p>
          <p><strong>Кількість продукції:</strong> ${order.data.quantity}</p>
          <p><strong>Коментар до замовлення:</strong> ${order.data.comment}</p>
        </div>
      `;
      ordersList.appendChild(li);
    });
  }

  window.toggleOrderDetails = function (orderId) {
    const detailsDiv = document.getElementById(`orderDetails-${orderId}`);
    detailsDiv.classList.toggle("hidden");
  };

  window.deleteOrder = function (orderId) {
    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders = orders.filter((order) => order.id !== orderId);
    localStorage.setItem("orders", JSON.stringify(orders));
    displayOrders();
  };

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
