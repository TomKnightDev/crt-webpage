const terminal = document.getElementById("terminal");
const content = document.getElementById("content");
const inputLine = document.getElementById("input-line");
const commandInput = document.getElementById("command-input");
const promptLabel = document.getElementById("prompt");

function processCommand() {
  const command = commandInput.value;
  // Process the command here or perform any desired actions

  // Display the command and its output in the terminal
  const commandOutput = document.createElement("div");
  commandOutput.textContent = promptLabel.textContent + command;
  //content.appendChild(commandOutput);

  terminal.insertBefore(commandOutput, inputLine);

  // Clear the input field
  commandInput.value = "";

  makeRequest(command);
}

function makeRequest(request) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // Handle the response from the server
        var response = JSON.parse(xhr.responseText);
        if (response.success  === true){
          promptLabel.innerHTML = response.prompt;
        const commandOutputResp = document.createElement("div");
        commandOutputResp.textContent = response.prompt + response.message;

        terminal.insertBefore(commandOutputResp, inputLine);

        // Scroll to the bottom of the terminal
        terminal.scrollTop = terminal.scrollHeight;
      }
      } else {
        // Handle errors
        alert("An error occurred");
      }
    }
  };
  xhr.open("GET", "/api/request?request=" + encodeURIComponent(request));
  xhr.send();
}

commandInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    processCommand();
  }
});
