// Получаем объекты на странице
const object = document.querySelector(".object");
const wrapper = document.querySelector(".move__wrapper");
const move = document.querySelector(".move");

// Объявление глобальных переменных
let moveObjectX, moveObjectY, object_x, object_y;

// Если клавиша отжата от ОБЪЕКТА, то запрещаем двигаться
move.addEventListener("mouseup", function () {
	moveObjectX = false;
	moveObjectY = false;

	//Убираем стили
	object.classList.remove("moveed");
	move.removeEventListener("mousemove", noOut);
});

// Если мышь не отжата от объекта, то разрешаем двигаться
object.addEventListener("mousedown", onClickObject);

function onClickObject(event) {
	moveObjectX = true;
	moveObjectY = true;

	// Получаем координаты курсора относительно объекта
	object_x = event.clientX - object.getBoundingClientRect().left;
	object_y = event.clientY - object.getBoundingClientRect().top;

	// Добавляем стили
	object.classList.add("moveed");
	// навешиваем событие на игровое поле для движения объекта
	move.addEventListener("mousemove", objectMove);
	move.addEventListener("mousemove", noOut);
}

// Движение объекта
function objectMove() {
	if (moveObjectX) {
		moveX();
	}
	if (moveObjectY) {
		moveY();
	}
}

// Движение по оси X
function moveX() {
	object.style.left = event.clientX - object_x + "px";
}

// Движение по оси Y
function moveY() {
	object.style.top = event.clientY - object_y + "px";
}

// Запрещаем объекту переходить за границу
function noOut(event) {
	// Получаем координаты левой границы
	let borderXStart = parseInt(wrapper.getBoundingClientRect().left);
	// Получаем координаты правой границы
	let borderXEnd = parseInt(wrapper.getBoundingClientRect().right);
	// Получаем координаты верхней границы
	let borderYStart = parseInt(wrapper.getBoundingClientRect().top);
	// Получаем координаты нижней границы
	let borderYEnd = parseInt(wrapper.getBoundingClientRect().bottom);

	/* Если координаты объекта равняються координатам границ, 
    то запрещаем движение по определенной оси и указываем определенные координаты*/
	if (object.getBoundingClientRect().left <= borderXStart) {
		moveObjectX = false;
		object.style.left = borderXStart + "px";
	}
	if (object.getBoundingClientRect().right >= borderXEnd) {
		moveObjectX = false;
		object.style.left = borderXEnd - object.clientWidth + "px";
	}
	if (object.getBoundingClientRect().top <= borderYStart) {
		moveObjectY = false;
		object.style.top = borderYStart + "px";
	}
	if (object.getBoundingClientRect().bottom >= borderYEnd) {
		moveObjectY = false;
		object.style.top = borderYEnd - object.clientHeight + "px";
	}

	// Если координаты курсора превысили свое изначальное положение относительно объекта, то разрешаем двигаться
	if (event.clientX > object.getBoundingClientRect().left + object_x || event.clientX < object.getBoundingClientRect().right + object_x || event.clientY > object.getBoundingClientRect().top + object_y || event.clientY < object.getBoundingClientRect().bottom + object_y) {
		moveObjectX = true;
		moveObjectY = true;
	}
}
