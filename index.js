// var data = [];

// async function fetchData() {
//     try {
//         let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
//         data = await response.json();
//         populateTable(); // Call this function after the data is fetched
//     } catch (e) {
//         console.log(e);
//     }
// }

// function populateTable() {
//     let mytable = document.getElementById("table");
//     mytable.style.border = "2px solid black";
//     mytable.style.width = "400px";
//     mytable.style.height = "400px";

//     for (let i of data) {
//         let row = document.createElement("tr");

//         let col1 = document.createElement("td");
//         let col2 = document.createElement("td");
//         let col3 = document.createElement("td");
//         let col4 = document.createElement("td");


//         col1.innerHTML = `<img src="${i.image}"  width="20" alt ="image"> ${i.id}`;
//         col2.textContent = `${i.symbol}`; // Symbol
//         col3.textContent = `${i.current_price}`; // Image
//         col4.textContent = `${i.total_volume}`; // Current Price
       

//         row.appendChild(col1);
//         row.appendChild(col2);
//         row.appendChild(col3);
//         row.appendChild(col4);
    

//         mytable.appendChild(row);
//     }
// }

// // Wait for DOM to load before running fetchData
// document.addEventListener("DOMContentLoaded", fetchData);

let data = [];

// Fetch data using async/await
async function fetchDataAsync() {
    try {
        let response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        data = await response.json();
        renderTable(data); // Render table after fetching data
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    console.log(data);
}

// Fetch data using .then
function fetchDataThen() {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData;
            renderTable(data); // Render table after fetching data
        })
        .catch(error => console.error("Error fetching data:", error));

        console.log(data)
}

// Render the fetched data into the table
function renderTable(dataToRender) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = ""; // Clear previous content

    dataToRender.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${item.image}" alt="${item.name}" width="20">${item.name}</td>
            <td>${(item.symbol).toUpperCase()}</td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
            <td>${item.price_change_percentage_24h}</td>
            <td>${item.market_cap}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Implement search functionality
function searchTable() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(searchInput) || item.symbol.toLowerCase().includes(searchInput)
    );
    renderTable(filteredData);
}

// Implement sort functionality
function sortTableByMarketCap() {
    const sortedData = [...data].sort((a, b) => b.market_cap - a.market_cap);
    renderTable(sortedData);
}

function sortTableByChange() {
    const sortedData = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderTable(sortedData);
}

// Add event listeners
document.getElementById("searchBtn").addEventListener("click", searchTable);
document.getElementById("sortMarketCapBtn").addEventListener("click", sortTableByMarketCap);
document.getElementById("sortChangeBtn").addEventListener("click", sortTableByChange);

// Fetch data on DOM load
document.addEventListener("DOMContentLoaded", fetchDataAsync);
