<template>
    <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999">
        <div v-if="visible" class="toast align-items-center text-white border-0 show" :class="`bg-${type}`"
            role="alert">
            <div class="d-flex">
                <div class="toast-body">{{ message }}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="hide"></button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Toast",
    data() {
        return {
            visible: false,
            message: "",
            type: "primary",
        };
    },
    methods: {
        show(message, type = "primary") {
            this.message = message;
            this.type = type;
            this.visible = true;

            setTimeout(() => {
                this.hide();
            }, 3000);
        },
        hide() {
            this.visible = false;
        },
    },
};
</script>
