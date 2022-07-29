// Best Place to store/save information/data is the ARRAY. Through arrays we can loop, modify,edit,delete,access whatever we want

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let total = document.getElementById("total");
let submit = document.getElementById("submit");
let count = document.getElementById("count");
let deleteEverything = document.getElementById("deletee");
let action = "create";
let temp; //very important concept delusive/phantom variable

// console.log(title, price, taxes, ads, discount, category, total, submit, count);

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.backgroundColor = "Green";
  } else {
    total.innerHTML = "";
    total.style.backgroundColor = "rgb(114, 95, 8)";
  }
}

let myData; // this is like my main database where all information are stored.
if (localStorage.product != null) {
  myData = JSON.parse(localStorage.product);
} else {
  myData = [];
}
submit.onclick = function () {
  const myDataObj = {
    title: title.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    category: category.value,
    total: total.innerHTML, // Don't write total.value ... mistake
    count: count.value,
  };
  if (title.value != "" && price.value != "" && category.value != "") {
    if (action === "create") {
      if (myDataObj.count > 1) {
        for (i = 0; i < myDataObj.count; i++) {
          myData.push(myDataObj);
        }
      } else {
        myData.push(myDataObj);
      }
    } else {
      myData[temp] = myDataObj;
      action = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
      submit.style.width = "33%";
    }
    clearData(); // this is to intialize the clear operation once data is submitted
  }

  localStorage.setItem("product", JSON.stringify(myData));

  showData();
};

let clearData = function () {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  category.value = "";
  total.innerHTML = "";
  count.value = "";
};

function showData() {
  getTotal();
  let table = "";
  for (i = 0; i < myData.length; i++) {
    table += `   <tr>
        <td>${i + 1}</td>
        <td>${myData[i].title}</td>
        <td>${myData[i].price}</td>
        <td>${myData[i].taxes}</td>
        <td>${myData[i].ads}</td>
        <td>${myData[i].discount}</td>
        <td>${myData[i].total}</td>
        <td>${myData[i].category}</td>
        <td><button onclick ="updateData(${i})" id="update">Update</button></td>
        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
      </tr>
      `;
  }
  document.getElementById("tbody").innerHTML = table;
}
deleteEverything.innerHTML = `Delete ALL ( ${myData.length} )`;

showData();

function deleteData(i) {
  myData.splice(i, 1);
  localStorage.product = JSON.stringify(myData); // updating the array after deleting the element in localstorage
  showData(); // to remove it from table and renew everytime we delete something
}

DeleteAll = () => {
  localStorage.clear();
  myData.splice(0);

  showData();
};

updateData = (i) => {
  title.value = myData[i].title;
  price.value = myData[i].price;
  taxes.value = myData[i].taxes;
  discount.value = myData[i].discount;
  ads.value = myData[i].ads;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update Information";
  submit.style.width = "66%";
  action = "update Information";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
};

let searchAction = "title";

getSearchAction = (id) => {
  let search = document.getElementById("search");
  if (id == "SearchByTitle") {
    searchAction = "title";
    search.placeholder = " Search By Title";
  } else {
    searchAction = "category";
    search.placeholder = " Search By Category";
  }
  search.focus();
};

searchData = (value) => {
  let table = "";
  for (i = 0; i < myData.length; i++) {
    if (searchAction == "title") {
      if (myData[i].title.includes(value)) {
        table += `   <tr>
                <td>${i + 1}</td>
                <td>${myData[i].title}</td>
                <td>${myData[i].price}</td>
                <td>${myData[i].taxes}</td>
                <td>${myData[i].ads}</td>
                <td>${myData[i].discount}</td>
                <td>${myData[i].total}</td>
                <td>${myData[i].category}</td>
                <td><button onclick ="updateData(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
              </tr>
              `;
      }
    } else {
      if (myData[i].category.includes(value)) {
        table += `   <tr>
                <td>${i + 1}</td>
                <td>${myData[i].title}</td>
                <td>${myData[i].price}</td>
                <td>${myData[i].taxes}</td>
                <td>${myData[i].ads}</td>
                <td>${myData[i].discount}</td>
                <td>${myData[i].total}</td>
                <td>${myData[i].category}</td>
                <td><button onclick ="updateData(${i})" id="update">Update</button></td>
                <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
              </tr>
              `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
};
