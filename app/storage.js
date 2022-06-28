function Storage() {}

Storage.prototype.getProductFromStorage = function () {
  let Products;
  if (localStorage.getItem("product") === null) {
    Products = [];
  } else {
    Products = JSON.parse(localStorage.getItem("product"));
  }
  return Products;
};

Storage.prototype.addProductToStorage = function (paramsProduct) {
  let allPrroduct = this.getProductFromStorage();
  allPrroduct.push(paramsProduct);
  localStorage.setItem("product", JSON.stringify(allPrroduct));
};

Storage.prototype.removeProduct = function (paramsValue) {
  localStorage.removeItem(paramsValue);
};

Storage.prototype.deleteProductToStorage = function (paramsInfo) {
  let allPrroduct = this.getProductFromStorage();
  allPrroduct.forEach((element, index) => {
    if (element._product === paramsInfo) {
      allPrroduct.splice(index, 1);
    }
  });
  localStorage.setItem("product", JSON.stringify(allPrroduct));
};

Storage.prototype.saleProductToStorage = function (
  paramsProduct,
  paramsNumber
) {
  let allPrroduct = this.getProductFromStorage();
  let paramsVal;
  allPrroduct.forEach((element, index) => {
    if (element._product === paramsProduct) {
      paramsVal = element;
      allPrroduct.splice(index, 1);
    }
  });
  let newNumber = paramsVal._number - paramsNumber;
  if (newNumber > 0) {
    allPrroduct.push(
      new Goods(
        paramsVal._product,
        paramsVal._barcode,
        paramsVal._price,
        newNumber
      )
    );
  } else if (newNumber === 0) {
    alert(`${paramsVal._product} was all sold !`);
  } else if (newNumber < 0) {
   return alert("insert right number !");; 
   
  }
  if (localStorage.getItem("Finded")) {
    let product = new Goods(
      paramsVal._product,
      paramsVal._barcode,
      paramsVal._price,
      newNumber
    );
    localStorage.setItem("Finded", JSON.stringify(product));
    localStorage.setItem("product", JSON.stringify(allPrroduct));
  } else {
    localStorage.setItem("product", JSON.stringify(allPrroduct));
  }
};
