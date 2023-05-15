<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';

export default defineComponent({
    components: {},
    props: {},
    setup(props, ctx) {
        const a = reactive<{
            a: string;
        }>({
            a: '',
        });
        return {};
    },
});
</script>

<template>
    <div class="test">hhh</div>
</template>

<style scoped lang="scss">
.test {
}
</style>
