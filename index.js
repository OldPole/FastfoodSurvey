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
                img: '/images/questionImages/burger1.jpg',
                alt: 'burger1',
                value: 'Новый бургер с говядиной',
            },
            {   
                img: '/images/questionImages/burger2.jpeg',
                alt: 'burger2',
                value: 'Новый бургер с курицей',
            },
            {
                img: '/images/questionImages/drink.jpg',
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
    contacts.innerHTML = `
    <div class="survey-contacts-title">
        <img src="/images/icons/checkmark.png" alt="checkmark">
        <h3>Отлично! Последний шаг!</h3>
    </div>

    <div class="survey-contacts-info">
        <div class="survey-contacts-info-inputs">
            <p>Укажите контакты</p>
            <form>
                <div>
                    <label for="name"></label>
                    <input type="text" class="custom-input-name" placeholder="Ваше имя">
                </div>

                <div>
                    <label for="phone"></label>
                    <input type="tel" class="custom-input-tel" placeholder="Ваш телефон">
                </div>
            </form>
        </div>

        <div class="survey-contacts-info-gifts">
            <div class="survey-contacts-info-gifts__gift">
                <img src="/images/icons/gift.png" alt="gift">
                <p>Зарегестрируйтесь в нашем приложении и ежедневно получайте выгодные купоны</p>
            </div>

            <div class="survey-contacts-info-gifts__gift">
                <img src="/images/icons/gift.png" alt="gift">
                <p>Получите в подарок скидку в 50% на пирожок</p>
            </div>
        </div>
    </div>
    `
    const inputName = document.querySelector('.custom-input-name');
    const inputTel = document.querySelector('.custom-input-tel');

    inputName.addEventListener('input', (event) => {
        localResults[event.target.name] = event.target.value;
        console.log(localResults);
        btnSend.disabled = !(inputName.value.trim() && inputTel.value.trim());
    });

    inputTel.addEventListener('input', (event) => {
        localResults[event.target.name] = event.target.value;
        console.log(localResults);
        btnSend.disabled = !(inputName.value.trim() && inputTel.value.trim());
    });
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
            questions.classList.add('questions--hidden');
            contacts.classList.add('contacts--visible');
            btnNext.classList.add('btn-next--hidden');
            btnSend.classList.add('btn-send--visible');

            renderContacts();
        } else if (nextQuestionIndex === 4) {
            renderUniqueQuestion(nextQuestionIndex);
        } else {
            renderQuestions(nextQuestionIndex);
        }

        currentProgress += 80 / data.length;
        progressBar.style.width = currentProgress + '%';

        btnNext.disabled = true;
    }
});

renderQuestions(0);