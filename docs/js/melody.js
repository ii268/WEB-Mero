//メモ: Audioイベント一覧 https://developer.mozilla.org/ja/docs/Web/API/HTMLMediaElement
//イベント定義

class housousetubi {
    hassya_on() {
        if (this.hasya_audio.src == "") {
            alert("選択されていません");
            return 0;
        } else {
            this.hasya_audio.play();
            this.hasya_audio.loop = true;
            return 1;
        }
    }

    hassya_off() {
        if (this.tojime_audio.src != "") {
            this.tojime_audio.play()
        }
        if (this.tmode) {
            this.hasya_audio.loop = false;
        } else {
            this.hasya_audio.pause();
            this.hasya_audio.currentTime = 0;
        }
        if (this.tojispeak) {
            this.speak(this.tojispeak_text);
        }
    }

    set_hassya(res) {
        this.hasya_audio.src = res;
    }

    set_tojime(res) {
        this.tojime_audio.src = res;
    }

    speak(res) {
        let ssh = window.speechSynthesis;
        ssh.cancel();
        let ssu = new SpeechSynthesisUtterance(res);
        ssh.speak(ssu);
    }

    constructor() {
        this.hasya_audio = new Audio();
        this.tojime_audio = new Audio();
        this.tmode = false;
        this.tojispeak = false;
        this.tojispeak_text = "ドアがしまります。ご注意ください。";
    }
}

class hassya_switch {
    on_style() {
        this.onb.style.boxShadow = "none";
        this.onb.style.transform = "translateY(5px)";
    }
    off_style() {
        this.onb.style.boxShadow = "0 5px 0 #111";
        this.onb.style.transform = "none";
    }
    constructor(onb, offb) {
        this.onb = onb;
        this.offb = offb;
    }
}

const hs = new housousetubi();
const sw = new hassya_switch(on, off);
console.log(hs);
on.addEventListener("click", () => {
    if (hs.hassya_on()) {
        sw.on_style();
    }
});
off.addEventListener("click", () => {
    hs.hassya_off();
    sw.off_style();
});
document.addEventListener("keypress", function (keydata) {
    if (keydata.code == "KeyW") {
        if (hs.hassya_on()) {
            sw.on_style();
        }
    } else if (keydata.code == "KeyS") {
        hs.hassya_off();
        sw.off_style();
    }
});
Tmode.addEventListener("change", () => {
    hs.tmode = Tmode.checked;
    console.log(Tmode.checked);
});
tojispeak.addEventListener("change", () => {
    hs.tojispeak = tojispeak.checked;
    console.log(tojispeak.checked);
});
tospnai.addEventListener("change", () => {
    hs.tojispeak_text = tospnai.value;
})


// ファイル読み込みしbese64化
// 発車メロディ
hasya_file.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", function (e) {//ファイル読み込み後のイベント定義
        hs.set_hassya(e.currentTarget.result);
    });

    reader.addEventListener("error", () => {
        alert('発車メロディ読み込み時にエラーが発生しました');
    });

    if (hasya_file.files[0] === undefined) {
    } else {
        reader.readAsDataURL(hasya_file.files[0]);//ファイルを読み込んでDataURLを生成
    }
});
// 戸閉放送
tojime_file.addEventListener("change", function () {
    const reader2 = new FileReader();
    reader2.addEventListener("load", function (e) {
        hs.set_tojime(e.currentTarget.result);
    });

    reader2.addEventListener("error", () => {
        alert('戸閉放送読み込み時にエラーが発生しました');
    });

    if (tojime_file.files[0] === undefined) {
    } else {
        reader2.readAsDataURL(tojime_file.files[0]);
    }
});