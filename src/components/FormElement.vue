<template>
    <form class="configuration-form" @submit.prevent="state.saveConfiguration()">
        <input 
            class="configuration-form__field"
            type="text"
            placeholder="Название конфигурации"
            :value="state.formTitle"
            @keydown="state.setConfigurationTitle"            
        />
        <OptionEdit 
            v-for="option in state.options.values()" 
            :option="option" 
            :key="option.id"
            :chosenOption="getVariant(option.id)"
            @change-option="changeOption"
        />
        <div class="buttons">
            <button type="submit" class="button button_submit">Сохранить</button>
            <button @click="addOption" type="button" class="button button_option">Добавить</button>
        </div>
        <div class="configuration-form__option-add">
            <input v-model="optionTitle" type="text" class="configuration-form__field" placeholder="Наименование">
            <p>Если параметр является булевым - оставьте поле пустым</p>
            <input v-model="optionVariants" type="text" class="configuration-form__field" placeholder="Параметры, через запятую">
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import State from '@/models/State';
import OptionEdit from './OptionEdit.vue';
import ConfigurationOption from '@/models/ConfigurationOption';

export default defineComponent({
    components: {
        OptionEdit,
    },
    props: {
        state: {
            required: true,
            type: Object as PropType<State>,
        }
    },
    setup(props) {
        const getVariant = (id: string): string | boolean | null => {
            const chosen = props.state.getChosenOptions(props.state.selectedConfiguration.id).find((option) => option.id === id);

            if (chosen) {
                return chosen.variant;
            }

            return null;
        }

        const changeOption = (option: ConfigurationOption) => {
            props.state.changeConfigurationOption(option);
        }

        const optionTitle    = ref('');
        const optionVariants = ref('');

        const addOption = () => {
            props.state.addOption(optionTitle.value, optionVariants.value);
            optionTitle.value    = '';
            optionVariants.value = '';
        }

        return { getVariant, changeOption, optionTitle, optionVariants, addOption }
    },
})
</script>
