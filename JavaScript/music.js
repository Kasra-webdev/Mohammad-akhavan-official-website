const audio = document.getElementById("audio"),
    playBtn = document.getElementById("playBtn");
const progressBar = document.querySelector(".progress"),
    progressFill = document.querySelector(".progress-fill");

const currentTimeEl = document.getElementById("currentTime"),
    durationEl = document.getElementById("duration");

const backBtn = document.getElementById("backBtn"),
    forwardBtn = document.getElementById("forwardBtn");

let isDragging = false;

function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return (
        String(mins).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0")
    );
}

playBtn.addEventListener("click", () => {

    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
    }
    else {
        audio.pause();
        playBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play-icon lucide-play"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`;
    }
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent =
        formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {

    if (!isDragging) {
        const progress =
            (audio.currentTime / audio.duration) * 100;
        progressFill.style.width =
            progress + "%";
    }
    currentTimeEl.textContent =
        formatTime(audio.currentTime);
});

function seek(clientX) {
    const rect =
        progressBar.getBoundingClientRect();
    let x =
        clientX - rect.left;
    x = Math.max(
        0,
        Math.min(x, rect.width)
    );
    const percent =
        1 - (x / rect.width);
    progressFill.style.width =
        percent * 100 + "%";
    audio.currentTime =
        percent * audio.duration;
}

progressBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    seek(e.clientX);
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    seek(e.clientX);
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

progressBar.addEventListener("touchstart", (e) => {
    isDragging = true;
    seek(
        e.touches[0].clientX
    );
});

document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    seek(
        e.touches[0].clientX
    );
});

document.addEventListener("touchend", () => {
    isDragging = false;
});

backBtn.addEventListener("click", () => {
    audio.currentTime =
        Math.max(
            0,
            audio.currentTime - 5
        );
});

forwardBtn.addEventListener("click", () => {
    audio.currentTime =
        Math.min(
            audio.duration,
            audio.currentTime + 5
        );
});

audio.addEventListener("ended", () => {
    playBtn.innerHTML = "▶";
    progressFill.style.width = "0%";
    currentTimeEl.textContent = "00:00";
});

audio.addEventListener("canplay", () => {
    durationEl.textContent =
        formatTime(audio.duration);
});

// Loader

(() => {
    const loader = document.getElementById("ma-page-loader");

    if (!loader) return;

    const hideLoader = () => {
        loader.classList.add("ma-loader-hidden");

        window.setTimeout(() => {
            loader.remove();
        }, 700);
    };

    if (document.readyState === "complete") {
        hideLoader();
    } else {
        window.addEventListener("load", hideLoader, {
            once: true
        });
    }
})();