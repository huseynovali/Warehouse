function Ui() {
  this.tableBody = document.getElementById("TableBody");
}

Ui.prototype.ClearInput = (paramsInput) => {
  let local_data =
    paramsInput instanceof Array ? [...paramsInput] : paramsInput;
  if (local_data instanceof Array) {
    local_data.forEach((element) =>
      element.value !== "" ? (element.value = "") : null
    );
  } else {
    paramsInput.value !== "" ? (paramsInput.value = "") : null;
  }
};

Ui.prototype.addFindedProductToUi = function (paramsProduct) {
  while (this.tableBody.firstElementChild !== null) {
    this.tableBody.removeChild(this.tableBody.firstElementChild);
  }

  this.tableBody.innerHTML = `<tr>
  <td>${paramsProduct._product}</td>
  <td>${paramsProduct._barcode}</td>
  <td>${paramsProduct._price}  AZN</td>
  <td>${paramsProduct._number}</td>
  <td>
      <button class='saleBtn'>Sale</button>
  </td>
  <td>
      <button class='deleteBtn'>Delete</button>
  </td>
  </tr>
`;
};

Ui.prototype.ListProduct = function (paramsProduct) {
  while (this.tableBody.firstElementChild !== null) {
    this.tableBody.removeChild(this.tableBody.firstElementChild);
  }
  paramsProduct.forEach((x) => {
    this.tableBody.innerHTML += `<tr>
  <td>${x._product}</td>
  <td>${x._barcode}</td>
  <td>${x._price}  AZN</td>
  <td>${x._number}</td>
  <td>
      <button class='saleBtn'>Sale</button>
  </td>
  <td>
      <button class='deleteBtn'>Delete</button>
  </td>
  </tr>
`;
  });
};
