const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные игры
let score = 0; // к-во правильных ответов
let questionIndex = 0; // текущий вопрос

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	// Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	let answerNumber = 1;
	// Варианты ответов
	for (answerText of questions[questionIndex]['answers']) {
		const questionTemplate =
			`<li>
				<label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {
	console.log('checkAnswer started!');
	// Находим выбранную радио-кнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	// Если ответ не выбран - ничего не делаем, выходим из ф-ции
	if (!checkedRadio) {
		submitBtn.blur();
		return
	}
	// Узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);
	// Если ответил верно - увеличиваем счет
	console.log(userAnswer, questions[questionIndex]['correct']);
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		console.log('Это НЕ последний вопрос');
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		console.log('Это последний вопрос');
		clearPage();
		showResults();
	}
}

function showResults() {
	console.log('showResults started!');
	console.log(score);

	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
		`;

	let title, message;
	// Варианты заголовков и текста
	if (score === questions.length) {
		title = 'Поздравляем! 🔥';
		message = 'Вы ответили верно на все вопросы! 👌';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат! 😊';
		message = 'Вы дали более половины правильных ответов. 💪';
	} else {
		title = 'Стоит постараться. 🤥';
		message = 'Пока у вас меньше половины правильных ответов.';
	}

	// Результат
	let result = `${score} из ${questions.length}`;

	// Финальный ответб подставляем данные в шаблон
	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result)

	headerContainer.innerHTML = finalMessage;

	// Меняем кнопку на "Играть снова"
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => { history.go() };
}