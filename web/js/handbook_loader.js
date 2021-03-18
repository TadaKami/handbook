/**
 * LoaderTable - загрузка данных для таблицы и вызов метода генерации таблицы
 * @returns {Promise<void>}
 * @constructor
 */
async function LoaderTable(){
    let date_registration = document.getElementById('date_registration').value;
    let url = 'http://handbook/web/people-hand-book/test?date_registration='+date_registration;

    let response = await fetch(url);
    let json = {
        'data':{},
        'errors':{}
    };
    if (response.ok){
        let json = await response.json();
        console.log(json);
        let peoples = json.data;
        if (peoples.length == 0){
            alert('Данных нету');
        }else {
            generateTable(peoples, Object.keys(peoples[0]));
        }
    }
}

/**
 * generateTable - Генерирование таблицы
 * @param peoples
 * @param thead_data
 */
function generateTable(peoples, thead_data){
    let div_table = document.getElementById('table');
    div_table.innerHTML = ''; // предварительная очистка таблицы

    let table = document.createElement('table');
    table.classList.add('table');

    let header = table.createTHead();
    let row = header.insertRow(0);
    row.classList.add('table_row');
    row.classList.add('thead');

    for (let i=0;i < thead_data.length;i++){
        let header_data = thead_data[i];
        var cell = row.insertCell(0);
        cell.classList.add('table_cell');
        cell.innerHTML = header_data;
    }

    let tbody = table.createTBody();
    /**
     * Перебор всех людей
     * Для каожого человека перебираем все реквизиты
     */
    for(let j = 0;j < peoples.length; j++){
        let row_people = tbody.insertRow(0);
        row_people.classList.add('table_row');
        for (let i = 0;i < thead_data.length;i++){
            let header_data = thead_data[i];
            let people_column = row_people.insertCell(0);
            people_column.classList.add('table_cell');
            people_column.innerHTML = peoples[j][header_data];
        }
    }
    div_table.appendChild(table);
}

/**
 * После загрузки страницы вызываем метод заполнения таблицы
 */
$(document).ready(function (){
    LoaderTable();
})

/**
 * AddPeople - метод добавления нового человека
 * @returns {Promise<void>}
 * @constructor
 */
async function AddPeople(){
    let name = document.getElementById('name').value;
    let second_name = document.getElementById('second_name').value;
    let address = document.getElementById('address').value;
    let date_registration = ''; // заготовка под редактирование
    /**
     * Запорос на метод добавления/редактирования
     * @type {Response}
     */
    let response = await fetch(
        'http://handbook/web/people-hand-book/add-edit-people?name='+name
        +'&second_name='+second_name
        +'&address='+address
        +'&date_registration='+date_registration);
    let result = await response.json();

    let div_success = document.getElementById('success');
    div_success.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add('alert');
    /**
     * Если ответ в диапазоне 200-299
     *      Да?     Очистка инпутов
     *              Пуст ли массив ошибок?
     *                  Да?     Добавляем уведомление о том, что сохранение прошло успешно
     *                  Нет?    Добавляем уведомление о том, какая ошибка произошла в сохранении нового человека
     */
    if (response.ok){
        /**
         * Очистка инпутов
         * @type {string}
         */
        document.getElementById('name').value = "";
        document.getElementById('second_name').value = "";
        document.getElementById('address').value = "";

        if (result.errors.length == 0){
            div.innerText = 'Сохранение прошло успешно';
            div.classList.add('alert-success');
        }else{
            div.innerText = result.errors.message;
            div.classList.add('alert-danger');
        }
        div_success.appendChild(div);
    }
    
}