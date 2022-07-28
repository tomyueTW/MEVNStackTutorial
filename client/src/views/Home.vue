<template>
  <div>
    <div class="row justify-content-md-center">
      <div class="col-md-10">
        <form @submit.prevent="addMessage" class="mb-3">
          <div v-if="error" class="alert alert-dismissible alert-warning">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <h4 class="alert-heading">Error!</h4>
            <p class="mb-0">{{ error }}</p>
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="message.username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter a screen name" required>
          </div>
          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              v-model="message.subject"
              type="text"
              class="form-control"
              id="subject"
              placeholder="Enter a subject" required>
          </div>
          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              v-model="message.message"
              class="form-control"
              id="message"
              rows="3"></textarea>
          </div>
          <div class="form-group">
            <label for="imageURL">Image URL</label>
            <input
              v-model="message.imageURL"
              type="url"
              class="form-control"
              id="imageURL"
              placeholder="Enter URL to an image">
          </div>
          <button type="submit" class="btn btn-primary m-3">Add Message</button>
        </form>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <div class="list-unstyled row" v-for="message in reversedMessages" :key="message._id">
        <li class="media row p-3">
          <img v-if="message.imageURL" class="mr-3 col-6" :src="message.imageURL"
               :alt="message.subject">
          <div class="media-body col-6">
            <h4 class="mt-0 mb-1">{{ message.username }}</h4>
            <h5 class="mt-0 mb-1">{{ message.subject }}</h5>
            {{ message.message }}
            <small>{{ message.created }}</small>
          </div>
        </li>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:4000/messages';

export default {
  name: 'home',
  data: () => ({
    error: '',
    messages: [],
    message: {
      username: '',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((result) => {
        this.messages = result;
      });
  },
  methods: {
    addMessage() {
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.details) {
            // there was an error...
            const error = result.details
              .map((detail) => detail.message)
              .join('. ');
            this.error = error;
          } else {
            this.error = '';
            this.showMessageForm = false;
            this.messages.push(result);
          }
        });
    },
  },
};
</script>

<style>
img {
  max-width: 300px;
  height: auto;
}
</style>
