let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let logoutBtn = document.querySelector('#logout-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');

function signup(){
  
}

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    searchBtn.classList.remove('fa-times');
    searchBar.classList.remove('active');
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active');
}

menu.addEventListener('click', () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

searchBtn.addEventListener('click', () =>{
    searchBtn.classList.toggle('fa-times');
    searchBar.classList.toggle('active');
});

formBtn.addEventListener('click', () =>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', () =>{
    loginForm.classList.remove('active');  
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
});

var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop:true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        450: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      },
});

function User(username, pass) {
  this.username = username;
  this.pass = pass;
}

function activeformLogin() {
  loginForm.classList.add('active');
}

function setCurrentUser(u) {
  window.localStorage.setItem('CurrentUser', JSON.stringify(u));
}

function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}

function getListUser() {
  var data = JSON.parse(window.localStorage.getItem('ListUser')) || []
  var l = [];
  for (var d of data) {
      l.push(d);
  }
  return l;
}

function logIn(form) {
  // L???y d??? li???u t??? form
  var name = form.username.value;
  var pass = form.password.value;
  var newUser = new User(name, pass);

  // L???y d??? li???u t??? danh s??ch ng?????i d??ng localstorage
  var listUser = getListUser();

  // Ki???m tra xem d??? li???u form c?? kh???p v???i ng?????i d??ng n??o trong danh s??ch ko
  for (var u of listUser) {
    if (equalUser(newUser, u)) {
        if(u.off) {
            alert('T??i kho???n n??y ??ang b??? kho??. Kh??ng th??? ????ng nh???p.');
            return false;
        }

        setCurrentUser(u);

        // Reload l???i trang -> sau khi reload s??? c???p nh???t lu??n gi??? h??ng khi h??m setupEventTaiKhoan ch???y
        location.reload();
        return false;
    }
  }

  alert('Nh???p sai t??n ho???c m???t kh???u !!!');
  form.username.focus();
  return false;
}

function logOut() {
  window.localStorage.removeItem('CurrentUser');
  location.reload();
}

function getCurrentUser() {
  return JSON.parse(window.localStorage.getItem('CurrentUser')); // L???y d??? li???u t??? localstorage
}

let checkUser = document.querySelector('#check-user-login');

if(!getCurrentUser()) {
  checkUser.innerHTML = '<i class="fas fa-search" id="search-btn"></i><i class="fas fa-user" onclick="activeformLogin()"></i>';
}
else {
  checkUser.innerHTML = '<i class="fas fa-search" id="search-btn"></i><i class="fas fa-power-off" onclick="logOut()"></i>';
}