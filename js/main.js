function sin(x) {
    return Math.sin(x);
}

function xx(x) {
    return x * x;
}

//pisyapopakakashk

//lim = (f(x+dx)-f(x))/dx

//y=kx+b;

//b=kx-y;

window.onload = function () {


    let useInterpolation = false;

    document.getElementById('setInterpolation').addEventListener('click',function(event){
        useInterpolation=event.target.checked;
        console.log(this.checked, event.target.checked);
    });

    const funcs = [];

    var WIN = {
        left: -5,
        bottom: -5,
        width: 10,
        height: 10
    };

    const getIntegral=(f,a,b)=>{
        const dx = (b-a)/1000;
        let x = a;
        let s = 0;
        while (x<=b) {
            //
            s+=(Math.abs(f(x))+Math.abs(f(x+dx)))/2*dx;
            //
            x+=dx;
        }
        return s;
    }

    function printIntegral(f,a,b){
        if(a!==b){
            const dx=(b-a)/100;
            let x=a;
            const points=[{x,y:0}];
            while(x<=b){
                points.push({x,y:f(x)});
                x+=dx;
            }
            points.push({x:b,y:0});
            graph.polygon(points);
        }
    }

    const mouseup = () => {
        canMove = false;
    }

    const mouseleave = () => {
        canMove = false;
    }

    const points = [];
 

    


    const mousedown = () => {
        if (useInterpolation){

            const elem = document.querySelector('canvas'); 

            elem.addEventListener('mousemove', function (event) {
  
            const x = event.clientX; 
            const y = event.clientY;
            //elem.addEventListener('click', graph.pointCanvas(x,y));
            const mouseX = graph.sx(x);
            const mouseY = graph.sy(y);
            console.log(`Координаты мыши: x=${mouseX}, y=${mouseY}`); 
            });

            elem.addEventListener('click', function (event) {
  
            const x = event.clientX; 
            const y = event.clientY;
            graph.pointCanvas(x,y);
        
            });



            points.push({sx, y:123});
            return;
        }
        
        canMove = true;
    }
/*
    while(useInterpolation){
            const elem = document.querySelector('canvas'); 

            elem.addEventListener('mousemove', function (event) {
  
            const x = event.clientX; 
            const y = event.clientY;
            //elem.addEventListener('click', graph.pointCanvas(x,y));
            const mouseX = graph.sx(x);
            const mouseY = graph.sy(y);
            console.log(`Координаты мыши: x=${mouseX}, y=${mouseY}`); 
            });

            elem.addEventListener('click', function (event) {
  
            const x = event.clientX; 
            const y = event.clientY;
            graph.pointCanvas(x,y);
        
            });
    }*/

    let canMove = false;

    const graph = new Graph({
        id: 'canvas',
        width: 800,
        height: 800,
        WIN,
        callbacks: {
            wheel, mousemove, mouseleave, mouseup, mousedown,
        }
    });
    const ui = new UI({ addFunction, delFunction,setColor,setWidth });

    function addFunction(f, num) {
        funcs[num] = {
            f,
            color:'#f23',
            width: 3
        };
        render();
    }

    

    function delFunction(num) {
        funcs[num] = null;
        render();
    }

    function setColor(color,num){
        funcs[num].color=color;
        render();
    }

    function setWidth(width,num){
        funcs[num].width=width;
        render();
    }


    function mousemove(event) {
        if (canMove) {
            WIN.left -= graph.sx(event.movementX);
            WIN.bottom -= graph.sy(event.movementY);
            render();
        }
    }

    var ZOOM_STEP = 0.2;

    function wheel(event) {
        var delta = event.wheelDelta > 0 ? -ZOOM_STEP : ZOOM_STEP;
        if (WIN.width + delta > 0) {
            WIN.width += delta;
            WIN.height += delta;
            WIN.left -= delta / 2;
            WIN.bottom -= delta / 2;
            render();
        }
    }

    function getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) {
            return null;
        }
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(a) - f(b)) <= eps) {
            return (a + b) / 2;
        }
        const half = (a + b) / 2;
        if (f(a) * f(half) < 0) {
            return getZero(f, a, half, eps);
        }
        if (f(half) * f(b) < 0) {
            return getZero(f, half, b, eps);
        }
    }

    function getZeros(f, n = 100) {
        const segments = [];
        const dx = WIN.width / n;
        let a = WIN.left;
        let b = WIN.left;
        while (b <= WIN.width + WIN.left) {
            b += dx;
            if (f(a) * f(b) < 0) {
                if (Math.abs(f(a)) + Math.abs(f(b)) < 1) {
                    segments.push({ a, b });
                }
                a = b;
            }
        }
        segments.forEach(({ a, b }) =>
            printZero(getZero(f, a, b))
        );
    }

    function printOXY() {
        // OX
        graph.line(
            WIN.left, 0,
            WIN.left + WIN.width, 0, '#000'
        );
        // OY
        graph.line(
            0, WIN.bottom,
            0, WIN.bottom + WIN.height, '#000'
        );

        for (var i = 0; i < WIN.left + WIN.width; i++) {
            graph.line(
                i, WIN.bottom,
                i, WIN.bottom + WIN.height,
                '#0003', 1
            );
        }
        for (var i = 0; i > WIN.left; i--) {
            graph.line(
                i, WIN.bottom,
                i, WIN.bottom + WIN.height,
                '#0003', 1
            );
        }
        for (var i = 0; i < WIN.bottom + WIN.height; i++) {
            graph.line(
                WIN.left, i,
                WIN.left + WIN.width, i,
                '#0003', 1
            );
        }
        for (var i = 0; i > WIN.bottom; i--) {
            graph.line(
                WIN.left, i,
                WIN.left + WIN.width, i,
                '#0003', 1
            );
        }
    }

    function printFunction(f, color, width, n = 200) {
        var x = WIN.left;
        var dx = WIN.width / n;
        while (x <= WIN.width - WIN.left) {
            graph.line(
                x, f(x),
                x + dx, f(x + dx), color, width
            );
            x += dx;
        }
    }

    function printZero(x = 0) {
        graph.point(x, 0, '#0f0', 3);
    }



    function render() {
        graph.clear();
        printOXY();
        funcs.forEach(funcs => funcs && printFunction(funcs.f, funcs.color, funcs.width));
        //printFunction(sin, 100, 'red');
        //printFunction(xx, 100, 'blue');
        //getZeros(sin);
    }

    render();
}