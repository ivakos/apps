const timeSchedule = {
  'firstShift': ['8.00-8.45', '9.00-9.45', '10.00-10.45',
    '11.00-11.45', '11.55-12.40', '12.50-13.35',],

  'secondShift': ['13.50-14.35', '14.50-15.35', '15.50-16.35',
    '16.45-17.30', '17.40-18.25', '18.35-19.20',]
};

const firstShift = [
  {//Monday 
    3: {
      'class': '9Г',
      'classroom': '57',
    },
    4: {
      'class': '9В',
      'classroom': '35',
    },
    6: {
      'class': '3Б',
      'classroom': '57',
    },
  },
  {//Tuesday
    3: {
      'class': '9В',
      'classroom': '65',
    },
    4: {
      'class': 'стимул.',
      'classroom': '47',
    },
    5: {
      'class': '9Д',
      'classroom': '49',
    },
  },
  {//Wednesday
    5: {
      'class': '9Д',
      'classroom': '69',
    },
    6: {
      'class': '3Г',
      'classroom': 'кл.',
    },
  },
  {//Thursday
    3: {
      'class': '9В',
      'classroom': '76',
    },
    4: {
      'class': '9Г',
      'classroom': '68',
    },
  },
  {//Friday
    5: {
      'class': '9Д',
      'classroom': '77',
    },
    6: {
      'class': '9Г',
      'classroom': '65',
    },
  },
];

const secondShift = [
  {//Monday 
    1: {
      'class': 'факул.',
      'classroom': 'кл.',
    },
    2: {
      'class': '6Б',
      'classroom': '65',
    },
    3: {
      'class': '3Г',
      'classroom': 'кл.',
    },
  },
  {//Tuesday
    1: {
      'class': '3Г',
      'classroom': '65',
    },
    2: {
      'class': '3А',
      'classroom': '65',
    },
    3: {
      'class': '6А',
      'classroom': '65',
    },
    5: {
      'class': '3Б',
      'classroom': '65',
    },
  },
  {//Wednesday
    1: {
      'class': '3А',
      'classroom': 'кл.',
    },
    3: {
      'class': '3В',
      'classroom': '65',
    },
    4: {
      'class': '6Б',
      'classroom': '65',
    },
  },
  {//Thursday
    1: {
      'class': '3А',
      'classroom': '58',
    },
    2: {
      'class': '3В',
      'classroom': '65',
    },
    3: {
      'class': '6А',
      'classroom': '65',
    },
    4: {
      'class': '3Б',
      'classroom': '65',
    },
    5: {
      'class': '3Г',
      'classroom': '65',
    },
  },
  {//Friday
    1: {
      'class': '6А',
      'classroom': '65',
    },
    2: {
      'class': '6Б',
      'classroom': '64',
    },
    3: {
      'class': '3В',
      'classroom': '65',
    },
  },
];

export { timeSchedule, firstShift, secondShift };
