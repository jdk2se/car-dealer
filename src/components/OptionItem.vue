<template>
    <div class="option"> 
        {{ option.title }} - {{ chosen }}
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Option from '@/models/Option';

export default defineComponent({   
    props: {
        option: {
            required: true,
            type: Object as PropType<Option>,
        },
        chosen: {
            required: true,
            type: String,
        },
    }, 
})
</script>
