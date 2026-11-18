
let odamlar = JSON.parse(localStorage.getItem("odamlar")) || [];

const form = document.getElementById("myForm");
const royhat = document.getElementById("royhat");

function chiqar() {
    royhat.innerHTML = "";

    odamlar.forEach((odam, index) => {
        let tr = document.createElement("tr");

        [index + 1, odam.ism, odam.familiya, odam.yosh, odam.shahar]
        .forEach(matn => {
            let td = document.createElement("td");
            td.textContent = matn;
            tr.appendChild(td);
        });

        let amal = document.createElement("td");
        let btn = document.createElement("button");

        btn.textContent = "O'chirish";
        btn.className = "delete";

        btn.onclick = function() {
            odamlar.splice(index, 1);
            localStorage.setItem("odamlar", JSON.stringify(odamlar));
            chiqar();
        };

        amal.appendChild(btn);
        tr.appendChild(amal);

        royhat.appendChild(tr);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let odam = {
        ism: document.getElementById("ism").value.trim(),
        familiya: document.getElementById("familiya").value.trim(),
        yosh: document.getElementById("yosh").value,
        shahar: document.getElementById("shahar").value.trim()
    };

    odamlar.push(odam);

    localStorage.setItem("odamlar", JSON.stringify(odamlar));

    chiqar();
    form.reset();
});

chiqar();
