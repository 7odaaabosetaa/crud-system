// startget tatal function
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let count = document.getElementById("count");

function getTotal() {
    if (price.value != "") {
        let result = +price.value + +taxes.value + +ads.value - discount.value;
        total.innerHTML = result;
        total.style.background = "#040";
    } else {
        total.innerHTML = "0";
        total.style.background = "red";
    }
}
// create data
let data;
if (localStorage.product != null) {
    data = JSON.parse(localStorage.getItem("product"));
    showdata();
} else {
    data = [];
}

submit.addEventListener("click", () => {
    total.style.background = "red";
    if (price.value != "") {
        let objdata = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            discount: discount.value,
            ads: ads.value,
            category: category.value.toLowerCase(),
            total: total.innerHTML,
        };

        if (count.value > 0) {
            for (let i = 0; i < count.value; i++) {
                data.push(objdata);
            }
        } else {
            data.push(objdata);
        }

        localStorage.setItem("product", JSON.stringify(data));
        clearData();
        showdata();
    }
});

function clearData() {
    title.value = "";
    price.value = "";
    taxes.value = "";
    discount.value = "";
    ads.value;
    category.value = "";
    count.value = "";
    total.innerHTML = 0;
}
// read data
function showdata() {
    let table = "";
    for (let i = 0; i < data.length; i++) {
        table += `
    <tr> 
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button id="update" onclick='update(${i})'>Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `;
    }
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = table;
    if (data.length > 0) {
        let deleteAll = document.getElementById("deleteAll");
        deleteAll.innerHTML = `<button onclick="deleteAlls()"> delete all (${data.length})</button>`;
    } else {
        deleteAll.innerHTML = "";
    }
}
// delete function
function deleteData(i) {
    data.splice(i, 1);
    localStorage.product = JSON.stringify(data);
    showdata();
}

function deleteAlls() {
    localStorage.clear();
    data.splice(0);
    showdata();
}
//  update
function update(i) {
    title.value = data[i].title;
    price.value = data[i].price;
    taxes.value = data[i].taxes;
    discount.value = data[i].discount;
    ads.value = data[i].ads;
    category.value = data[i].category;
    total.innerHTML = data[i].total;
    count.style.display = "none";
    submit.innerHTML = "Update";
    scroll({
        top: 0,
    });
    total.style.background = "#040";
    submit.addEventListener("click", () => {
        data[i].title = title.value;
        data[i].price = price.value;
        data[i].taxes = taxes.value;
        data[i].ads = ads.value;
        data[i].category = category.value;
        data[i].discount = discount.value;
        total.innerHTML = "";
        count.style.display = "block";
        clearData();
        localStorage.setItem("product", JSON.stringify(data));
        showdata();
        submit.innerHTML = "create";
        total.style.background = "red";
    });
}

let searchmood = "title";
let searchinput = document.getElementById("searchinput");
function search(id) {
    if (id === "searchtitle") {
        searchmood = "title";
        searchinput.focus();
        searchinput.placeholder = "serarch by title";
    } else {
        searchmood = "category ";
        searchinput.focus();
        searchinput.placeholder = "serarch by category";
    }
    searchinput.value='';
    showdata()
}
function searchData(value) {
    let table = "";
    if (searchmood === "title") {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.includes(value.toLowerCase())) {
                table += `
    <tr> 
    <td>${i}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button id="update" onclick='update(${i})'>Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `;
            }
        }
    } else {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.includes(value.toLowerCase())) {
                table += `
    <tr> 
    <td>${i}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td><button id="update" onclick='update(${i})'>Update</button></td>
    <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `;
            }
        }
    }
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = table;
    
}
