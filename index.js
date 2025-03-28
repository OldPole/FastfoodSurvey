const data = [
    {
        question: 'Оцените общий уровень удовлетворенности визитом в целом:',
        type: 'radio',
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
        type: 'radio',
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
        type: 'radio',
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
        type: 'radio',
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
        type: 'checkbox',
        answers: [
            {
                value: 'Новый бургер с говядиной',
            },
            {
                value: 'Новый бургер с курицей',
            },
            {
                value: 'Новый фирменный напиток',
            },
        ]
    },
]

let localResults = {};

const survey = document.getElementById('survey');
const questions = document.getElementById('questions');
const contacts = document.getElementById('contacts');
const btnNext = document.getElementById('btn-next');
const btnSend = document.getElementById('btn-send');
const indicator = document.getElementById('indicator');

const renderQuestions = (index) => {
    questions.dataset.currentstep = index;

    const renderAnswers = () => data[index].answers
    .map((answer) => `
        <li>
            <label>
                <input class="answer-input" type=${data[index].type} name="question${index}" value=${answer.value}>
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

const renderUniqueQuestion = () => {
    
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

        if(nextQuestionIndex === 4){
            renderUniqueQuestion();
        } else if (nextQuestionIndex === data.length) {
            renderContacts();
        } else {
            renderQuestions(nextQuestionIndex);
        }

        btnNext.disabled = true;
    }
});

renderQuestions(0);