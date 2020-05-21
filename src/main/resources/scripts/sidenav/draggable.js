
const dragElement = (elmnt, eventOnclick) => {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	var intention;
	var detectIntention;
	const MAX_TIME_CLICK = 200;

	const dragMouseDown = (e) => {
		intention = "click";
		e = e || window.event;
		if (e.type === "touchstart") {
			pos3 = e.touches[0].clientX;
			pos4 = e.touches[0].clientY;
			elmnt.addEventListener("touchmove", elementDrag, false)
			elmnt.addEventListener("touchend", closeDragElement, false)
		} else if (e.type === "mousedown") {
			e.preventDefault();
			setIntention("mouseup", MAX_TIME_CLICK);
			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}
	}

	const elementDrag = (e) => {
		e = e || window.event;
		e.preventDefault();
		if (e.type === "touchmove") {
			intention = "touchend";
			pos1 = pos3 - e.touches[0].clientX;
			pos2 = pos4 - e.touches[0].clientY;
			pos3 = e.touches[0].clientX;
			pos4 = e.touches[0].clientY;
		} else {
			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;
		}
		// set the element's new position:
		elmnt.style.position = 'fixed';
		var newTopPos = elmnt.offsetTop - pos2;
		var newLeftPos = elmnt.offsetLeft - pos1;
		unsetPosition(elmnt);
		elmnt.style.top = (newTopPos) + "px";
		elmnt.style.left = (newLeftPos) + "px";
	}


	const closeDragElement = (e) => {
		clearTimeout(detectIntention);
		if (intention === "click") {
			eventOnclick();
			e.preventDefault();
		}
		document.onmouseup = null;
		document.onmousemove = null;

		document.ontouchmove = null;
		document.ontouchend = null;
	}

	const setIntention = (intentionStr, maxTime) => {
		detectIntention = setTimeout(function () {
			intention = intentionStr;
		}, maxTime)
	}

	const unsetPosition = (elem) => {
		elem.style.top = "unset";
		elem.style.bottom = "unset";
		elem.style.right = "unset";
		elem.style.left = "unset";
	}

	elmnt.onmousedown = dragMouseDown;
	elmnt.addEventListener("touchstart", dragMouseDown, false);
}

export { dragElement }