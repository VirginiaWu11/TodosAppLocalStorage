const ul = document.querySelector('ul');
const form = document.querySelector('form');
const input = document.querySelector('#task');
// const str = [];

const str = JSON.parse(localStorage.getItem('save')) || [];
if (str.length !== 0) {
	for (let i in str) {
		const li = document.createElement('li');
		const label = document.createElement('label');
		const checkbox = document.createElement('input');
		const del = document.createElement('button');
		ul.appendChild(li);
		checkbox.setAttribute('type', 'checkbox');
		checkbox.setAttribute('id', str[i].task);
		checkbox.checked = str[i].checked;
		li.appendChild(checkbox);
		label.setAttribute('for', str[i].task);
		label.innerText = str[i].task;
		li.className = str[i].class;
		li.appendChild(label);
		del.innerText = 'DELETE';
		li.appendChild(del);
	}
}

form.addEventListener('submit', function(e) {
	e.preventDefault();
	const li = document.createElement('li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');
	const del = document.createElement('button');
	// li.innerText = input.value;
	ul.appendChild(li);
	checkbox.setAttribute('type', 'checkbox');
	checkbox.setAttribute('id', input.value);
	li.appendChild(checkbox);
	label.setAttribute('for', input.value);
	label.innerText = input.value;
	li.appendChild(label);
	del.innerText = 'DELETE';
	li.appendChild(del);
	str.push({ task: checkbox.id, class: '', checked: checkbox.checked });
	console.log(str);
	localStorage.setItem('save', JSON.stringify(str));

	input.value = '';
});

ul.addEventListener('click', function(e) {
	console.log(e.target.tagName);
	if (e.target.tagName === 'INPUT') {
		e.target.parentElement.classList.toggle('strike');
		console.log(e.target.id, e.target.checked);
		changeCheckbox(e.target.id, e.target.checked);
	}
});

function changeCheckbox(task, ticked) {
	for (let i in str) {
		console.log(i);
		if (str[i].task === task) {
			str[i].checked = ticked;
			if (str[i].class === 'strike') {
				str[i].class = '';
			}
			else str[i].class = 'strike';
		}
	}
}

ul.addEventListener('click', function(e) {
	if (e.target.tagName === 'BUTTON') {
		e.target.parentElement.remove();
		for (let i in str) {
			console.log(e.target.previousElementSibling.innerText);
			if (str[i].task === e.target.previousElementSibling.innerText) {
				str.splice(i, 1);
			}
		}
	}
});
ul.addEventListener('click', function(e) {
	localStorage.setItem('save', JSON.stringify(str));
});

// let arr = [ { eat: 9 }, { garbage: 2 }, { hungry: 3 } ];

// for (let i in arr) {
// 	console.log(i);
// }
