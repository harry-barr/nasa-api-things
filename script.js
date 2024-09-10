import FetchWrapper from "./fetch-wrapper.js";
const generateSpaceBtn = document.querySelector(".generate-space-btn");
const spaceContainer = document.querySelector(".space-photo-container");

const APIphoto = new FetchWrapper(
  `https://api.nasa.gov/planetary/apod?api_key=DncjnsKexmfpaU9XgG7sv1adcfnDuuIIaNAmRF08`
);

const getSpace = async function () {
  spaceContainer.innerHTML = "";
  try {
    const date = document.querySelector(".date").value;
    if (!date) {
      return alert("Please enter a date");
    }
    const photoData = await APIphoto.get(`&date=${date}`);
    spaceContainer.insertAdjacentHTML(
      "beforeend",
      `<h3>Space Picture of the Day</h3><img src="${
        photoData.url
      }"/><p class="photo-description">"${photoData.explanation}" - ${
        photoData.date
      } - Credit: ${photoData?.copyright ?? "Not found"}</>`
    );
  } catch (error) {
    console.error(error);
  }
};

generateSpaceBtn.addEventListener("click", getSpace);
