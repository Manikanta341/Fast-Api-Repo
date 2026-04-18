tbody = document.querySelector("tbody")
addBtn = document.querySelector(".add")
form = document.querySelector(".form-wrapper")
cancelBtn = document.getElementById("cancel")

let mobileEle = document.getElementById("mobile")
let priceEle = document.getElementById("price")
let ramEle = document.getElementById("ram")
let storageEle = document.getElementById("storage")

let http_method = "POST"
let array_data = []
let edit_id = null

// ✅ GET
async function getMobiles() {
    try {
        let response = await fetch("http://127.0.0.1:8000/Mobiles/")
        let result = await response.json()

        array_data = result

        if (array_data.length > 0) {
            updateArray(array_data)
        } else {
            tbody.innerHTML = "<tr><td colspan='6'>No Data</td></tr>"
        }

    } catch (e) {
        console.log(e)
    }
}

// ✅ Render Table
function updateArray(array_data) {
    let data = ''

    for (let i = 0; i < array_data.length; i++) {
        data += `
        <tr id="${array_data[i].id}">
            <td>${array_data[i].mobile}</td>
            <td>${array_data[i].price}</td>
            <td>${array_data[i].ram}</td>
            <td>${array_data[i].storage}</td>
            <td><button class="btn btn-success" onclick="editMobiles(event)">Edit</button></td>
            <td><button class="btn btn-danger" onclick="deleteMobiles(event)">Delete</button></td>
        </tr>`
    }

    tbody.innerHTML = data
}

getMobiles()

// Show form
addBtn.addEventListener('click', function () {
    form.classList.add('active')
})

// Cancel
cancelBtn.addEventListener('click', function () {
    form.classList.remove('active')
    resetForm()
})

// ✅ SAVE (POST + PUT)
document.addEventListener("DOMContentLoaded", function () {
    let saveBtn = document.getElementById("save")

    if (saveBtn) {
        saveBtn.addEventListener('click', async function () {

            let form_data = {
                mobile: mobileEle.value.trim(),
                price: parseInt(priceEle.value) || 0,
                ram: parseInt(ramEle.value) || 0,
                storage: parseInt(storageEle.value) || 0
            }

            let url = "http://127.0.0.1:8000/Mobiles/create/"

            if (http_method === "PUT") {
                url = `http://127.0.0.1:8000/Mobiles/update/${edit_id}`
            }

            try {
                await fetch(url, {
                    method: http_method,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form_data)
                })

                form.classList.remove('active')
                resetForm()
                getMobiles()
                http_method = "POST"
                edit_id = null

            } catch (e) {
                console.log(e)
            }
        })
    }
})

// ✅ EDIT
function editMobiles(e) {
    form.classList.add('active')

    let id = e.target.closest("tr").id
    edit_id = id
    http_method = "PUT"

    let selectedMobile = array_data.find(m => m.id == id)

    if (selectedMobile) {
        mobileEle.value = selectedMobile.mobile
        priceEle.value = selectedMobile.price
        ramEle.value = selectedMobile.ram
        storageEle.value = selectedMobile.storage
    }
}

// ✅ DELETE
function deleteMobiles(e) {
    let id = e.target.closest("tr").id

    fetch(`http://127.0.0.1:8000/Mobiles/delete/${id}`, {
        method: "DELETE"
    })
    .then(() => getMobiles())
    .catch((e) => console.log(e))
}

// ✅ Reset Form
function resetForm() {
    mobileEle.value = ""
    priceEle.value = ""
    ramEle.value = ""
    storageEle.value = ""
}
