import FetchWrapper from "./fetch-wrapper.js";
const generateSpaceBtn = document.querySelector(".generate-space-btn");
const spaceContainer = document.querySelector(".space-photo-container");
const asteroidContainer = document.querySelector(
  ".hazardous-asteroids-container"
);
const APIphoto = new FetchWrapper(
  "https://api.nasa.gov/planetary/apod?api_key=DncjnsKexmfpaU9XgG7sv1adcfnDuuIIaNAmRF08"
);
const APIasteroids = new FetchWrapper(
  "https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DncjnsKexmfpaU9XgG7sv1adcfnDuuIIaNAmRF08"
);

const getSpace = async function () {
  spaceContainer.innerHTML = "";
  try {
    const photoData = await APIphoto.get("");
    spaceContainer.insertAdjacentHTML(
      "beforeend",
      `<h3>Space Picture of the Day</h3><img src="${photoData.url}"/><p class="photo-description">"${photoData.explanation}" - ${photoData.date} - Credit: ${photoData.copyright}</>`
    );
  } catch (error) {
    console.error(error);
  }
  try {
    const asteroidData = await APIasteroids.get("");
    const hazardous = asteroidData.map((asteroid) => {
      asteroid.is_potentially_hazardous_asteroid === true;
    });
    console.log(hazardous);
  } catch (error) {
    console.error(error);
  }
};

generateSpaceBtn.addEventListener("click", getSpace);
