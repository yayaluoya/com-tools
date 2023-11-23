<script lang="ts">
import { ref, reactive, defineComponent } from 'vue';
import { Vector2 } from 'yayaluoya-tool/Vector2';

export default defineComponent({
    components: {},
    props: {},
    setup(props, ctx) {
        const a = reactive<{
            a: string;
        }>({
            a: '',
        });
        console.log(new Vector2());
        return {};
    },
});
</script>

<template>
    <div class="test">测试页面</div>
</template>

<style scoped lang="scss">
.test {
}
</style>
