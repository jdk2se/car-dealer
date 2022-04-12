<template>
  <div class="app">
    <div>
      <button class="button button_add" @click="state.editConfiguration(null)">+</button>
      <ConfigurationList :state="state" />
    </div>
    <FormElement v-if="state.isFormShow" :state="state" />
  </div>
</template>

<script lang = "ts">
import { defineComponent, ref } from 'vue';
import ConfigurationList from './components/ConfigurationList.vue';
import FormElement from './components/FormElement.vue';
import State from './models/State';

const state = ref<State>(new State());

export default defineComponent({
  name      : 'App',
  components: {
    ConfigurationList,
    FormElement,
  },
  setup() {
    return { state }
  },
});
</script>
