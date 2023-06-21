const btn = document.querySelector(".btn");
const contentWrapper = document.querySelector(".content-wrapper");

btn.addEventListener("click", () => {
    window.alert(`
            Ширина экрана: ${document.documentElement.clientWidth}
            Высота экрана: ${document.documentElement.clientHeight}
    `)
})
