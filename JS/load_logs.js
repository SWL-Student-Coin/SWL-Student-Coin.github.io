window.onload = load_logs;

const api = "https://api-server.ca";

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

    // Transactions
    fetch_fields(api+"/all_transactions")
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            const transaction = data[i];
            
            transaction_id = transaction["transaction_id"];
            amount = transaction["amount"];
            transaction_datetime = transaction["transaction_datetime"];
            sender = transaction["sender"];
            recipient = transaction["recipient"];

            field = `Sender: <b>${sender}</b><br>Recipient: <b>${recipient}</b><br>Transaction ID: <b>${transaction_id}</b><br>SWL Coins: <b>${amount}</b><br>Transaction Date: <b>${transaction_datetime}</b>`;

            add_field(transaction_span, field);
        }
    });
}

function fetch_fields(url) {
    return fetch(url, {
      method: 'GET'
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
