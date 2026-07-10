// ===== CONFIG =====
const GEMINI_API_KEY = "AIzaSyAnjhXXjS2KVPfyV5VsW_tMeJdUOCKWD8I";

// ===== GPS =====
let userLat = null;
let userLng = null;

// ===== TIME =====
function getTimeInfo() {

  const now = new Date();

  const hour = now.getHours();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const weekday =
  now.toLocaleDateString(
    "vi-VN",
    { weekday: "long" }
  );

  const full =
  `${weekday}, ${day}/${month}/${year} - ${hour}h`;

  const timeDiv =
  document.getElementById("time");

  if (timeDiv) {
    timeDiv.innerText = full;
  }

  return {
    hour,
    full
  };

}

// ===== SHUFFLE =====
function shuffle(array) {

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    const j =
    Math.floor(
      Math.random() * (i + 1)
    );

    [array[i], array[j]] =
    [array[j], array[i]];

  }

}

// ===== START =====
function startApp() {

  navigator.geolocation.getCurrentPosition(

    pos => {

      userLat =
      pos.coords.latitude;

      userLng =
      pos.coords.longitude;

      if (
        typeof loadPlaces ===
        "function"
      ) {
        loadPlaces();
      }

    },

    () => {

      const status =
      document.getElementById(
        "status"
      );

      if (status) {

        status.innerHTML =
        "Không lấy được GPS ❌";

      }

    },

    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }

  );

}

// ===== AUTO START =====
window.addEventListener(
  "load",
  () => {

    startApp();

    const scanBtn =
    document.getElementById(
      "scanBtn"
    );

    if (scanBtn) {

      scanBtn.onclick = () => {

        const status =
        document.getElementById(
          "status"
        );

        const list =
        document.getElementById(
          "list"
        );

        if (status) {

          status.innerHTML =
          "Đang quét lại...";

        }

        if (list) {

          list.innerHTML = "";

        }

        if (
          userLat &&
          userLng &&
          typeof loadPlaces ===
          "function"
        ) {

          loadPlaces();

        }

      };

    }

  }
);