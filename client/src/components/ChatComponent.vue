<template>
  <div class="chat">
    <h2>Chat Room</h2>
    <div class="messages">
      <!-- For all messages in the array, show them to the board -->
      <div v-for="message in messages" :key="message.id">
        <strong>{{ message.username }}:</strong> {{ message.text }}
      </div>
    </div>
    <input v-model="username" placeholder="Username" />
    <!-- Removed button in favor of a certainly intuitive "just press enter" -->
    <input v-model="newMessage" placeholder="Type a message" @keyup.enter="sendMessage" />
  </div>
</template>

<script>

// Set default context for template to use
export default {
  data() {
    return {
      ws: null,
      newMessage: '',
      username: '',
      messages: [],
    };
  },
  // When the component is created, create a new WebSocket connection
  created() {
  this.ws = new WebSocket('ws://localhost:8081');
  this.ws.onmessage = (event) => {

    // Debugging because this is terrible at adequately showing errors.
    console.log("Received data:", event.data); 
    console.log("messages:", this.messages);
    console.log
    
    // Handle errors like a person from 1990 because javascript is terrible
    try {
      // Parse the buffer obj since for some reason it wants to send raw ASCII
      const bufferObj = JSON.parse(event.data);
      if (bufferObj.type === 'Buffer' && Array.isArray(bufferObj.data)) {
        // Convert the ASCII codes back to a string
        const messageString = String.fromCharCode(...bufferObj.data);
        // Re-jsonify the data and store the message
        const message = JSON.parse(messageString);
        this.messages.push(message);
      } else {
        console.error("Received data is not a valid Buffer object.");
      }
    } catch (e) {
      console.error("Error processing message:", e);
    }
  };
},
  methods: {
    // Send to the server
    sendMessage() {
      if (this.newMessage !== '') {
        // Format the message and username as json, send message
        const message = { username: this.username, text: this.newMessage };
        this.ws.send(JSON.stringify(message));
        // Clear the message box
        this.newMessage = '';
      }
    },
  },
};
</script>