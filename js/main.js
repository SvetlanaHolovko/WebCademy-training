// Фильтр на мобильных устройствах
const sidebarToggle = document.querySelector(".menu-icon-wrapper");
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.querySelector(".nav__list-holder");

// Клик по кнопке для скрытия/показа фильтра и изменения иконки
sidebarToggle.onclick = function () {
  menuIcon.classList.toggle("menu-icon-active");
  sidebar.classList.toggle("nav__list-holder--visible");
};
