import {studentsArray} from "./students.js"
/* Вводим доступ к элементам HTML и текущую дату*/

const $studentList = document.getElementById('student__list'),
      $studentListTHAll = document.querySelectorAll('th'),
      $studentFilterInput = document.querySelectorAll('.filter__student'),
      currentTime = new Date();
/* Вводим переменные для .sort и filter */

let column = getFIO,
    columnDir = true,
    columnFilter,
    filterValue;

/* Получаем детально информацию о текущем дне и переводим в строку */

let currentTimeDD = currentTime.getDate();
let currentTimeMM = currentTime.getMonth() + 1; 
let currentTimeYYYY = currentTime.getFullYear();
    
if (currentTimeDD < 10) {
    currentTimeDD = '0' + currentTimeDD;
}

if (currentTimeMM < 10) {
    currentTimeMM = '0' + currentTimeMM;
} 
    
let currentTimeDate = currentTimeYYYY + '-' + currentTimeMM + '-' + currentTimeDD;

/* Вводим максимальные значения для input Дня рождения и Начала обучения */

document.getElementById("input__birthDate").setAttribute("max", currentTimeDate);
document.getElementById("input__studyDate").setAttribute("max", currentTimeYYYY);

/* Функция для получения ФИО студента */

function getFIO(student) {
    return student.surname + ' ' + student.name + ' ' + student.lastname;
}

/* Функция для получения Дня рождения студента */

function getBirthDate(student) {
    const yy = student.birthDate.getFullYear();
    let mm = student.birthDate.getMonth() + 1;
    let dd = student.birthDate.getDate();
    let fullAge = currentTime.getFullYear() - yy;

    
    if (((currentTime.getMonth() + 1) < mm) || (((currentTime.getMonth() + 1) == mm) && (currentTime.getDate() < dd))) {
        fullAge--;
    }
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    
    return dd + '.' + mm + '.' + yy + ' ' + `(${fullAge} лет)`;
}

/* Функция для получения Учебного времени студента */

function getStudyDate(student) {
    const studyFinish = student.studyStart + 4;
    let course;
    if (studyFinish >= currentTime.getFullYear() && currentTime.getMonth() < 8) {
        course = currentTime.getFullYear() - student.studyStart + ' курс';
    } else if (studyFinish > currentTime.getFullYear() && currentTime.getMonth() >= 8) {
        course = currentTime.getFullYear() - student.studyStart + ' курс'
    } else if ((studyFinish == currentTime.getFullYear() && currentTime.getMonth() >= 8) || (studyFinish < currentTime.getFullYear())) {
        course = 'Закончил'
    }
    
    return `${student.studyStart}-${studyFinish} (${course})`;
}

/* Функция для получения Факультета студента */

function getFaculty(student) {
    return student.faculty
}

/* Функция для получения Начала учебы студента  */

function getStudyStart(student) {
    return String(student.studyStart);
}

/* Функция для получения Конца учебы студента  */

function getStudyEnd(student) {
    return String(+student.studyStart + 4);
}

/* Функция сортировки массива по убыванию и возрастанию */

function getSortStudents(prop, dir, arr) {
    const studentsCopy = [...arr];
    return studentsCopy.sort(function(studentA, studentB) {
        if ((!dir == false ? prop(studentA) < prop(studentB) : prop(studentA) > prop(studentB)))
        return -1;
    })
}

/* Функция фильтрации массива по вводу */

function getFilterStudents(arr) {
    let filterCopy = [...arr]
            .filter(filterByName)
			.filter(filterByFaculty)
			.filter(filterByStartDate)
			.filter(filterByFinishDate);
    return filterCopy;
}

// Фильтрация по ФИО студента
function filterByName(obj) {
    let input = document.getElementById('filter__fio')
    if(input.value.length === 0) {
        return obj;
    } else {
        let filterVal = input.value.toLowerCase()
            .split(' ').join('');
        obj.fullName = function () {
            let fullName = obj.surname+obj.name+obj.lastname;
            return fullName.toLowerCase();
        }
        if(obj.fullName()
            .includes(filterVal)) {
            delete obj.fullName;
            return obj;
        }
    }
}

// Фильтрация по названию факультета
function filterByFaculty (obj) {
    let input = document.getElementById('filter__faculty')
    if(input.value.length === 0) {
        return obj;
    } else {
        let filterVal = input.value
            .toLowerCase().trim()
        if(obj.faculty
            .toLowerCase()
            .includes(filterVal)) {
                return obj;
            }
    }
}

// Фильтрация по году начала обучения
function filterByStartDate (obj) {
    let input = document.getElementById('filter__startStudyAge')
    if(input.value.length === 0) {
        return obj;
    } else {
        let filterVal = input.value
            .toString();
        if(obj.studyStart.toString()
            .includes(filterVal)) {
                return obj;
            }
    }
}

// Фильтрация по году начала обучения
function filterByFinishDate (obj) {
    let input = document.getElementById('filter__endStudyAge')
    if(input.value.length === 0) {
        return obj;
    } else {
        let filterVal = input.value
            .toString();
        if((obj.studyStart + 4).toString()
            .includes(filterVal)) {
                return obj;
            }
    }
}



/* Функция заполнения ячеек таблицы */

function newStudentTR(student) {
    const $studentTR = document.createElement('tr'),
          $fioTD = document.createElement('td'),
          $facultyTD = document.createElement('td'),
          $birthDateTD = document.createElement('td'),
          $studyStartTD = document.createElement('td');
    
    $fioTD.textContent = getFIO(student);
    $facultyTD.textContent = getFaculty(student);
    $birthDateTD.textContent = getBirthDate(student);
    $studyStartTD.textContent = getStudyDate(student);


    $studentTR.append($fioTD);
    $studentTR.append($facultyTD);
    $studentTR.append($birthDateTD); 
    $studentTR.append($studyStartTD);

    return $studentTR;
}

/* Функция рендера таблицы с информацией из массива */

function render() {
    let studentsCopy = [...studentsArray];    
    studentsCopy = getFilterStudents(studentsCopy);
    studentsCopy = getSortStudents(column, columnDir, studentsCopy);

    $studentList.innerHTML = '';

    studentsCopy.forEach(student => {
        $studentList.append(newStudentTR(student));
    })
}

/* Обработчик событий при нажатии кнопок сортировки массива по возрастанию и убыванию */

$studentListTHAll.forEach(element => {
    element.addEventListener('click', function() {
        switch (this.dataset.column) {
            case "FIO":
                column = getFIO;
                break;
            case "Faculty":
                column = getFaculty;
                break;
            case "BirthDate":
                column = getBirthDate;
                break;
            case "StudyDate":
                column = getStudyDate;
                break;
        }
        columnDir = !columnDir;
        render();
    })
})

/* Обработчик событий при нажатии input фильтрации массива */

$studentFilterInput.forEach(element => {
    element.addEventListener('input', render)
})


/* Обработчик событий для ввода нового стундета в массив */

document.getElementById('add__student').addEventListener('submit', function(event) {
    event.preventDefault();

    studentsArray.push({
        name: document.getElementById("input__name").value.trim(),
        surname: document.getElementById("input__surname").value.trim(),
        lastname: document.getElementById("input__lastname").value.trim(),
        birthDate: document.getElementById("input__birthDate").valueAsDate,
        studyStart: Number(document.getElementById("input__studyDate").value.trim()),
        faculty: document.getElementById("input__faculty").value.trim(),
    })

    document.querySelectorAll(".add__student").forEach(element => element.value = '');

    render()
}) 



render();