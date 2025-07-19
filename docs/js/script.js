const co_btn = document.querySelectorAll('.mebtn');
for (let i = 0; i < co_btn.length; i++) {
    console.log(i);
    co_btn[i].addEventListener("click", () => {
        memuid.classList.toggle('memu_open');
    });
}

document.getElementById("upconfig_oc").addEventListener("click",()=>{
    upconfig.classList.toggle("hidden");
});

document.getElementById("infodia_o").addEventListener("click",()=>{
    infodia.showModal();
});
document.getElementById("infodia_c").addEventListener("click",()=>{
    infodia.close();
});
tojispeak.addEventListener("change", function () {
    if ('speechSynthesis' in window) {
        if (tojispeak.checked) {
            tospnai.removeAttribute("disabled");
        } else {
            tospnai.setAttribute("disabled", true);
        }
    } else {
        alert('このブラウザは音声合成に対応していません');
        tojispeak.setAttribute("disabled", true);
    }
});