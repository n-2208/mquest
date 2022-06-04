const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 3),
	new Result("Ваш уровень выше среднего", 6),
	new Result("Вы в совершенстве знаете тему", 10)
];

//Массив с вопросами
const questions = 
[
	new Question("В каком формате нельзя показывать проект клиенту? ", 
	[
		new Answer(".jpg ", 0),
		new Answer(".png ", 0),
		new Answer(".psd ", 1),
		new Answer(".gif ", 0)
	]),

	new Question("RGB это ppi а у CMYK это...", 
	[
		new Answer("Pixel per inch ", 0),
		new Answer("Screen Resolution ", 0),
		new Answer("Dots per inch ", 1),
		new Answer("IPS", 0)
	]),

	new Question("Комплиментарный цвет синего — это…", 
	[
		new Answer("Красный", 0),
		new Answer("Зеленый", 0),
		new Answer("Желтый", 0),
		new Answer("Оранжевый", 1)
	]),

	new Question("Графическое изображение с фигурой по центру относится к типу композиции:", 
	[
		new Answer("Уравновешенный", 0),
		new Answer("Асимметричный", 0),
		new Answer("Упрощенный", 1),
		new Answer("Расширенный", 0)
	]),

	new Question("Расположение графических и текстовых объектов — это...", 
	[
		new Answer("Организация", 0),
		new Answer("Воркфлоу", 0),
		new Answer("Композиция", 1),
		new Answer("Кернинг", 0)
	]),

	new Question("В Баухауз считают, что святая троица цветов для графического дизайна это:", 
	[
		new Answer("Красный, зеленный, синий", 0),
		new Answer("Красный, черный, белый", 1),
		new Answer("Красный, синий, желтый", 0),
		new Answer("Красный, серый, белый", 0)
	]),

	new Question("Изображение сделано в векторе...", 
	[
		new Answer("Ограниченно большим размером", 0),
		new Answer("Масштабируется", 1),
		new Answer("Популярно среди Фотографов", 0),
		new Answer("Открывается в фотошопе", 0)
	]),

	new Question("Что из этого не является элементом дизайна?", 
	[
		new Answer("Линия", 0),
		new Answer("Фигура", 0),
		new Answer("Единство", 1),
		new Answer("Текстура", 0)
	]),

	new Question("Это первый цвет, на который реагирует человеческий глаз, когда он попадает в поле зрения", 
	[
		new Answer("Красный", 1),
		new Answer("Синий", 0),
		new Answer("Зеленый", 0),
		new Answer("Белый", 0)
	]),

	new Question("CMYK используется для…", 
	[
		new Answer("Веба", 0),
		new Answer("Графики", 0),
		new Answer("Печати", 1),
		new Answer("Мобильных приложений", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}