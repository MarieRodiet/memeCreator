import './general';

class Memes {

  constructor() {
    this.$canvas = document.getElementById("imgCanvas");
    this.context = this.$canvas.getContext("2d");
    this.$imageInput = document.getElementById("image");
    this.$defaultImage = document.getElementById("defaultImage");
    this.image = this.$defaultImage;
    this.$topTextInput = document.getElementById("topText");
    this.$bottomTextInput = document.getElementById("bottomText");
    this.$addBtn = document.getElementById("downloadMeme");
    this.deviceWidth = window.innerWidth;

    this.createCanvas();
    this.createMeme();
    this.addEventListeners();
  }

  createCanvas() {
    this.$canvas.width = Math.min(640, this.deviceWidth - 30);
    this.$canvas.height = Math.min(480, this.deviceWidth);
  }

  createMeme() {
    this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.$canvas.width = this.image.width;
    this.$canvas.height = this.image.height;
    this.context.drawImage(this.image, 0, 0);
    const fontSize = ((this.$canvas.width + this.$canvas.height) / 2 * 4 / 100);
    this.context.font = `${fontSize}pt sans-serif`;
    this.context.textAlign = "center";
    this.context.textBaseline = "top";
    this.context.lineWidth = fontSize / 5;
    this.context.strokeStyle = "black";
    this.context.fillStyle = "white";

    const topText = this.$topTextInput.value.toUpperCase();
    const bottomText = this.$bottomTextInput.value.toUpperCase();
    this.context.strokeText(topText, this.$canvas.width / 2, this.$canvas.height * 5 / 100);
    this.context.fillText(topText, this.$canvas.width / 2, this.$canvas.height * 5 / 100);
    this.context.strokeText(bottomText, this.$canvas.width / 2, this.$canvas.height * 90 / 100);
    this.context.fillText(bottomText, this.$canvas.width / 2, this.$canvas.height * 90 / 100);

  }

  addEventListeners() {
    this.createMeme = this.createMeme.bind(this);
    let inputs = [this.$topTextInput, this.$bottomTextInput];
    inputs.forEach(element => element.addEventListener('keyup', this.createMeme));
    inputs.forEach(element => element.addEventListener('change', this.createMeme));
    this.downloadMeme = this.downloadMeme.bind(this);
    this.$addBtn.addEventListener("click", this.downloadMeme);
    this.loadImage = this.loadImage.bind(this);
    this.$imageInput.addEventListener("change", this.loadImage);
  }

  downloadMeme() {
    const imgSource = this.$canvas.toDataURL("image/png");
    this.$addBtn.setAttribute("href", imgSource);
  }

  loadImage() {
    if (this.$imageInput.files && this.$imageInput.files[0]) {
      let reader = new FileReader();
      reader.onload = () => {
        this.image = new Image();
        this.image.onload = () => { this.createMeme() };
        this.image.src = reader.result;
      }
      reader.readAsDataURL(this.$imageInput.files[0]);
    }
  }

}
let meme;
window.onload = () => { meme = new Memes(); }
