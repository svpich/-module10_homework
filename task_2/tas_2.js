const btn = document.querySelector(".btn");
const contentWrapper = document.querySelector(".content-wrapper");

btn.addEventListener("click", () => {
    contentWrapper.innerHTML = 
        `
        <p>
            Ширина экрана: ${document.documentElement.clientWidth}
            <br>
            Высота экрана: ${document.documentElement.clientHeight}
        </p>
        `
})
