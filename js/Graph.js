function Graph({ id, width = 300, height = 300, WIN, callbacks }) {
    let canvas;
    if (id) {
        canvas = document.getElementById('canvas');
    } else {
        canvas = document.createElement('canvas');
        document.querySelector('body').appendChild(canvas);
    }
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");

    const { wheel, mousemove, mouseleave, mouseup, mousedown } = callbacks;
    canvas.addEventListener('wheel', wheel);
    canvas.addEventListener('mousemove', mousemove);
    canvas.addEventListener('mouseleave', mouseleave);
    canvas.addEventListener('mouseup', mouseup);
    canvas.addEventListener('mousedown', mousedown);

    var PI2 = Math.PI * 2;

    this.sx = x => x * WIN.width / canvas.width;
    this.sy = y => -y * WIN.height / canvas.height;

    function xs(x) {
        return (x - WIN.left) / WIN.width * canvas.width;
    }

    function ys(y) {
        return canvas.height - (y - WIN.bottom) / WIN.height * canvas.height;
    }


    this.pointCanvas = function (x, y, color = '#f00', size = 2){
        context.beginPath();
        context.strokeStyle = '#000';
        context.fillStyle = color;
        context.arc(
            x, y,
            size, 0, PI2
        );
        context.stroke();
        context.fill();
        context.closePath();
    }
/*

    const elem = document.querySelector('canvas'); 

    elem.addEventListener('mousemove', function (event) {
  
    const x = event.clientX; 
    const y = event.clientY;
    elem.addEventListener('click', pointCanvas(x,y));
    const mouseX = sx(x);
    const mouseY = sy(y);
    console.log(`Координаты мыши: x=${mouseX}, y=${mouseY}`); 
    });

*/

    this.clear = function () {
        context.fillStyle = '#efe';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    this.line = function (x1, y1, x2, y2, color, width) {
        context.beginPath();
        context.strokeStyle = color || '#f00';
        context.lineWidth = width || 2;
        context.moveTo(xs(x1), ys(y1));
        context.lineTo(xs(x2), ys(y2));
        context.stroke();
        context.closePath();
    }

    this.point = function (x, y, color = '#f00', size = 2) {
        context.beginPath();
        context.strokeStyle = '#000';
        context.fillStyle = color;
        context.arc(
            xs(x), ys(y),
            size, 0, PI2
        );
        context.stroke();
        context.fill();
        context.closePath();
    }

   


    this.polygon=function(points,color='#f805'){
        context.fillstyle=color;
        context.beginPath();
        context.moveTo(xs(points[0].x),ys(points[0].y));
        for(let i=1;i<points.length;i++){
            context.lineTo(xs(points[i].x),ys(points[i].y));
        }
        context.lineTo(xs(points[0].x),ys(points[0].y));
        context.closePath();
        context.fill();
    }
}