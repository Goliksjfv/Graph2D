 function UI({ addFunction, delFunction, setColor, setWidth }) {
    let num = 0;
    document.getElementById('addFunction').addEventListener('click', addClickHander);
    function addClickHander() {
        const input = document.createElement('input');
        input.setAttribute('placeholder', 'Функция N' + num);
        input.dataset.num = num;
        input.addEventListener('keyup', keyUpHandler);

        const inputcolor = document.createElement('input');
        inputcolor.setAttribute('placeholder', 'Сolor');
        inputcolor.addEventListener('keyup', setColorHandler);
        inputcolor.dataset.num = num;
   
        const inputWidth = document.createElement('input');
        inputWidth.setAttribute('placeholder', 'Width');
        inputWidth.addEventListener('keyup', setWidthHandler);
        inputWidth.dataset.num = num;

        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            delFunction(input.dataset.num - 0);
            funcInputs.removeChild(input);
            funcInputs.removeChild(inputcolor);
            funcInputs.removeChild(inputWidth);
            funcInputs.removeChild(button);
        });
        var funcInputs = document.getElementById('funcInputs');
        funcInputs.appendChild(input);
        funcInputs.appendChild(inputcolor);
        funcInputs.appendChild(inputWidth);
        funcInputs.appendChild(button);
        num++;
    }
    function keyUpHandler() {
        try {
            let f;
            //let color;
            eval(`f=function(x){return ${this.value};}`);
            //eval(`color=${inputcolor.value};`);
            //color = inputcolor.value;
            addFunction(f, this.dataset.num - 0/*,color*/);
        } catch (e) {
            console.log('ощибка ввода', e);
        }
    }

    function setColorHandler() {
        setColor(this.value,this.dataset.num - 0);
    }

    function setWidthHandler() {
        setWidth(this.value,this.dataset.num - 0);
    }

    

}