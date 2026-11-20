
let odamlar = JSON.parse(localStorage.getItem("odamlar")) || [];

const form = document.getElementById("myForm");
const royhat = document.getElementById("royhat");

function saqlash() {
    localStorage.setItem("odamlar", JSON.stringify(odamlar));
}

function chiqar() {
    royhat.innerHTML = "";

    odamlar.forEach((odam, index) => {
        let tr = document.createElement("tr");

        let qiymatlar = [
            index + 1,
            odam.ism,
            odam.familiya,
            odam.yosh,
            odam.shahar
        ];

        let nomer = document.createElement("td");
        nomer.textContent = qiymatlar[0];
        tr.appendChild(nomer);

        let rasmTd = document.createElement("td");
        let img = document.createElement("img");
        img.src = odam.rasm;
        img.alt = "Profil rasmi";
        rasmTd.appendChild(img);
        tr.appendChild(rasmTd);

        qiymatlar.slice(1).forEach(matn => {
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
            saqlash();
            chiqar();
        };

        amal.appendChild(btn);
        tr.appendChild(amal);

        royhat.appendChild(tr);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let file = document.getElementById("rasm").files[0];

    if (!file || !file.type.startsWith("image/")) {
        alert("Iltimos, rasm tanlang!");
        return;
    }

    if (file.size > 500 * 1024) {
        alert("Rasm 500 KB dan kichik bo'lsin!");
        return;
    }

    let reader = new FileReader();

    reader.onload = function() {
        let odam = {
            ism: document.getElementById("ism").value.trim(),
            familiya: document.getElementById("familiya").value.trim(),
            yosh: document.getElementById("yosh").value,
            shahar: document.getElementById("shahar").value.trim(),
            rasm: reader.result
        };

        odamlar.push(odam);

        try {
            saqlash();
            chiqar();
            form.reset();
        } catch(error) {
            odamlar.pop();
            alert("Xotira to'ldi! Boshqa rasm tanlang.");
        }
    };

    reader.readAsDataURL(file);
});

chiqar();
