<template>
   <div class="configurations-list">
       <ConfigurationItem
            v-for="configuration in state.configurations.values()" 
            :key="configuration.id" 
            :configuration="configuration"
            :options="state.options"
            @edit-configuration="editConfiguration"
            :chosenOptions="state.getChosenOptions(configuration.id)"
       />
   </div> 
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ConfigurationItem from './ConfigurationItem.vue';
import State from '@/models/State';

export default defineComponent({
    components: {
        ConfigurationItem,
    },
    props: {
        state: {
            required: true,
            type: Object as PropType<State>
        },        
    },
    setup(props) {
        const editConfiguration = (id: string) => {
            props.state.editConfiguration(id);
        }

        return { editConfiguration }
    },
})
</script>
