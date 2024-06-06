<template>
    <input type="date" :name="props.name" :autocomplete="props.name"
        class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        :placeholder="props.placeholder" :value="props.modelValue" @input="updateValue($event)" />
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    modelValue: String,
    placeholder: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(event: any) {
    emit('update:modelValue', event.target.value)
}
</script>