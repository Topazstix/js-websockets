<!-- Blanket template to serve the chat application -->
<template>
  <div id="app">
    <Chat />
  </div>
</template>

<script>
import Chat from './components/ChatComponent.vue';

export default {
  name: 'App',
  components: {
    Chat,
  },
};
</script>