alert("Script Loaded");
let students = JSON.parse(localStorage.getItem("students")) || [];
let totalStudents = 0;
let totalFeesAmount = 0;
let totalDueAmount = 0;

function showForm() {
    document.getElementById("studentForm").style.display = "block";
}

function addStudent() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    let totalFees = Number(document.getElementById("totalFees").value);
    let paidFees = Number(document.getElementById("paidFees").value);

    let dueFees = totalFees - paidFees;
    students.push({
        name,
        age,
        course,
        totalFees,
        paidFees,
        dueFees
    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    let table = document.getElementById("studentTable");

    let row = table.insertRow();

    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = age;
    row.insertCell(2).innerText = course;
    row.insertCell(3).innerText = "₹" + totalFees;
    row.insertCell(4).innerText = "₹" + paidFees;
    row.insertCell(5).innerText = "₹" + dueFees;

    let actionCell = row.insertCell(6);

    actionCell.innerHTML = `
        <button onclick="printReceipt(this)">🧾 Receipt</button>
        <button onclick="editStudent(this)">Edit</button>
        <button onclick="deleteStudent(this)">Delete</button>
    `;

    totalStudents++;
    totalFeesAmount += totalFees;
    totalDueAmount += dueFees;

    document.getElementById("studentCount").innerText = totalStudents;
    document.getElementById("totalFeeAmount").innerText = "₹" + totalFeesAmount;
    document.getElementById("dueFeeAmount").innerText = "₹" + totalDueAmount;

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("totalFees").value = "";
    document.getElementById("paidFees").value = "";
}

function deleteStudent(button) {

    if (confirm("Delete this student record?")) {

        let row = button.parentNode.parentNode;

        let name = row.cells[0].innerText;

        students = students.filter(
            student => student.name !== name
        );

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        row.remove();
    }
}

function editStudent(button) {

    let row = button.parentNode.parentNode;

    document.getElementById("name").value = row.cells[0].innerText;
    document.getElementById("age").value = row.cells[1].innerText;
    document.getElementById("course").value = row.cells[2].innerText;

    document.getElementById("totalFees").value =
        row.cells[3].innerText.replace("₹", "");

    document.getElementById("paidFees").value =
        row.cells[4].innerText.replace("₹", "");

    row.remove();

    document.getElementById("studentForm").style.display = "block";
}
function showRecords(button) {

    let table = document.getElementById("studentTable");

    if (table.style.display === "none") {
        table.style.display = "table";
    } else {
        table.style.display = "none";
    }
}
function searchStudent(button) {

    let studentName = prompt("Enter Student Name");

    let table = document.getElementById("studentTable");

    for (let i = 1; i < table.rows.length; i++) {

        let name =
            table.rows[i].cells[0].innerText;

        if (
            name.toLowerCase() ===
            studentName.toLowerCase()
        ) {

            alert("Student Found: " + name);

            return;
        }
    }

    alert("Student Not Found");
}
function showSetup() {

    document.getElementById("setupForm").style.display =
        "block";
}

function saveSetup() {
    let logoData =
        localStorage.getItem("logoData") || "";
    let coachingName =
        document.getElementById("coachingName").value;

    let ownerName =
        document.getElementById("ownerName").value;

    let mobile =
        document.getElementById("mobile").value;

    let address =
        document.getElementById("address").value;

    localStorage.setItem(
        "coachingName",
        coachingName
    );

    localStorage.setItem(
        "ownerName",
        ownerName
    );

    localStorage.setItem(
        "mobile",
        mobile
    );

    localStorage.setItem(
        "address",
        address
    );
    let file = document.getElementById("logoFile").files[0];

    if (file) {

        let reader = new FileReader();

        reader.onload = function (e) {

            logoData = e.target.result;

            localStorage.setItem(
                "logoData",
                logoData
            );

            alert("Setup Saved Successfully");
        };

        reader.readAsDataURL(file);

    } else {

        alert("Setup Saved Successfully");
    }

    alert("Setup Saved Successfully");
}
function printReceipt(button) {

    let row = button.parentNode.parentNode;

    let name = row.cells[0].innerText;
    let course = row.cells[2].innerText;
    let totalFees = row.cells[3].innerText;
    let paidFees = row.cells[4].innerText;
    let dueFees = row.cells[5].innerText;
    let logoData =
        localStorage.getItem("logoData") ||
        "";
    let coachingName =
        localStorage.getItem("coachingName") ||
        "My Coaching";

    let ownerName =
        localStorage.getItem("ownerName") ||
        "";

    let mobile =
        localStorage.getItem("mobile") ||
        "";

    let address =
        localStorage.getItem("address") ||
        "";

    let logoUrl =
        localStorage.getItem("logoUrl") ||
        "";

    let receiptWindow =
        window.open("", "", "width=800,height=700");

    receiptWindow.document.write(`
        <html>
        <head>
            <title>Fee Receipt</title>

            <style>
                body{
                    font-family:Arial;
                    padding:20px;
                }

                .header{
                    text-align:center;
                }

                img{
                    max-width:100px;
                    margin-bottom:10px;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                    margin-top:20px;
                }

                table,th,td{
                    border:1px solid black;
                }

                th,td{
                    padding:10px;
                    text-align:left;
                }
            </style>

            
        </head>

        <body>

        <div class="header">

<table style="width:100%; border:none;">
<tr>

<td style="border:none;">
    <h1>${coachingName}</h1>
    <p>${address}</p>
    <p>Owner: ${ownerName}</p>
    <p>Mobile: ${mobile}</p>
</td>

<td style="border:none; text-align:right;">
    ${logoData ? `<img src="${logoData}" width="180">` : ""}
</td>

</tr>
</table>

</div>
            <hr>

            <h2>Fee Receipt</h2>

            <table>

                <tr>
                    <th>Student Name</th>
                    <td>${name}</td>
                </tr>

                <tr>
                    <th>Course</th>
                    <td>${course}</td>
                </tr>

                <tr>
                    <th>Total Fees</th>
                    <td>${totalFees}</td>
                </tr>

                <tr>
                    <th>Paid Fees</th>
                    <td>${paidFees}</td>
                </tr>

                <tr>
                    <th>Due Fees</th>
                    <td>${dueFees}</td>
                </tr>

            </table>

            <br>

            <p>
                Receipt Date:
                ${new Date().toLocaleDateString()}
            </p>

        </body>
        </html>
    `);

    receiptWindow.document.close();
    receiptWindow.print();
}
let students = JSON.parse(localStorage.getItem("students")) || [];
let totalStudents = 0;
let totalFeesAmount = 0;
let totalDueAmount = 0;

function showForm() {
    document.getElementById("studentForm").style.display = "block";
}

function addStudent() {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    let totalFees = Number(document.getElementById("totalFees").value);
    let paidFees = Number(document.getElementById("paidFees").value);

    let dueFees = totalFees - paidFees;
    students.push({
        name,
        age,
        course,
        totalFees,
        paidFees,
        dueFees
    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    let table = document.getElementById("studentTable");

    let row = table.insertRow();

    row.insertCell(0).innerText = name;
    row.insertCell(1).innerText = age;
    row.insertCell(2).innerText = course;
    row.insertCell(3).innerText = "₹" + totalFees;
    row.insertCell(4).innerText = "₹" + paidFees;
    row.insertCell(5).innerText = "₹" + dueFees;

    let actionCell = row.insertCell(6);

    actionCell.innerHTML = `
        <button onclick="printReceipt(this)">🧾 Receipt</button>
        <button onclick="editStudent(this)">Edit</button>
        <button onclick="deleteStudent(this)">Delete</button>
    `;

    totalStudents++;
    totalFeesAmount += totalFees;
    totalDueAmount += dueFees;

    document.getElementById("studentCount").innerText = totalStudents;
    document.getElementById("totalFeeAmount").innerText = "₹" + totalFeesAmount;
    document.getElementById("dueFeeAmount").innerText = "₹" + totalDueAmount;

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("totalFees").value = "";
    document.getElementById("paidFees").value = "";
}

function deleteStudent(button) {

    if (confirm("Delete this student record?")) {

        let row = button.parentNode.parentNode;

        let name = row.cells[0].innerText;

        students = students.filter(
            student => student.name !== name
        );

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        row.remove();
    }
}

function editStudent(button) {

    let row = button.parentNode.parentNode;

    document.getElementById("name").value = row.cells[0].innerText;
    document.getElementById("age").value = row.cells[1].innerText;
    document.getElementById("course").value = row.cells[2].innerText;

    document.getElementById("totalFees").value =
        row.cells[3].innerText.replace("₹", "");

    document.getElementById("paidFees").value =
        row.cells[4].innerText.replace("₹", "");

    row.remove();

    document.getElementById("studentForm").style.display = "block";
}
function showRecords(button) {

    let table = document.getElementById("studentTable");

    if (table.style.display === "none") {
        table.style.display = "table";
    } else {
        table.style.display = "none";
    }
}
function searchStudent(button) {

    let studentName = prompt("Enter Student Name");

    let table = document.getElementById("studentTable");

    for (let i = 1; i < table.rows.length; i++) {

        let name =
            table.rows[i].cells[0].innerText;

        if (
            name.toLowerCase() ===
            studentName.toLowerCase()
        ) {

            alert("Student Found: " + name);

            return;
        }
    }

    alert("Student Not Found");
}
function showSetup() {

    document.getElementById("setupForm").style.display =
        "block";
}

function saveSetup() {
    let logoData =
        localStorage.getItem("logoData") || "";
    let coachingName =
        document.getElementById("coachingName").value;

    let ownerName =
        document.getElementById("ownerName").value;

    let mobile =
        document.getElementById("mobile").value;

    let address =
        document.getElementById("address").value;

    localStorage.setItem(
        "coachingName",
        coachingName
    );

    localStorage.setItem(
        "ownerName",
        ownerName
    );

    localStorage.setItem(
        "mobile",
        mobile
    );

    localStorage.setItem(
        "address",
        address
    );
    let file = document.getElementById("logoFile").files[0];

    if (file) {

        let reader = new FileReader();

        reader.onload = function (e) {

            logoData = e.target.result;

            localStorage.setItem(
                "logoData",
                logoData
            );

            alert("Setup Saved Successfully");
        };

        reader.readAsDataURL(file);

    } else {

        alert("Setup Saved Successfully");
    }

    alert("Setup Saved Successfully");
}
function printReceipt(button) {

    let row = button.parentNode.parentNode;

    let name = row.cells[0].innerText;
    let course = row.cells[2].innerText;
    let totalFees = row.cells[3].innerText;
    let paidFees = row.cells[4].innerText;
    let dueFees = row.cells[5].innerText;
    let logoData =
        localStorage.getItem("logoData") ||
        "";
    let coachingName =
        localStorage.getItem("coachingName") ||
        "My Coaching";

    let ownerName =
        localStorage.getItem("ownerName") ||
        "";

    let mobile =
        localStorage.getItem("mobile") ||
        "";

    let address =
        localStorage.getItem("address") ||
        "";

    let logoUrl =
        localStorage.getItem("logoUrl") ||
        "";

    let receiptWindow =
        window.open("", "", "width=800,height=700");

    receiptWindow.document.write(`
        <html>
        <head>
            <title>Fee Receipt</title>

            <style>
                body{
                    font-family:Arial;
                    padding:20px;
                }

                .header{
                    text-align:center;
                }

                img{
                    max-width:100px;
                    margin-bottom:10px;
                }

                table{
                    width:100%;
                    border-collapse:collapse;
                    margin-top:20px;
                }

                table,th,td{
                    border:1px solid black;
                }

                th,td{
                    padding:10px;
                    text-align:left;
                }
            </style>

            
        </head>

        <body>

        <div class="header">

<table style="width:100%; border:none;">
<tr>

<td style="border:none;">
    <h1>${coachingName}</h1>
    <p>${address}</p>
    <p>Owner: ${ownerName}</p>
    <p>Mobile: ${mobile}</p>
</td>

<td style="border:none; text-align:right;">
    ${logoData ? `<img src="${logoData}" width="180">` : ""}
</td>

</tr>
</table>

</div>
            <hr>

            <h2>Fee Receipt</h2>

            <table>

                <tr>
                    <th>Student Name</th>
                    <td>${name}</td>
                </tr>

                <tr>
                    <th>Course</th>
                    <td>${course}</td>
                </tr>

                <tr>
                    <th>Total Fees</th>
                    <td>${totalFees}</td>
                </tr>

                <tr>
                    <th>Paid Fees</th>
                    <td>${paidFees}</td>
                </tr>

                <tr>
                    <th>Due Fees</th>
                    <td>${dueFees}</td>
                </tr>

            </table>

            <br>

            <p>
                Receipt Date:
                ${new Date().toLocaleDateString()}
            </p>

        </body>
        </html>
    `);

    receiptWindow.document.close();
    receiptWindow.print();
}
window.onload = function () {

    let savedStudents =
        JSON.parse(localStorage.getItem("students")) || [];

    let table =
        document.getElementById("studentTable");

    savedStudents.forEach(student => {

        let row = table.insertRow();

        row.insertCell(0).innerText = student.name;
        row.insertCell(1).innerText = student.age;
        row.insertCell(2).innerText = student.course;
        row.insertCell(3).innerText = "₹" + student.totalFees;
        row.insertCell(4).innerText = "₹" + student.paidFees;
        row.insertCell(5).innerText = "₹" + student.dueFees;

        let actionCell = row.insertCell(6);

        actionCell.innerHTML = `
            <button onclick="printReceipt(this)">🧾 Receipt</button>
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        `;

        totalStudents++;
        totalFeesAmount += Number(student.totalFees);
        totalDueAmount += Number(student.dueFees);
    });

    document.getElementById("studentCount").innerText =
        totalStudents;

    document.getElementById("totalFeeAmount").innerText =
        "₹" + totalFeesAmount;

    document.getElementById("dueFeeAmount").innerText =
        "₹" + totalDueAmount;
};
window.addEventListener("load", function () {

    document.getElementById("coachingName").value =
        localStorage.getItem("coachingName") || "";

    document.getElementById("ownerName").value =
        localStorage.getItem("ownerName") || "";

    document.getElementById("mobile").value =
        localStorage.getItem("mobile") || "";

    document.getElementById("address").value =
        localStorage.getItem("address") || "";
});
let logoData = localStorage.getItem("logoData") || "";

if (logoData) {
    document.getElementById("logoPreview").src = logoData;
}
console.log("Firebase Connected");
console.log(window.db);
window.addEventListener("load", () => {
    console.log("DB =", window.db);
});