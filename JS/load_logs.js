window.onload = load_logs;

const api = 'https://a442-2607-fea8-bb1e-c400-4599-b1f2-5efb-6980.ngrok-free.app';

function load_logs() {
    const student_span = document.getElementById("students-span");
    const transaction_span = document.getElementById("transactions-span");

    // Students
    fetch_fields(api+"/all_accounts")
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const account = data[i];
            
            last_name = account["student"]["last_name"];
            first_name = account["student"]["first_name"];
            address = account["address"];
            balance = account["balance"];
            join_datetime = account["join_datetime"];
            transactions = account["transactions"];

            field = `Name: <b><em>${last_name}</em>, ${first_name}</b><br>Address: <b>${address}</b><br>SWL Coins: <b>${balance}</b><br>Join Date: <b>${join_datetime}</b><br>Transactions: <b>${transactions}</b>`;

            add_field(student_span, field);
        }
    });
}

function fetch_fields(url) {
    return fetch(url, {
      method: 'GET',
      headers: {
        "ngrok-skip-browser-warning": 1
      }
    })
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function add_field(span, field) {
    const p_elem = document.createElement("p");
    p_elem.className = "log-field";
    p_elem.insertAdjacentHTML("beforeend", field);

    span.appendChild(p_elem);
}
