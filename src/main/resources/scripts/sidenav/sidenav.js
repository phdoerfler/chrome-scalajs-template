export { sidenav };

const ClassName = {
	DISPLAY_NONE: 'display-none-czd',
	SIDENAV_LEFT: 'sidenav-czd-left',
	SIDENAV_BACKDROP: 'sn-backdrop-czd'
}
const Potision = {
	TOP: 'top',
	BOTTOM: 'bottom',
	RIGHT: 'right',
	LEFT: 'left'
}
import { dragElement } from './draggable.js';
class sidenav {
	constructor(sidenav, backdrop, toogleButton, sidenavPos, draggable) {
		this.sidenav = sidenav;
		this.backdrop = backdrop;
		this.sidenav.classList.add(ClassName.DISPLAY_NONE);
		if (sidenavPos && sidenavPos.toLowerCase() === Potision.LEFT.toLowerCase())
			this.sidenav.classList.add(ClassName.SIDENAV_LEFT);
		if (draggable != undefined && draggable === true)
			dragElement(toogleButton, () => {
				this.open();
			});
		else
			toogleButton.addEventListener("click", () => {
				this.open();
			});
		backdrop.addEventListener("click", () => {
			this.close();
		});
	}

	open() {
		this.sidenav.classList.remove(ClassName.DISPLAY_NONE);
		this.backdrop.classList.add(ClassName.SIDENAV_BACKDROP);
	}

	close() {
		this.sidenav.classList.add(ClassName.DISPLAY_NONE);
		this.backdrop.classList.remove(ClassName.SIDENAV_BACKDROP);
	}

	toggle() {
		this.sidenav.classList.contains(ClassName.DISPLAY_NONE) ? this.open() : this.close();
	}

}