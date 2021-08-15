<template>
  <div class="mb-3">
    <label class="form-label">{{ label }}</label>
    <input
      :value="inputValue"
      :type="type"
      class="form-control"
      :placeholder="placeholder"
      :class="{
        'border border-danger': error
      }"
      @input="handleInput"
    >
    <span v-if="error" class="text-danger"> {{ error }} </span>
  </div>
</template>
<script lang="ts">
import { computed,defineComponent } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: '' 
    },
    error: {
      type: String,
      default: null
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return {
      inputValue: computed(() => <string>props.modelValue),
       handleInput: (e: Event) =>
        emit('update:modelValue', (<HTMLInputElement>e.target).value),
    }
  },
});
</script>
