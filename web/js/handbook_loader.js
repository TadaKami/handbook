async function LoaderTable(){
    let date_registration = document.getElementById('date_registration').value;
    let url = 'http://handbook/web/people-hand-book/test?date_registration='+date_registration;
    console.log(url);

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
function generateTable(peoples, thead_data){
    console.log('Начался метод generateTable');
    console.log(thead_data);
    console.log(peoples);
    let div_table = document.getElementById('table');
    div_table.innerHTML = '';
    let table = document.createElement('table');
    table.classList.add('table');
    let header = table.createTHead();
    let row = header.insertRow(0);
    row.classList.add('table_row');
    row.classList.add('thead');
    for (let i=0;i < thead_data.length;i++){
        let thead_data_i = thead_data[i];
        var cell = row.insertCell(0);
        cell.classList.add('table_cell');
        cell.innerHTML = thead_data_i;
        // let row_people = tbody.insertRow(0);
        // for(let j=0; j < peoples.length;j++){
        //     let date_registration = row_people.insertCell(0);
        //     // console.log('THEAD DATA'+thead_data);
        //     // console.log(peoples[j][thead_data_i]);
        //     date_registration.innerHTML = peoples[j][thead_data_i];
        // }
    }
    // var del = row.insertCell(0);
    // del.innerHTML = '';
    //
    // var edit = row.insertCell(0);
    // edit.innerHTML = '';

    console.log('---------------------------------------');
    let tbody = table.createTBody();
    // let row_people = tbody.insertRow(0);
    // for (let i = 0;i < thead_data.length;i++){
    //     let thead_data_i = thead_data[i];
    //     console.log(thead_data_i);
    //     for(let j = 0;j < peoples.length; j++){
    //         let date_registration = row_people.insertCell(0);
    //         date_registration.innerHTML = peoples[j][thead_data_i];
    //         console.log(peoples[j][thead_data_i]);
    //     }
    // }
    // let thead_data_i = thead_data[i];
    for(let j = 0;j < peoples.length; j++){
        let row_people = tbody.insertRow(0);
        row_people.classList.add('table_row');
        for (let i = 0;i < thead_data.length;i++){
            let thead_data_i = thead_data[i];
            let date_registration = row_people.insertCell(0);
            date_registration.classList.add('table_cell');

            date_registration.innerHTML = peoples[j][thead_data_i];
        }
        // console.log(peoples[j][thead_data_i]);
    }
    console.log('---------------------------------------');

    // console.log('START TBODY');
    // for(let j = 0; j < peoples.length;j++){
    //     let row_people = tbody.insertRow(0);
    //     let date_registration = row_people.insertCell(0);
    //     date_registration.innerHTML = peoples[j].date_registration;
    //
    //     let second_name = row_people.insertCell(0);
    //     second_name.innerHTML = peoples[j].second_name;
    //
    //     let name = row_people.insertCell(0);
    //     name.innerHTML = peoples[j].name;
    //
    //     let people_id = row_people.insertCell(0);
    //     people_id.innerHTML = peoples[j].people_id;
    // }
    // console.log('END TBODY');


    div_table.appendChild(table);
    console.log('Закончился метод generateTable');

}

$(document).ready(function (){
    LoaderTable();
})

async function AddPeople(){
    let name = document.getElementById('name').value;
    let second_name = document.getElementById('second_name').value;
    let address = document.getElementById('address').value;
    let date_registration = '';
    let data = {
        'name':name,
        'second_name':second_name,
        'address':address,
        'date_registration': (date_registration == "undefined")?'':date_registration
    }
    console.log(data);
    let response = await fetch(
        'http://handbook/web/people-hand-book/add-edit-people?name='+name
        +'&second_name='+second_name
        +'&address='+address
        +'&date_registration='+date_registration);
    let result = await response.json();
    console.log(result);

    let div_success = document.getElementById('success');
    div_success.innerHTML = '';
    let div = document.createElement('div');
    div.classList.add('alert');
    if (response.ok){
        document.getElementById('name').innerText = "";
        document.getElementById('second_name').innerText = "";
        document.getElementById('address').innerText = "";
        if (result.errors.length == 0){
            div.innerText = 'Сохранение прошло успешно';
            div.classList.add('alert-success');
        }else{
            div.innerText = result.errors.message;
            div.classList.add('alert-danger');
        }
        div_success.appendChild(div);
    }
    
    console.log(result);
}