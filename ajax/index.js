// Thêm mới smartphone
function addNewSmartPhone() {
    // Lấy dữ liệu từ form tạo mới
    let producer = $('#producer').val();
    let model = $('#model').val();
    let price = $('#price').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // Gửi AJAX POST để tạo smartphone mới
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newSmartphone),
        url: "http://localhost:8080/api/smartphones",
        success: successHandler
    });
    // Chặn sự kiện mặc định của thẻ form
    event.preventDefault();
}

// Hiển thị danh sách smartphone
function successHandler() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/smartphones",
        success: function (data) {
            let content = '<table id="display-list" border="1"><tr>' +
                '<th>Producer</th>' +
                '<th>Model</th>' +
                '<th>Price</th>' +
                '<th>Delete</th>' +
                '<th>Update</th>' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += getSmartphone(data[i]);
            }
            content += "</table>";
            document.getElementById('smartphoneList').innerHTML = content;
            document.getElementById('smartphoneList').style.display = "block";
            document.getElementById('add-smartphone').style.display = "none";
            document.getElementById('update-smartphone').style.display = "none";
            document.getElementById('title').style.display = "block";
            document.getElementById('display').style.display = "none";
            document.getElementById('display-create').style.display = "inline-block";
        }
    });
}

// Hiện form tạo mới smartphone
function displayFormCreate() {
    $('#add-smartphone').show();
    $('#update-smartphone').hide();
    $('#smartphoneList').hide();
    $('#display-create').hide();
    $('#title').hide();
}

// Hiện form cập nhật smartphone
function displayFormUpdate() {
    $('#add-smartphone').hide();
    $('#update-smartphone').show();
    $('#smartphoneList').hide();
    $('#display-create').hide();
    $('#title').hide();
}

// Sinh HTML cho từng smartphone trong bảng
function getSmartphone(smartphone) {
    return `<tr>\
<td >${smartphone.producer}</td>
<td >${smartphone.model}</td>
<td>${smartphone.price}</td>` +
`<td class="btn"><button class="deleteSmartphone" onclick="deleteSmartphone(${smartphone.id})">Delete</button></td>
<td class="btn"><button class="updateSmartphone" onclick="editSmartphone(${smartphone.id})">Update</button></td>
</tr>`;
}

// Xóa smartphone theo id
function deleteSmartphone(id) {
    $.ajax({
        type: "DELETE",
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: successHandler
    });
}

// Hiện form cập nhật và điền sẵn dữ liệu smartphone cần sửa
function editSmartphone(id) {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/smartphones`,
        success: function (data) {
            let smartphone = data.find(item => item.id === id);
            if (smartphone) {
                $('#id-update').val(smartphone.id);
                $('#producer-update').val(smartphone.producer);
                $('#model-update').val(smartphone.model);
                $('#price-update').val(smartphone.price);
                displayFormUpdate();
            }
        }
    });
}

// Khởi tạo sự kiện khi trang load
$(document).ready(function() {
    // Ẩn form tạo mới và cập nhật, chỉ hiện danh sách
    $('#add-smartphone').hide();
    $('#update-smartphone').hide();
    $('#display-create').hide(); // Ẩn nút Create New khi trang vừa tải
    $('#title').show();
    $('#smartphoneList').show();

    // Gán sự kiện submit cho form tạo mới
    $('#add-smartphone').on('submit', function(event) {
        addNewSmartPhone();
        event.preventDefault();
    });
    // Gán sự kiện submit cho form cập nhật
    $('#update-smartphone').on('submit', function(event) {
        updateSmartphone();
        event.preventDefault();
    });
    // Gán sự kiện cho nút Cancel trên form cập nhật
    $('#cancelUpdateSmartphone').on('click', function() {
        $('#update-smartphone').hide();
        $('#smartphoneList').show();
        $('#display-create').show();
        $('#title').show();
    });
});

// Cập nhật smartphone theo id
function updateSmartphone() {
    let id = $('#id-update').val();
    let producer = $('#producer-update').val();
    let model = $('#model-update').val();
    let price = $('#price-update').val();
    let newSmartphone = {
        producer: producer,
        model: model,
        price: price
    };
    // Gửi AJAX PUT để cập nhật smartphone
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        data: JSON.stringify(newSmartphone),
        url: `http://localhost:8080/api/smartphones/${id}`,
        success: function() {
            successHandler();
            $('#update-smartphone').hide();
            $('#smartphoneList').show();
            $('#display-create').show();
            $('#title').show();
        }
    });
}