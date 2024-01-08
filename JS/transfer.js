const api = "https://api-server.ca";

function transfer() {
    const sender_input = document.getElementById("sender");
    const recipient_input = document.getElementById("recipient");
    const pr_key_input = document.getElementById("pr_key");
    const amount_input = document.getElementById("transfer_amount");
    const status_message = document.getElementById("status_message");

    send_transfer(api+`/transfer?sender=${sender_input.value}&recipient=${recipient_input.value}&pr_key=${pr_key_input.value}&amount=${amount_input.value}`)  // JavaScript wasn't passing in headers for some reason, so I got lazy.
    .then(data => {
        if (data["status"] == "error") {
            status_message.style.color = "#ff0000";
            status_message.innerText = data["error"]; 
        } else if (data["status"] == "success") {
            status_message.style.color = "#00ff00";
            status_message.innerText = data["message"]; 
        }
    });
}

function send_transfer(url) {
    return fetch(url, {
        method: 'GET',
        mode: "cors"
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