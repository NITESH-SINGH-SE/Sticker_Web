let capture;
let posenet;
let noseX, noseY;
let reyeX, reyeY;
let leyeX, leyeY;
let singlePose, skeleton;
let actor_img;
let specs, smoke;

function setup() {
  let myCanvas = createCanvas(630, 480);
  // createCanvas(0.9*windowWidth, 0.75*windowHeight);
  myCanvas.parent('canvasContainer');
  capture = createCapture(VIDEO);
  capture.hide();

  posenet = ml5.poseNet(capture, modelLoaded);
  posenet.on("pose", receivedPoses);

  specs = loadImage("images/spects.png");
}

function receivedPoses(poses) {
  console.log(poses);

  if (poses.length > 0) {
    singlePose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log("Model has loaded");
}

function draw() {
  // images and videos(webcam)
  image(capture, 0, 0);
  fill(255, 0, 0);

  if (singlePose) {
    // for(let i=0; i<singlePose.keypoints.length; i++){
    //     ellipse(singlePose.keypoints[i].position.x, singlePose.keypoints[i].position.y,20);
    // }
    stroke(255, 255, 255);
    strokeWeight(5);
    // for(let j=0; j<skeleton.length; j++){
    //     line(skeleton[j][0].position.x, skeleton[j][0].position.y, skeleton[j][1].position.x, skeleton[j][1].position.y)
    // }

    image(specs, singlePose.nose.x - 100, singlePose.nose.y - 130, 200, 200);
  }
}

function saveToFile() {
  saveCanvas("mycanvas", "png");
}

// Js code to make color box enable or disable
let colorIcons = document.querySelector(".color-icon"),
  icons = document.querySelector(".color-icon .icons");

icons.addEventListener("click", () => {
  colorIcons.classList.toggle("open");
});

// getting all .btn elements
let buttons = document.querySelectorAll(".btn");

for (var button of buttons) {
  button.addEventListener("click", (e) => {
    //adding click event to each button
    let target = e.target;

    let open = document.querySelector(".open");
    if (open) open.classList.remove("open");

    document.querySelector(".active").classList.remove("active");
    target.classList.add("active");

    // js code to switch colors (also day night mode)
    let root = document.querySelector(":root");
    let dataColor = target.getAttribute("data-color"); //getting data-color values of clicked button
    let color = dataColor.split(" "); //splitting each color from space and make them array

    //passing particular value to a particular root variable
    root.style.setProperty("--white", color[0]);
    root.style.setProperty("--black", color[1]);
    root.style.setProperty("--nav-main", color[2]);
    root.style.setProperty("--switchers-main", color[3]);
    root.style.setProperty("--light-bg", color[4]);

    let iconName = target.className.split(" ")[2]; //getting the class name of icon

    let coloText = document.querySelector(".home-content span");

    if (target.classList.contains("fa-moon")) {
      //if icon name is moon
      target.classList.replace(iconName, "fa-sun"); //replace it with the sun
      colorIcons.style.display = "none";
      coloText.classList.add("darkMode");
    } else if (target.classList.contains("fa-sun")) {
      //if icon name is sun
      target.classList.replace("fa-sun", "fa-moon"); //replace it with the sun
      colorIcons.style.display = "block";
      coloText.classList.remove("darkMode");
      document.querySelector(".btn.blue").click();
    }
  });
}


