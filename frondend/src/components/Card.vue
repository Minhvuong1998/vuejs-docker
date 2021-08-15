<template>
  <div class="card overflow-auto">
    <div class="card-body">
      <h5 class="card-title">
        <slot name="title" />
      </h5>
      <p class="card-text">
        <slot name="text" />
      </p>
      <slot />
    </div>
  </div>
</template>