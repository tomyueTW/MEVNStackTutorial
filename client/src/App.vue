<template>
  <div id="app">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-dark bg-primary mt-3">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">MEVN Stack Tutorial</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarColor01" aria-controls="navbarColor01"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
      <router-view/>
    </div>
  </div>
</template>
