<template>
    <div class="p-2" v-if="show">
        <div class="col-12 h-full flex flex-col justify-center custom-modal px-4"
        >
            <div class=" mx-auto col-12 py-4 scroll-responsive bg2"
                  style="max-width: 750px; max-height: 950px"
            >
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            show: {
                type: Boolean,
                required: true,
                default: false
            }
        },
        methods: {
        },
        data () {
            return {
                test: 'test'
            }
        }
    }
</script>

<style>
    .custom-modal {
        top: 0;
        left: 0;
        position: fixed;
        z-index: 1000;
        background-color: rgba(0,0,0,.5);
            justify-content: center;
    align-items: center;
    }
    .flex{
        display: flex;
    }
    .h-full {
    height: 100%;
}
</style>
