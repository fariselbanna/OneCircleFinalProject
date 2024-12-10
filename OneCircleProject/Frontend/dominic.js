// Handle Connect Button
document.getElementById("connect-btn").addEventListener("click", () => {
    const connectButton = document.getElementById("connect-btn");
    alert("You are now connected with Dominic Dabish!");
    connectButton.textContent = "Connected";
    connectButton.classList.add("connected"); // Add class to change color
    connectButton.disabled = true;
});

// Handle Message Button
document.getElementById("message-btn").addEventListener("click", () => {
    const modal = document.getElementById("message-modal");
    modal.style.display = "block"; // Show the modal
});

// Close the Modal
document.getElementById("close-modal").addEventListener("click", () => {
    const modal = document.getElementById("message-modal");
    modal.style.display = "none"; // Hide the modal
});

    // Send Message from Modal and Save to the Local Storage
document.getElementById("send-message").addEventListener("click", () => {
    const messageBox = document.getElementById("message-box");
    const message = messageBox.value.trim();

    if (message) {

        // Retrieve existing messages or initialize the queue
        const messageQueue = JSON.parse(localStorage.getItem("dominicMessages")) || [];

        // Add the user's message
        const userMessage = {
            sender: "You",
            message: message,
            timestamp: new Date().toLocaleString(),
        };
        messageQueue.push(userMessage);

        // Add Doms automated reply
        const dominicReply = {
            sender: "Dominic Dabish",
            message: "Thank you for messaging me. I will get back to you as soon as possible.",
            timestamp: new Date().toLocaleString(),
        };
        messageQueue.push(dominicReply);

        // Save the updated queue to local storage      
        localStorage.setItem("dominicMessages", JSON.stringify(messageQueue));

        // Update the conversation on the page
        updateConversation();

        // Clear the text area and close the modal
        messageBox.value = "";
        const modal = document.getElementById("message-modal");
        modal.style.display = "none";
    } else {
        alert("Please write a message before sending.");
    }
});

// Close Modal on Outside Click
window.addEventListener("click", (event) => {
    const modal = document.getElementById("message-modal");
    if (event.target === modal) {
        modal.style.display = "none"; // Hide the modal
    }
});

// Update the conversation container with messages from local storage
function updateConversation() {
    const conversationContainer = document.getElementById("conversation-container");
    const messageQueue = JSON.parse(localStorage.getItem("dominicMessages")) || [];

    // Clear the container
    conversationContainer.innerHTML = "";

    // Append messages to the container
    messageQueue.forEach((msg) => {
        const messageDiv = document.createElement("div");
        messageDiv.className = "message";
        messageDiv.innerHTML = `
            <p><strong>${msg.sender}:</strong> ${msg.message}</p>
            <p class="timestamp">${msg.timestamp}</p>
        `;
        conversationContainer.appendChild(messageDiv);
    });
}

// Clear Conversation Button
document.getElementById("clear-conversation").addEventListener("click", () => {
    const messageQueue = JSON.parse(localStorage.getItem("dominicMessages")) || [];
    if (messageQueue.length === 0) {
        alert("No conversation to clear.");
        return;
    }

    // Backup the current conversation
    localStorage.setItem("dominicMessagesBackup", JSON.stringify(messageQueue));

    // Clear the conversation
    localStorage.removeItem("dominicMessages");

    // Update the conversation on the page
    updateConversation();

    alert("Conversation cleared. You can undo this action if needed.");
});

// Undo Clear Button
document.getElementById("undo-clear").addEventListener("click", () => {
    const backupQueue = JSON.parse(localStorage.getItem("dominicMessagesBackup")) || [];
    if (backupQueue.length === 0) {
        alert("No cleared conversation to undo.");
        return;
    }

    // Restore the conversation from backup
    localStorage.setItem("dominicMessages", JSON.stringify(backupQueue));

    // Update the conversation on the page
    updateConversation();

    // Remove the backup
    localStorage.removeItem("dominicMessagesBackup");

    alert("Cleared conversation has been restored.");
});

// Initial load: Populate the conversation with existing messages
updateConversation();
