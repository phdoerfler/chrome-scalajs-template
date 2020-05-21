const className = {
	SIDENAV: 'sidenav-czd',
	BACKDROP: 'backdrop-czd',
	MENU_TOGGLE: 'menu-toggle-czd',
	BTN_ACCEPT: 'btn-Accept-czd',
	BTN_CANCEL: 'btn-Cancel-czd',
	MENU_TOGGLE_TOP_RIGHT: 'menu-toggle-czd-top-right',
	MENU_TOGGLE_TOP_LEFT: 'menu-toggle-czd-top-left',
	MENU_TOGGLE_BOTTOM_RIGHT: 'menu-toggle-czd-bottom-right',
	MENU_TOGGLE_BOTTOM_LEFT: 'menu-toggle-czd-bottom-left'
}

const pulseButtonPosition = {
	TOP_RIGHT: 'top-right',
	TOP_LEFT: 'top-left',
	BOTTOM_RIGHT: 'bottom-right',
	BOTTOM_LEFT: 'bottom-left',
}


const SIDENAV_OPTIONS_PROPERTIES_NAME = {
	TITLE: 'title',
	IMG_LOGO: 'imgLogo',
	TEXT: 'text'
}

const MSG_LOG = {
	ADDING_SIDENAV: "Adding sidenav",
	ERROR_READING_DATA: "Error: Reading the data of sidenav"
}

const SIDENAV_TITLE = "cazadescuentos";

const addSidenavToHtml = (optionsSidenav, sidenavId) => {
	let sidenavHtmlTemplate = `
		<div  class="backdrop-czd"></div>
		<div  class="sidenav-czd sn-sidenav-czd italic-czd boder-box-czd">
			<div class="card-czd">
				<div class="italic-czd card-title-czd">
					<h1>${ optionsSidenav.title}</h1>
				</div>
				<div class="content-card-czd">
					<div class="container-img-czd bg-red-czd img-rounded-czd center-czd">
						<div class="container-img-background-czd img-rounded-czd center-czd">
							<img id="img-logo-czd" src="${ optionsSidenav.imgLogo}" class="center-czd">
						</div>
					</div>
				</div>
				<div class="text-center-czd card-content-text-czd">
					<P class="italic-czd">${ optionsSidenav.text}</P>
				</div>
			</div>
			<br>
			<a href="javascript:void(0)" class="btn-Cancel-czd myButton-czd italic-czd" style="">${ optionsSidenav.btnCancelTxt}</a>
			<a href="javascript:void(0)" class=" btn-Accept-czd myButton-czd italic-czd"  style="">${ optionsSidenav.btnAcceptTxt}</a>
		</div>
				<span  class="${ getClassPulseButton(optionsSidenav.btnTogglePos)} menu-toggle-czd pulse-button-czd ">
					<img id="" src="${ optionsSidenav.imgLogo}" class="center-czd img-pulse-button-czd">
				</span>`;

	let myDiv = document.createElement("div");
	myDiv.setAttribute("id", sidenavId);
	let myBody = document.getElementsByTagName("BODY")[0];
	console.log(MSG_LOG.ADDING_SIDENAV);
	myDiv.innerHTML += sidenavHtmlTemplate;
	myBody.appendChild(myDiv);
}


const getClassPulseButton = (position) => {
	if (position.toLocaleLowerCase() === pulseButtonPosition.TOP_RIGHT.toLocaleLowerCase())
		return className.MENU_TOGGLE_TOP_RIGHT
	else if (position.toLocaleLowerCase() === pulseButtonPosition.BOTTOM_LEFT.toLocaleLowerCase())
		return className.MENU_TOGGLE_BOTTOM_LEFT
	else if (position.toLocaleLowerCase() === pulseButtonPosition.BOTTOM_RIGHT.toLocaleLowerCase())
		return className.MENU_TOGGLE_BOTTOM_RIGHT
	else
		return className.MENU_TOGGLE_TOP_LEFT
}

var countCazadescuentos = 0;


const defaultOptions = {
	btnCancelTxt: 'No',
	btnAcceptTxt: 'Yes',
	btnTogglePos: 'top-right',
	sidenavPos: 'right',
	draggable: false
}

import { sidenav as sidenavCzd } from './sidenav.js';

import './sidenav.css' ;

import './pulsebutton.css' ;

import './customSidenav.css' ;

class customSidenav {
	constructor() {
		countCazadescuentos++;
		this.sidenavId = SIDENAV_TITLE + countCazadescuentos;
	}

	fire(optionsSidenav) {
		if (!optionsSidenav ||
			!optionsSidenav.hasOwnProperty(SIDENAV_OPTIONS_PROPERTIES_NAME.TITLE) || !optionsSidenav.title ||
			!optionsSidenav.hasOwnProperty(SIDENAV_OPTIONS_PROPERTIES_NAME.TEXT) || !optionsSidenav.text ||
			!optionsSidenav.hasOwnProperty(SIDENAV_OPTIONS_PROPERTIES_NAME.IMG_LOGO) || !optionsSidenav.imgLogo
		) {
			console.log(MSG_LOG.ERROR_READING_DATA);
			return false;
		}
		let sidenavCustomOptions = Object.assign(defaultOptions, optionsSidenav);
		addSidenavToHtml(sidenavCustomOptions, this.sidenavId);
		let sidenavObject = {
			sidenav: document.querySelector("#" + this.sidenavId + " ." + className.SIDENAV),
			backdrop: document.querySelector("#" + this.sidenavId + " ." + className.BACKDROP),
			toggleButton: document.querySelector("#" + this.sidenavId + " ." + className.MENU_TOGGLE)
		};
		new sidenavCzd(sidenavObject.sidenav, sidenavObject.backdrop, sidenavObject.toggleButton, optionsSidenav.sidenavPo, optionsSidenav.draggable);
		return new Promise((resolve, rejected) => {
			return resolve(this.clickPromise());
		});
	}

	clickPromise() {
		return new Promise((resolve, reject) => {
			document.querySelector("#" + this.sidenavId + " ." + className.BTN_ACCEPT).addEventListener('click', (e) => {
				this.destroy();
				return resolve(true);
			}, { once: true });
			document.querySelector("#" + this.sidenavId + " ." + className.BTN_CANCEL).addEventListener('click', (e) => {
				this.destroy();
				return resolve(false);
			}, { once: true });
		});
	}

	destroy() {
		let sidenavContainer = document.getElementById(this.sidenavId);
		if (sidenavContainer)
			sidenavContainer.remove();
	}
}

export { customSidenav }