var song="";
leftwristx=0;
leftwristy=0
rightwristx=0
rightwristy=0

scoreleftwrist=0;
scorerightwrist=0;
song1status="";
song2status="";
song1="";
song2="";
function preload(){
    song1=loadSound("music1.mp3");
    song2=loadSound("music2.mp3");


}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
poseNet=ml5.poseNet(video,modelloaded);
poseNet.on("pose",gotposes)
}
function modelloaded(){
console.log("model has been initialized")
}

function gotposes(results){
if(results.length>0){
    scoreleftwrist=results[0].pose.keypoints[9].score;
    scorerightwrist=results[0].pose.keypoints[10].score;
    console.log(results);
    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("leftwristx="+leftwristx)
    console.log("leftwristy="+leftwristy)
    console.log("rightwristx="+rightwristx)
    console.log("rightwristy="+rightwristy)

}
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        song2.stop();
        if (song1status==false){
            song1.play();
            document.getElementById("span").innerHTML="Playing: Shape of You (Ed Sheeran)"
        }
    }

    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        song1.stop();
        if (song2status==false){
            song2.play();
            document.getElementById("span").innerHTML="Playing: A Team (Ed Sheeran)"
        }
    }


}

function play(){
    song.play();
    song.setVolume(0.2);
    song.rate(2.5);
}
