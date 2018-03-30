<template>
        <router-view></router-view>
</template>

<script>
    export default {
        name: 'app',
    }
</script>

<style lang="scss">
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    ul, li{
        list-style-type: none;
        padding: 0;
    }
    
    body, html {
        height: 100%;
        font-family: 'Segoe UI', Verdana, Geneva, Tahoma, sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background: #fff;
    }
</style>
