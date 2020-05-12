'use strict';
import '@babel/polyfill';
import 'nodelist-foreach-polyfill';
import 'dom-node-polyfills';
import elementClosest from 'element-closest';
elementClosest(window);
var Promise = require('es6-promise').Promise;

// Проверка на число
const isNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && n !== 0;
// Проверка на пустоту
const isEmpty = s => s === null || !s || s.trim() === '';

import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import smoothScroll from './modules/smoothScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
import formListener from './modules/formListener';
import maskPhone from './modules/maskPhone';

//countTimer('22 april 2020');
countTimer();

// Menu
toggleMenu();

// Popup
togglePopup();

// Smooth scroll
const linkAnchors = document.querySelectorAll('a[href^="#"]');
linkAnchors.forEach(item => item.addEventListener('click', smoothScroll));

// Tabs
tabs();

// Slider
slider();

// Our Team
changePhoto();

// Calculator
calc();

// Send Form
sendForm();

// Validation
formListener('input[type="number"]', 'input', /[^\d]/g);
formListener('input[type="text"]', 'input', /[^а-яё\s]+/gi);
formListener('#form2-message', 'input', /[^а-яё\s]+/gi);
maskPhone();