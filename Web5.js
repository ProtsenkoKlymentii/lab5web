document.addEventListener("DOMContentLoaded", () => {
    // 1. Меняем тексты между блоками 1 и 6
    const text1 = document.getElementById("text1");
    const text6 = document.getElementById("text6");
    [text1.textContent, text6.textContent] = [text6.textContent, text1.textContent];

    // 2. Вычисляем площадь ромба
    document.getElementById("calcRhombus").addEventListener("click", () => {
        const diagonal1 = 10; // первая диагональ
        const diagonal2 = 12; // вторая диагональ
        const area = (diagonal1 * diagonal2) / 2;
        document.getElementById("rhombusResult").textContent = `Площадь ромба: ${area}`;
    });

    // 3. Проверяем возможность построения треугольника
    const triangleForm = document.getElementById("triangleForm");
    triangleForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const a = parseFloat(document.getElementById("sideA").value);
        const b = parseFloat(document.getElementById("sideB").value);
        const c = parseFloat(document.getElementById("sideC").value);

        const isTriangle = a + b > c && a + c > b && b + c > a;
        const message = isTriangle ? "Треугольник можно построить" : "Треугольник нельзя построить";
        alert(message);

        document.cookie = `triangleCheck=${message}; path=/;`;

        if (confirm("Удалить cookies?")) {
            document.cookie = "triangleCheck=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            location.reload();
        } else {
            alert("Перезагрузите страницу для проверки cookies.");
        }
    });

    // 4. Курсив текста в блоке 4 при наведении
    const block4 = document.getElementById("text2");
    if (localStorage.getItem("isItalic") === "true") block4.style.fontStyle = "italic";

    document.querySelectorAll("input[name='textStyle']").forEach((radio) => {
        radio.addEventListener("change", () => {
            const isItalic = radio.value === "italic";
            localStorage.setItem("isItalic", isItalic);
        });
    });

    block4.addEventListener("mouseover", () => {
        if (localStorage.getItem("isItalic") === "true") {
            block4.style.fontStyle = "italic";
        }
    });

    block4.addEventListener("mouseout", () => {
        block4.style.fontStyle = "normal";
    });

    // 5. Нумерованный список
    const list = document.getElementById("dynamicList");
    const savedList = JSON.parse(localStorage.getItem("list")) || [];

    savedList.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;
        li.style.color = index % 2 === 0 ? "black" : "white";
        li.style.backgroundColor = index % 2 === 0 ? "white" : "black";
        list.appendChild(li);
    });

    document.getElementById("addItem").addEventListener("click", () => {
        const newItem = prompt("Введите элемент списка:");
        if (newItem) {
            const li = document.createElement("li");
            const index = list.children.length;
            li.textContent = newItem;
            li.style.color = index % 2 === 0 ? "black" : "white";
            li.style.backgroundColor = index % 2 === 0 ? "white" : "black";
            list.appendChild(li);
        }
    });

    document.getElementById("saveList").addEventListener("click", () => {
        const items = Array.from(list.children).map((li) => li.textContent);
        localStorage.setItem("list", JSON.stringify(items));
        alert("Список сохранен!");
    });

    // 6. Очистка списка
    document.getElementById("clearList").addEventListener("click", () => {
        list.innerHTML = ''; // Очистить список
        localStorage.removeItem("list"); // Удалить сохраненные данные из localStorage
        alert("Список очищен!");
    });
});
