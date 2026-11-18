document.addEventListener('DOMContentLoaded', async () => {
    if (!document.referrer.includes(window.location.hostname)) {
        await Swal.fire({
            html: "به وبسایت رسمی محمد اخوان خوش آمدید",
            imageUrl: "../Icon/01.webp",
            imageWidth: 200,
            imageHeight: 80,
            confirmButtonText: "تایید"
        });
        await Swal.fire({
            title: "اطلاعیه حقوق نشر",
            html: "کلیه حقوق مادی و معنوی آثار منتشرشده در این وبسایت منحصراً متعلق به محمد اخوان است. هرگونه استفاده، کپی‌برداری، اقتباس یا بهره‌ برداری از تمام یا بخشی از این آثار، بدون کسب مجوز کتبی از صاحب اثر، ممنوع بوده و مطابق قوانین جاری مربوط به حقوق مؤلفان، مصنفان و هنرمندان، موجب مسئولیت قانونی و قابل پیگیری از طریق مراجع ذی‌صلاح خواهد بود.",
            icon: "info",
            confirmButtonText: "متوجه شدم"
        });
        await Swal.fire({
            html: "شهسوار اثر عاشقانه از محمد اخوان منتشر شد.",
            timer: 3000,
            showConfirmButton: false,
            timerProgressBar: true
        });
    }
    document.querySelector('body').classList.add('inner-animate');
    document.querySelector('.stamp-title__icon').classList.add('start-animate__mh__title');
});

document.addEventListener('contextmenu', event => {
    if (event.target.tagName === 'IMG') {
        event.preventDefault();
    }
});

const html = document.documentElement;
const themBtnContainer = document.querySelector('.them-btn__container');
const themBtn = document.querySelector('.them-btn');
const savedTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", savedTheme);
if (savedTheme === 'light') {
    themBtn.classList.add('enable-them__animation');
    themBtnContainer.classList.add('them-btn-light__container')
}
else {
    themBtn.classList.add('enable-them__animation2');
}
function changeThem() {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme == "light") {
        themBtn.classList.remove('enable-them__animation2');
        themBtn.classList.add('enable-them__animation');
        themBtnContainer.classList.add('them-btn-light__container');
    }
    else {
        themBtn.classList.remove('enable-them__animation');
        themBtn.classList.add('enable-them__animation2');
        themBtnContainer.classList.remove('them-btn-light__container');
    }
}

const headerNav = document.querySelector('.header-navbar');
const moveOut = document.querySelector('.moving-header__out');
function movingHeader() {
    headerNav.style.right = 0;
    moveOut.style.display = 'none';
}

function movingHeader2() {
    headerNav.style.right = '-30%';
    moveOut.style.display = 'flex';
}

window.addEventListener('resize', () => {
    if (window.innerWidth <= 992) {
        moveOut.style.display = 'flex';
    }
    else {
        moveOut.style.display = 'none';
    }
});

const musicContainer = document.querySelector('.musics-container');
async function changePage1() {
    try {
        const response1 = await fetch('Ajax/MusicCard1.html', { method: "GET" });
        musicContainer.innerHTML = await response1.text();
    }
    catch (error) {
        console.log(error, "خطا در دریافت اطلاعات");
    }
}
async function changePage2() {
    try {
        const response2 = await fetch('Ajax/MusicCard2.html', { method: "GET" });
        musicContainer.innerHTML = await response2.text();
    }
    catch (error) {
        console.log(error, "خطا در دریافت اطلاعات");
    }
}
async function changePage3() {
    try {
        const response3 = await fetch('Ajax/MusicCard3.html', { method: "GET" });
        musicContainer.innerHTML = await response3.text();
    }
    catch (error) {
        console.log(error, "خطا در دریافت اطلاعات");
    }
}

const changePageBtn = document.querySelectorAll('.pages');
for (let i = 0; i < changePageBtn.length; i++) {
    changePageBtn[i].addEventListener('click', pageChanged);
}
function pageChanged(e) {
    document.querySelectorAll('.pages').forEach(page => {
        page.classList.remove('pages-btn__active');
    });
    e.currentTarget.classList.add('pages-btn__active');
}

const contactWidget = document.getElementById("contactWidget");
let widgetShown = false;
window.addEventListener("scroll", function () {
    if (
        window.scrollY > 10 && !widgetShown) {
        contactWidget.classList.add("show");
        widgetShown = true;
    }
},
    { passive: true }
);
const contactToggle = document.getElementById("contactToggle");
contactToggle.addEventListener("click", () => {
    contactWidget.classList.toggle("collapsed");
});