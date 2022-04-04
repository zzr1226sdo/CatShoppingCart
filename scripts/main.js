const addButton = document.querySelectorAll(".card-body");
const tbody = document.querySelector("tbody");

const clearCartButton = document.querySelector(".btn-success");
clearCartButton.addEventListener("click", ClearCart);

function ClearCart(e) {
  tbody.innerHTML = "";
  reCaltotal();
}

addButton.forEach((e) => {
  e.addEventListener("click", addToCart);
});

function addToCart(e) {
  const trs = tbody.querySelectorAll("tr");
  const cardName = e.currentTarget.children[0].textContent;
  const price = e.currentTarget.children[1].textContent;
  const input = e.currentTarget;
  console.log(tbody.querySelectorAll("tr"));
  const array = [];
  tbody.querySelectorAll("tr").forEach((tr) => {
    const catName = tr.children[0].textContent;
    array.push(catName);
  });
  if (array.includes(cardName)) {
    trs.forEach((tr) => {
      if (tr.children[0].textContent === cardName) {
        tr.children[1].firstChild.value++;
        quantitychanged();
      }
    });
  } else {
    const newtr = `<tr>
            <td>${cardName}</td>
            <td><input type="number" value="1"></td>
            <td>${price}</td>
            <td>${price}</td>
            <td><button class="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></td></tr>`;
    tbody.insertAdjacentHTML("afterbegin", newtr);
    quantitychanged();
  }
}

const removeButton = document.querySelectorAll(".btn-danger");
removeButton.forEach((e) => {
  e.addEventListener("click", deleteCartList);
});

function deleteCartList(e) {
  if (e.target.nodeName == "I") {
    e.target.parentNode.parentNode.parentNode.remove();
  } else {
    e.target.parentNode.parentNode.remove();
  }
  reCaltotal();
}

const quantityInputs = document.querySelectorAll("input");
quantityInputs.forEach((e) => {
  e.addEventListener("change", quantitychanged);
});

function quantitychanged(e) {
  const trs = tbody.querySelectorAll("tr");
  for (let i = 0; i < trs.length; i++) {
    let total = 0;
    const tr = trs[i];
    const priceElement = tr.children[2];
    const quantityElement = tr.children[1].firstChild;
    const price = Number(priceElement.textContent.replace("$", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
    tr.children[3].textContent = "$" + total;
  }
  reCaltotal();
}

function reCaltotal() {
  const tbody = document.querySelector("tbody");
  const trs = tbody.querySelectorAll("tr");
  let total = 0;
  for (let i = 0; i < trs.length; i++) {
    const tr = trs[i];
    const priceElement = tr.children[2];
    const quantityElement = tr.children[1].firstChild;
    const price = Number(priceElement.textContent.replace("$", ""));
    const quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.querySelector("tfoot").children[0].children[2].textContent =
    "$" + total;
}
