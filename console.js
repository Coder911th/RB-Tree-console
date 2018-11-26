let c = document.getElementById('console'),
    ai = document.getElementById('add-inp'),
    ri = document.getElementById('remove-inp'),
    drag = false,
    offsetX, offsetY;

c.onmousedown = e => {
    drag = true;
    offsetX = e.pageX - c.getBoundingClientRect().left;
    offsetY = e.pageY - c.getBoundingClientRect().top;
    if (!(e.target instanceof HTMLInputElement))
        event.preventDefault();
};

c.onmousemove = e => {
    if (drag) {
        c.style.left = e.pageX - offsetX;
        c.style.top = e.pageY - offsetY;
    }
};

document.onmouseup = () => {
    drag = false;
};

document.getElementById('add-elem').onclick = () => {
	if (/^\d+$/.test(ai.value.trim())) {
		tree.add(new Item(+ai.value.trim()));
	}
	ai.value = '';
};

document.getElementById('remove-elem').onclick = () => {
	if (/^\d+$/.test(ri.value.trim())) {
		tree.remove(new Item(+ri.value.trim()));
	}
	ri.value = '';
}
