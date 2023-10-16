const $extra_box = document.getElementById("extra_box");
const $review = document.getElementById("hamburger_review");
const hamburgerForm = document.forms.hamburger;
const $main = document.querySelector("main");
const $price = document.getElementById("price");
const $calories = document.getElementById("calories");
const $quantity = document.getElementById("quantity");

const hamburger = new Hamburger();

hamburgerForm.addEventListener("change", e => {
  const value = e.target.value;
  //change size
  if (e.target.name === "size") {
    hamburger.changeSize(Hamburger[value]);
    deleteElementsFromReview(Hamburger.SIZE_LARGE.components);
    cloneElementsToReview(Hamburger[value].components);
    $main.classList.add("size-selected");
  } else {
    const componentName = e.target.getAttribute("data-component");
    //change stuffing
    if (e.target.name === "stuffing") {
      e.target.checked
        ? hamburger.addStaffing(Hamburger[value])
        : hamburger.deleteStaffing(Hamburger[value]);
    }
    // change topping
    if (e.target.name === "topping") {
      e.target.checked
        ? hamburger.addTopping(Hamburger[value])
        : hamburger.deleteTopping(Hamburger[value]);
    }
    // move component
    e.target.checked
      ? cloneElementsToReview([componentName], $review)
      : deleteElementsFromReview([componentName], $extra_box);
  }
  const quantity = +hamburgerForm.quantity.value;
  // change price and calories
  changeValueByStep(hamburger.calculatePrice() * quantity, $price, 5);
  changeValueByStep(hamburger.calculateCalories() * quantity, $calories, 5);
});
// buy hamburger/s
hamburgerForm.addEventListener("submit", e => {
  e.preventDefault();
  $main.querySelector(
    ".quantity_review"
  ).textContent = `X${hamburgerForm.quantity.value}`;
  $main.classList.add("completed");
});
// change quantity
$quantity.addEventListener("click", e => {
  let quantityValue = hamburgerForm.quantity.value;
  if (e.target.closest(".inc")) {
    quantityValue++;
    $quantity.querySelector(".qty-val").textContent = quantityValue;
  }
  if (e.target.closest(".dec")) {
    if (quantityValue > 1) quantityValue--;
    $quantity.querySelector(".qty-val").textContent = quantityValue;
  }
  hamburgerForm.quantity.value = quantityValue;
  hamburgerForm.dispatchEvent(new Event("change"));
});

function cloneElementsToReview(elems) {
  elems.forEach(elem => {
    const component = document.querySelector(`[alt="${elem}"]`).cloneNode(true);
    $review.append(component);
  });
}

function deleteElementsFromReview(elems) {
  elems.forEach(elem => {
    const component = $review.querySelector(`[alt="${elem}"]`);
    if (component) component.remove();
  });
}

function changeValueByStep(value, element, step) {
  let oldValue = +element.textContent;
  const direction = oldValue < value;
  const intervalKey = setInterval(() => {
    if (oldValue === value) clearInterval(intervalKey);
    element.textContent = oldValue + "";
    direction ? oldValue++ : oldValue--;
  }, step);
}
