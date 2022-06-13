objects = [];
stattus = "";

function preload(){
}
function setup(){
    canvas = createCanvas(440,320);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 440, 320);

    if(stattus != "")
    {
        objectDetector.detect(video, gotResult);
        for(i = 0; i > objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("textinput").value;
    if(objects[i].label == input){
        video.stop();
        objectDetector.detect(gotResult);
        speechSynthesis = window.speechSynthesis;
        utterThis = SpeechSynthesisUtterance(objects[i].label + " found");
        document.getElementById("status").innerHTML = "Object Mentioned Found";
        utterThis.speak();
    }else{
        speechSynthesis = window.speechSynthesis;
        speakThis = SpeechSynthesisUtterance(objects[i].label + " not found");
        document.getElementById("status").innerHTML = "Object Mentioned NOT Found";
        speakThis.speak();
    }
}
function modelLoaded(){
    console.log("Model Loaded!");
    stattus = true;
}
function gotResult(error,results){
    if(error)
    {
        console.error(error);
    }else{
        console.log(results);
        object = results;
    }
}