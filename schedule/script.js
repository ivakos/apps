import { timeSchedule, firstShift, secondShift } from './schedule.js';

const container = document.querySelector('.container');

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];


const compliment = document.createElement('h2');
compliment.className = 'compliment';
container.append(compliment);

const thanksBtn = document.createElement('div');
thanksBtn.className = 'thanks_btn btn';
thanksBtn.innerHTML = 'Thank You!&#128536;'
container.append(thanksBtn);

const url = 'https://tools-api.robolatoriya.com/compliment?type=2';

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  compliment.innerHTML = data.text;
}
window.addEventListener('load', getData);

thanksBtn.addEventListener('click', () => {
  compliment.remove();
  thanksBtn.remove();
  init();
});

function init() {
  const title = document.createElement('h1');
  title.className = 'title flex';
  title.innerHTML = 'Schedule of lessons';
  container.append(title);

  const selectDiv = document.createElement('div');
  selectDiv.className = 'select_day flex';
  container.append(selectDiv);

  const daysNodes = [];

  for (let i = 0; i < days.length; i++) {
    const day = document.createElement('div');
    day.className = 'day btn';
    selectDiv.append(day);

    const dayTitle = document.createElement('p');
    dayTitle.className = 'day_title';
    dayTitle.innerHTML = `${days[i]}`;
    day.append(dayTitle);

    daysNodes.push(day);
  }

  document.querySelectorAll('.day').forEach((day, idx) => {
    day.addEventListener('click', () => {
      title.remove();
      selectDiv.remove();
      createDay(idx);
      goBack();
    });
  });
}

function createDay(dayIdx) {
  const daySchedule = document.createElement('div');
  daySchedule.className = 'day_schedule flex';
  container.append(daySchedule);

  const dayOfTheWeek = document.createElement('h1');
  dayOfTheWeek.className = 'day_of_the_week flex';
  dayOfTheWeek.innerHTML = `${days[dayIdx]}`;
  daySchedule.append(dayOfTheWeek);

  const firstTitle = document.createElement('h2');
  firstTitle.innerHTML = 'First shift';
  firstTitle.className = 'schedule_title';
  daySchedule.append(firstTitle);

  createShift(firstShift, timeSchedule.firstShift);

  const secondTitle = document.createElement('h2');
  secondTitle.innerHTML = 'Second shift';
  secondTitle.className = 'schedule_title';
  daySchedule.append(secondTitle);

  createShift(secondShift, timeSchedule.secondShift);

  function createShift(shift, shiftTime) {
    const dayCurrent = shift[dayIdx];
    for (let i = 0; i < 6; i++) {
      const row = document.createElement('div');
      row.className = 'row';
      daySchedule.append(row);

      const number = document.createElement('p');
      number.className = 'number';
      number.innerHTML = `${i + 1}.`;
      row.append(number);

      const time = document.createElement('p');
      time.className = 'time';
      time.innerHTML = `${shiftTime[i]}`
      row.append(time);

      const group = document.createElement('p');
      group.className = 'group';

      if (dayCurrent[i + 1]) {
        group.innerHTML = `${dayCurrent[i + 1].class}`;
      } else {
        group.innerHTML = '-';
      }
      row.append(group);

      const classroom = document.createElement('p');
      classroom.className = 'classroom';

      if (dayCurrent[i + 1]) {
        classroom.innerHTML = `${dayCurrent[i + 1].classroom} каб.`;
      } else {
        classroom.innerHTML = '-';
      }
      row.append(classroom);
    }
  }
}

function goBack() {
  const goBackBtn = document.createElement('p');
  goBackBtn.className = 'go_back_btn btn';
  goBackBtn.innerHTML = 'go back';
  container.append(goBackBtn);

  goBackBtn.addEventListener('click', () => {
    document.querySelector('.day_schedule').remove();
    document.querySelectorAll('.go_back_btn').forEach((el) => el.remove());
    init();
  });
}