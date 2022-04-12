<template>
    <div class="configuration">
        <div class="configuration__title" @click="descriptionHandler">
            <div>{{ configuration.title }}</div> 
            <div @click.stop="$emit('editConfiguration', configuration.id)">&#9998;</div>
        </div>
        <div class="configuration__description" v-if="isDescriptionShown">
            <div class="options-list">
                <OptionItem
                    v-for="option in options.values()"
                    :key="option.id"
                    :option="option"
                    :chosen="getVariant(option.id)"
                />    
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Configuration from '@/models/Configuration';
import OptionItem from './OptionItem.vue';
import ConfigurationOption from '@/models/ConfigurationOption';
import Option from '@/models/Option';

export default defineComponent({
    components: { OptionItem },
    props: {
        configuration: {
            required: true,
            type: Object as PropType<Configuration>,
        },
        options: {
            required: true,
            type: Object as PropType<Option[]>,
        },
        chosenOptions: {
            required: true,
            type: Array as PropType<ConfigurationOption[]>,
        }
    },
    setup(props) {
        const isDescriptionShown = ref(false);

        const descriptionHandler = () => {
            isDescriptionShown.value = !isDescriptionShown.value;
        }

        const getVariant = (id: string): string => {
            const chosen = props.chosenOptions.find((option) => option.id === id);

            if (chosen) {
                return (typeof chosen.variant === 'boolean') ? 'да' : chosen.variant;
            }

            return 'не выбрано';
        }

        return {isDescriptionShown, descriptionHandler, getVariant}
    },
})
</script>
