let Form = document.getElementById("Form");
let InputProduct = document.getElementById("ProductName");
let InputBarcode = document.getElementById("Barcode");
let InputPrice = document.getElementById("ProductPrice");
let InputNumber = document.getElementById("ProductNumber");
let InputSearch = document.getElementById("searched");
let Search = document.getElementById("Searchbtn");
let ProductTable = document.getElementById("TableBody");
let ListProductBtn = document.getElementById("list_btn");
let ClearProductBtn = document.getElementById("clear_btn");
let storage = new Storage();
let ui = new Ui();

eventListeners();

function eventListeners() {
  Form.addEventListener("submit", formValidationController);
  Search.addEventListener("click", searchedProduct);
  ListProductBtn.addEventListener("click", ListProducts);
  ProductTable.addEventListener("click", SaleProduct_DeleteProduct);
  ClearProductBtn.addEventListener("click", clearAll);
  document.addEventListener("DOMContentLoaded", uiLoaded);
}

function formValidationController(e) {
  let ProductName = InputProduct.value.trim();
  let ProductBarcode = InputBarcode.value.trim();
  let ProductPrice = InputPrice.value.trim();
  let ProductNumber = InputNumber.value.trim();
  let allInputs = [ProductName, ProductBarcode, ProductPrice, ProductNumber];

  if (allInputs.some((val) => val === "")) {
    alert("pls insert all input!");
    ui.ClearInput([InputProduct, InputBarcode, InputPrice, InputNumber]);
  } else {
    ui.ClearInput([InputProduct, InputBarcode, InputPrice, InputNumber]);
    storage.addProductToStorage(
      new Goods(ProductName, ProductBarcode, ProductPrice, ProductNumber)
    );
  }
  e.preventDefault();
}

function searchedProduct() {
  let searchInput = InputSearch.value.trim();
  if (searchInput === "") {
    alert("pls insert Search input !");
  } else {
    findedProduct(searchInput);
  }
  ui.ClearInput(InputSearch);
}

function findedProduct(paramsVal) {
  let allProducts = storage.getProductFromStorage();
  let findProduct = allProducts.find((element) => {
    return element._barcode === paramsVal || element._product === paramsVal;
  });
  if (findProduct) {
    localStorage.setItem("Finded", JSON.stringify(findProduct));
    ui.addFindedProductToUi(findProduct);
  } else {
    alert(`${paramsVal} This product is not in stock`);
  }
}

function uiLoaded() {
  let AllElement = storage.getProductFromStorage();
  let findedElement = JSON.parse(localStorage.getItem("Finded"));
  if (findedElement) {
    ui.addFindedProductToUi(findedElement);
  } else if (AllElement && AllElement.length > 0) {
    ui.ListProduct(AllElement);
  } else {
    ui.ListProduct(AllElement);
    alert("havn't product in stock !");
  }
}

function ListProducts() {
  let AllElement = storage.getProductFromStorage();
  if (AllElement && AllElement.length > 0) {
    ui.ListProduct(AllElement);
    storage.removeProduct("Finded");
  } else {
    alert("havn't product in stock !");
  }
}

function SaleProduct_DeleteProduct(e) {
  let targetSpace = e.target;
  let targetContent =
    targetSpace.parentElement.parentElement.firstElementChild.textContent.trim();
  if (targetSpace.className === "deleteBtn") {
    storage.deleteProductToStorage(targetContent);
  } else if (targetSpace.className === "saleBtn") {
    let saleNumber = prompt("number of goods to be sold");
    storage.saleProductToStorage(targetContent, saleNumber);
  }
  uiLoaded();
}

function clearAll() {
  if (confirm("are you sure ?")) {
    while (ProductTable.firstElementChild !== null) {
      ProductTable.removeChild(ProductTable.firstElementChild);
    }
    let allElement = ProductTable.childElementCount;
    alert(`${allElement} items deleted`);
    localStorage.clear();
  } else {
    alert("no element was deleted !");
  }
}
