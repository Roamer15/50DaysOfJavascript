const loadText = document.querySelector(".loading-text");
const blurImage = document.querySelector(".bg");

let load = 0;

let int = setInterval(blurring, 30);

function blurring() {
  load++;
  //   console.log(load);

  if (load > 99) {
    clearInterval(int);
  }

  loadText.innerText = `${load}%`;
  loadText.style.opacity = scale(load, 0, 100, 1, 0);
  blurImage.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}

// stackOverflow  source
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
