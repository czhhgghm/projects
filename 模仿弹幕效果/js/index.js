var oBtn = document.getElementsByClassName('btn')[0],
    oInput = document.getElementsByClassName('input')[0],
    oMain = document.getElementsByClassName('main')[0];
var mainW = oMain.offsetWidth;
oBtn.onclick = function () {
    send();
}
oInput.onkeyup = function (e) {
    if(e.keyCode == 13) {
        send();
    }
}
function send() {
    if(oInput.value.length <= 0 || (/^\s+$/).test(oInput.value)) {
        alert('内容不能为空');
        return;
    }else if(oInput.value.length >= 20){
        alert('内容不能超过20')
        return;
    }
    createText(oInput.value);//实参
    oInput.value = ''; 
}
function createText(str) {//形参
    var oSpan = document.createElement('span');
    oSpan.innerText = str;
    oSpan.className = 'text';
    oMain.appendChild(oSpan);
    oSpan.style.left = mainW + 'px';

    slider(oSpan, {
        color: 'rgb('+ Math.random()*255 +', '+ Math.random()*255+','+ Math.random()*255+')',
        fontSize: Math.random() * 16 + 16,
        top:  Math.random() * 150,
        timing: Math.floor(Math.random()*3)
    });
}
function slider(dom, opt) {
    dom.style.color = opt.color;
    dom.style.fontSize = opt.fontSize + 'px';
    dom.style.top = opt.top + 'px'; 

    dom.timer = setInterval(function () {
        if(dom.offsetLeft >= -dom.offsetWidth && dom.offsetLeft <= mainW) {
            switch(opt.timing) {
                case 0: 
                    dom.style.left = dom.offsetLeft - 2 + 'px';
                    break;
                case 1:
                    dom.style.left = dom.offsetLeft - 4 + 'px';
                    break;
                case 2:
                    dom.style.left = dom.offsetLeft - 6 + 'px';
            }
        }else {
            clearInterval(dom.timer);
            oMain.removeChild(dom);
        }
    }, 30);
}






