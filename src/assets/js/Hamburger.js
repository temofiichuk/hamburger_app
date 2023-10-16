class Hamburger {
  components = {
    size: {},
    stuffing: [],
    topping: []
  };

  static SIZE_SMALL = {
    components: ["bun_top", "hamburger", "bun_bottom"],
    price: 50,
    kcal: 20
  };
  static SIZE_LARGE = {
    components: ["bun_top", "hamburger", "hamburger2", "bun_bottom"],
    price: 100,
    kcal: 40
  };

  static STUFFING_CHEESE = { components: ["cheese"], price: 10, kcal: 20 };
  static STUFFING_SALAD = { components: ["salad"], price: 20, kcal: 5 };
  static STUFFING_TOMATO = { components: ["tomato"], price: 15, kcal: 10 };
  static STUFFING_ONION = { components: ["onion"], price: 5, kcal: 5 };
  static STUFFING_PINEAPPLE = {
    components: ["pineapple"],
    price: 25,
    kcal: 25
  };

  static TOPPING_SAUCE = { components: ["sauce"], price: 15, kcal: 0 };
  static TOPPING_MAYO = { components: ["mayo"], price: 20, kcal: 5 };

  changeSize(size) {
    this.components.size = size;
  }

  addTopping(topping) {
    this.components.topping.push(topping);
  }

  deleteTopping(topping) {
    this.components.topping = this.components.topping.filter(
      val => val !== topping
    );
  }

  addStaffing(topping) {
    this.components.stuffing.push(topping);
  }

  deleteStaffing(topping) {
    this.components.stuffing = this.components.stuffing.filter(
      val => val !== topping
    );
  }

  calculateCalories() {
    let calories = 0;
    for (let componentKey in this.components) {
      if (Array.isArray(this.components[componentKey])) {
        calories += this.components[componentKey].reduce(
          (acc, item) => acc + item.kcal,
          0
        );
      } else {
        calories += this.components[componentKey].kcal;
      }
    }
    return calories;
  }

  calculatePrice() {
    let price = 0;
    for (let componentKey in this.components) {
      if (Array.isArray(this.components[componentKey])) {
        price += this.components[componentKey].reduce(
          (acc, item) => acc + item.price,
          0
        );
      } else {
        price += this.components[componentKey].price;
      }
    }
    return price;
  }
}
