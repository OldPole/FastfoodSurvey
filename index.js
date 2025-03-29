const data = [
    {
        question: 'Оцените общий уровень удовлетворенности визитом в целом:',
        answers: [
            {
                value: 'Отлично',
            },
            {
                value: 'Норм',
            },
            {
                value: 'Плохо',
            },
        ]
    },
    {
        question: 'Оцените дружелюбие наших сотрудников',
        answers: [
            {
                value: 'Отлично',
            },
            {
                value: 'Норм',
            },
            {
                value: 'Плохо',
            },
        ]
    },
    {
        question: 'Оцените скорость обслуживания:',
        answers: [
            {
                value: 'Отлично',
            },
            {
                value: 'Норм',
            },
            {
                value: 'Плохо',
            },
        ]
    },
    {
        question: 'Как часто Вы бываете в наших ресторанах?',
        answers: [
            {
                value: 'Впервые',
            },
            {
                value: '1 раз в неделю или чаще',
            },
            {
                value: '1-2 раза в месяц',
            },
            {
                value: '3-4 раза в год',
            },
            {
                value: '1 в год',
            }
        ]
    },
    {
        question: 'Что бы вы хотели добавить в меню',
        answers: [
            {   
                img: '/images/burger1.jpg',
                alt: 'burger1',
                value: 'Новый бургер с говядиной',
            },
            {   
                img: '/images/burger2.jpeg',
                alt: 'burger2',
                value: 'Новый бургер с курицей',
            },
            {
                img: '/images/drink.jpg',
                alt: 'drink',
                value: 'Новый фирменный напиток',
            },
        ]
    },
]

let localResults = {};
let currentProgress = 20;

const survey = document.getElementById('survey');
const questions = document.getElementById('questions');
const contacts = document.getElementById('contacts');
const btnNext = document.getElementById('btn-next');
const btnSend = document.getElementById('btn-send');
const progressBar = document.getElementById('progress-bar');

const renderQuestions = (index) => {
    questions.dataset.currentstep = index;

    const renderAnswers = () => data[index].answers
    .map((answer) => `
        <li>
            <label>
                <input class="answer-input" type="radio" name="question${index}" value=${answer.value}>
                ${answer.value}
            </label>
        </li>
    `)
    .join('');

    questions.innerHTML = `
    <div class="survey-questions-item">
        <div class="survey-questions-item__question">${data[index].question}</div>
        <ul class="survey-questions-item__answers">${renderAnswers()}</ul>
    </div>
    `;
}

const renderUniqueQuestion = (index) => {
    questions.dataset.currentstep = index;

    const renderAnswers = () => data[index].answers
    .map((answer) => `
        <li>
            <label class="custom-checkbox-answer">
                <input class="answer-input" type="checkbox" name="question${index}" value=${answer.value}>
                <img src=${answer.img} alt=${answer.alt}>
                ${answer.value}
            </label>
        </li>
    `)
    .join('');

    questions.innerHTML = `
    <div class="survey-questions-item">
        <div class="survey-questions-item__question">${data[index].question}</div>
        <ul class="survey-questions-item__unique-answers">${renderAnswers()}</ul>
    </div>
    `;
}

const renderContacts = () => {

}

const renderIndicator = () => {

}

survey.addEventListener('change', (event) => {
    if(event.target.classList.contains('answer-input')) {
        localResults[event.target.name] = event.target.value;
        console.log(localResults);
        btnNext.disabled = false;
    }
});

survey.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn-next')){
        const nextQuestionIndex = Number(questions.dataset.currentstep) + 1;

        if(nextQuestionIndex === data.length) {
            renderContacts();
        } else if (nextQuestionIndex === 4) {
            renderUniqueQuestion(nextQuestionIndex);
        } else {
            renderQuestions(nextQuestionIndex);
        }

        currentProgress += 16;
        progressBar.style.width = currentProgress + '%';

        btnNext.disabled = true;
    }
});

renderQuestions(0);