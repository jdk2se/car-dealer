<template>  
    <select v-if="isArray(option.variants)" class="configuration-form__field" @change="optionChanged($event)">
        <option value="">{{ option.title }}</option>
        <option
            v-for="(variant, index) in option.variants"
            :value="variant"
            :key="index"
            :selected="chosenOption === variant"
        >
            {{ variant }}
        </option>
    </select>
    <div v-else>
        <label class="option__title" for="{{ option.id }}">{{ option.title }}</label>
        <input type="checkbox" 
            :id="option.id" 
            :value="option.variants" 
            :checked="(true === chosenOption)"
            @change="optionChanged($event, true)"
            v-model="isChecked"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import Option from '@/models/Option';
import OptionType from '@/types/OptionType';

export default defineComponent({
    emits: ['changeOption'],
    props: {
        option: {
            required: true,
            type: Object as PropType<Option>,
        },
        chosenOption: {
            required: true,
            type: [String, Boolean, null] as PropType<OptionType>,
        },
    },
    setup(props, { emit }) {
        function isArray<T = unknown>(x: unknown[] | boolean): x is T[] {
            return Array.isArray(x);
        }

        const isChecked = ref(props.chosenOption);

        const optionChanged = (event: Event, isCheckbox = false) => {                        
            const variant = isCheckbox ? isChecked : (event.target as HTMLInputElement).value;
            emit('changeOption', {id: props.option.id, variant: variant});
        };

        return { isArray, optionChanged, isChecked }
    },
})
</script>
