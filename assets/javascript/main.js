var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
var stdApi = 'http://localhost:3000/dataSv';

function start() {
    getDataSv(renderData);
    handleCreateSv();
}

start();

function getDataSv(callback) {
    fetch(stdApi)
        .then(function(data) {
            return data.json();
        })
        .then(callback)
}

function createSv(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }

    fetch(stdApi, options)
        .then(function(response) {
            response.json();
        })
        .then(callback);
}

function renderData(dataList) {
    var tableSv = $('.sv-lists tbody');
    
    var htmls = dataList.map(function(dataSv) {
        return `
        <tr class = "sv-${dataSv.id}">
            <td>${dataSv.id}</td>
            <td>${dataSv.mssv}</td>
            <td>${dataSv.name}</td>
            <td>${dataSv.gender}</td>
            <td>${dataSv.class}</td>
            <td>${dataSv.phone}</td>
            <td>${dataSv.address}</td>
            <td>
                <svg onclick = "handleDeleteSv(${dataSv.id})"class = "icondelete" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
            </td>
        </tr>
        `;
    });
    tableSv.innerHTML = htmls.join("");
}

function handleCreateSv() {
    var createBtn =$('#btn-create');
    createBtn.onclick = function() {
        var mssv = $('input[name="mssv"]').value;
        var name = $('input[name="name"]').value;
        var gender = $('input[name="gender"][checked]').value;
        var classRoom = $('input[name="class"]').value;
        var phone = $('input[name="phone"]').value;
        var address = $('input[name="address"]').value;
        var gender;

        var dataForm = {
            mssv: mssv,
            name: name,
            gender: gender,
            class: classRoom,
            phone: phone,
            address: address
        }

        createSv(dataForm, function() {
            getDataSv(renderData);
        });
        
    };
}

function handleDeleteSv(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
    }

    fetch(stdApi + '/' + id, options)
        .then(function(response) {
            response.json();
        })
        .then(function() {
            var dataSv = $('.sv-' + id);
            if (dataSv) {
                dataSv.remove();
            }
        });
}

