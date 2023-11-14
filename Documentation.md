# Development and Configuration

<!-- Side note. fuck this project. this has genuinelly fucking agitated me trying to get this to operate in the fashion i want it to. -->

## Initial Configurations

We are utilizing express and ws as our server backend framework along with vue for our client side front end framework. 

### Client Side Configuration

1. Install vue globally
   1. `npm install -g @vue/cli`
2. Run the following and select vue3 when asked
   1. `vue create frontend`
3. Run `npm install socket.io-client`

### Server Side Configuration

1. Install ws and express (why express you ask? because i tried flat ws with javascript file and i got zero things working)
   1. `npm install ws express`

## Docker

Simply run `docker compose up` to spin the chatroom up.
