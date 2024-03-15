import React from "react";

// Pulse effect on touch/click
export const pulseBtnFunc = (e: React.MouseEvent<Element, MouseEvent>): void => {

	function addElement(btn: Element) {

		// Create new animation div
		const addDiv = document.createElement('div')
		const mValue = Math.max(btn.clientWidth, btn.clientHeight)
		const rect = btn.getBoundingClientRect()
		const sDiv = addDiv.style
		const px = 'px';

		sDiv.width = sDiv.height = mValue + px
		sDiv.left = e.clientX - rect.left - (mValue / 2) + px
		sDiv.top = e.clientY - rect.top - (mValue / 2) + px

		// Add div to cliced element
		addDiv.classList.add('pulse')
		btn.appendChild(addDiv)

		// Remove div on clicked element
		setTimeout(() => {
			btn.removeChild(addDiv)
		}, 1000)
	}

	addElement(e.currentTarget)
}