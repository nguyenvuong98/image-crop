function GetFile(event){
    var tmppath = URL.createObjectURL(event.target.files[0]);
   CreateCanvas(tmppath);
}
function CreateCanvas(path){
    var canvas = document.createElement("canvas");
    var parent = document.getElementById("show-image");
    var ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 300;
    canvas.style.border = "solid 1px #000";
    var image = new Image();
    image.src = path;
    image.width = canvas.width;
    image.height = canvas.height;
    console.log(image);
    image.onload = () => {
        ctx.drawImage(image,0,0,canvas.width,canvas.height);
    }
    
    parent.appendChild(canvas);
    var checkDown = false;
    var firstX = 0;
    var firstY = 0;
    canvas.onmousedown = (e) => {
        canvas.style.cursor = "move";
        checkDown = true;
        firstX = e.clientX;
        firstY = e.clientY;
    }
    canvas.onmousemove = (e) => {
        if(!checkDown)return;
        MoveContent(e,firstX,firstY,ctx,image);
    }
    canvas.onmouseup = () => {
        checkDown = false;
        canvas.style.cursor = "default";
    }
}
function MoveContent(event,fx,fy,ctx,image){
    var sx = 0;
    var sy = 0;
    if(fx > event.clientX){
        sx = fx - event.clientX;
    }
    else{
        sx = event.clientX - fx;
    }
    if(fy > event.clientY){
        sy = fy - event.clientY;
    }
    else{
        sy = event.clientY - fy;
    }
    ctx.drawImage(image,sx,sy,image.width,image.height,0,0,image.width,image.height);

}