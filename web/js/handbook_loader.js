/**
 * LoaderTable - загрузка данных для таблицы и вызов метода генерации таблицы
 * @returns {Promise<void>}
 * @constructor
 */
async function LoaderTable(){
    let date_birthday = document.getElementById('date_birthday').value;
    let url = 'http://handbook/web/people-hand-book/find-people?date_birthday='+date_birthday;

    let response = await fetch(url);
    let json = {
        'data':{},
        'errors':{}
    };
    if (response.ok){
        let json = await response.json();
        let peoples = json.data;
        let div_table = document.getElementById('table');
        div_table.innerHTML = ''; // предварительная очистка таблицы
        if (peoples.length == 0){
            alert('Данных нету');
        }else {
            generateTable(peoples, Object.keys(peoples[0]),div_table);
        }

    }
}

/**
 * generateTable - Генерирование таблицы
 * @param peoples - массив людей
 * @param thead_data - массив ключей для генерации заголовков
 * @param div_table - куда кидать эту таблицу
 */
function generateTable(peoples, thead_data, div_table){

    let table = document.createElement('table');
    table.classList.add('table');
    table.id = 'TEST_DINAMIC';

    let header = table.createTHead();
    let row = header.insertRow(-1);
    row.classList.add('table_row');
    row.classList.add('thead');
    for (let i=0;i < thead_data.length;i++){
        let header_data = thead_data[i];
        let cell = row.insertCell(-1);
        cell.classList.add('table_cell');
        cell.innerHTML = header_data?header_data:'+++';
    }

    let tbody = table.createTBody();
    /**
     * Перебор всех людей
     * Для каожого человека перебираем все реквизиты
     */

    for(let j = 0;j < peoples.length; j++){
        let row_people = tbody.insertRow(-1);
        row_people.classList.add('table_row');

        for (let i = 0;i < thead_data.length+2;i++){
            let header_data = thead_data[i];
            let people_column = row_people.insertCell(-1);
            row_people.id = peoples[j]['#'];
            people_column.classList.add('table_cell');
            // people_column.id = peoples[j]['#'];
            if(peoples[j][header_data] == null){
                switch (i) {
                    case 5:
                        people_column.innerHTML = '<button>del</button>';
                        people_column.id = 'DEL';
                        people_column.onclick = function (){

                            let url = 'http://handbook/web/people-hand-book/delete-people?people_id='+peoples[j]['#'];

                            let response = fetch(url);
                            let json = {
                                'data':{},
                                'errors':{}
                            };
                            let tr = document.getElementById(peoples[j]['#']);
                            tr.remove();

                        }
                        console.log('DEL');
                        break;
                    case 6:
                        people_column.innerHTML = '<button>edit</button>';
                        people_column.id = 'EDIT';
                        people_column.onclick = function (){
                            $.ajax({
                                type : "POST",
                                url : '/web/people-hand-book/compat-edit-data',
                                data: {
                                    people_id: peoples[j]['#'],
                                    name: peoples[j]['Имя'],
                                    second_name: peoples[j]['Фамилия'],
                                    address: peoples[j]['Адрес'],
                                    date_birthday: peoples[j]['Дата рождения']},
                                success  : function(response) {
                                }
                            });
                        }
                        console.log('EDIT');
                        break;

                }
            }else{
                people_column.innerHTML = peoples[j][header_data];
            }
        }
    }
    div_table.appendChild(table);
}

/**
 * После загрузки страницы вызываем метод заполнения таблицы
 */
$(document).ready(function (){
    if (document.getElementById('table') != null){
        LoaderTable();
    }
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
    let date_birthday = document.getElementById('date_birthday').value; // заготовка под редактирование
    let people_id = document.getElementById('people_id').value;

    let div_success = document.getElementById('success');
    div_success.innerHTML = '';
    if(date_birthday == ""){

        let div = document.createElement('div');
        div.classList.add('alert');
        div.innerText = 'Выберите полную дату';
        div.classList.add('alert-danger');
        div_success.appendChild(div);
    }else{
        let json_data = {
                people_id: people_id,
                name: name,
                second_name: second_name,
                address: address,
                date_birthday: date_birthday
        };
        let response = await fetch('http://handbook/web/people-hand-book/add-edit-people',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(json_data)
        });
        let result = await response.json();

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
            if (result.errors.length == 0){
                window.location.replace('http://handbook/web/');
            }else {
                div.innerText = result.errors.message;
                div.classList.add('alert-danger');
            }
            div_success.appendChild(div);

        }

    }

    
}


function DeletePeople(people_id){
    let url = 'http://handbook/web/people-hand-book/delete-people?people_id='+people_id;

    let response = fetch(url);
    let json = {
        'data':{},
        'errors':{}
    };
    console.log(response.json());
    if(response.ok){
        let tr = document.getElementById('people_id');
        tr.remove();
    }
}