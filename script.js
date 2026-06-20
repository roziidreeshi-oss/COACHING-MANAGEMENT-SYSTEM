
let students = JSON.parse(localStorage.getItem("students")) || [];

let totalStudents = 0;
let totalFeesAmount = 0;
let totalDueAmount = 0;

function showForm() {
    document.getElementById("studentForm").style.display = "block";
}

function showSetup() {
    document.getElementById("setupForm").style.display = "block";
}

function saveSetup() {

    localStorage.setItem(
        "coachingName",
        document.getElementById("coachingName").value
    );

    localStorage.setItem(
        "ownerName",
        document.getElementById("ownerName").value
    );

    localStorage.setItem(
        "mobile",
        document.getElementById("mobile").value
    );

    localStorage.setItem(
        "address",
        document.getElementById("address").value
    );

    let file =
        document.getElementById("logoFile").files[0];

    if (file) {

        let reader = new FileReader();

        reader.onload = function (e) {

            localStorage.setItem(
                "logoData",
                e.target.result
            );

            document.getElementById("logoPreview").src =
                e.target.result;

            alert("Setup Saved Successfully");
        };

        reader.readAsDataURL(file);

    } else {

        alert("Setup Saved Successfully");
    }
}

function addStudent() {

    let name =
        document.getElementById("name").value;

    let age =
        document.getElementById("age").value;

    let course =
        document.getElementById("course").value;

    let totalFees =
        Number(document.getElementById("totalFees").value);

    let paidFees =
        Number(document.getElementById("paidFees").value);

    let dueFees =
        totalFees - paidFees;

    let student = {
        name,
        age,
        course,
        totalFees,
        paidFees,
        dueFees
    };

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    loadStudents();

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
    document.getElementById("totalFees").value = "";
    document.getElementById("paidFees").value = "";
}

function loadStudents() {

    let table =
        document.getElementById("studentTable");

    table.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>Course</th>
        <th>Total Fees</th>
        <th>Paid Fees</th>
        <th>Due Fees</th>
        <th>Action</th>
    </tr>
    `;

    totalStudents = 0;
    totalFeesAmount = 0;
    totalDueAmount = 0;

    students.forEach((student, index) => {

        let row = table.insertRow();

        row.insertCell(0).innerText =
            student.name;

        row.insertCell(1).innerText =
            student.age;

        row.insertCell(2).innerText =
            student.course;

        row.insertCell(3).innerText =
            "₹" + student.totalFees;

        row.insertCell(4).innerText =
            "₹" + student.paidFees;

        row.insertCell(5).innerText =
            "₹" + student.dueFees;

        let actionCell =
            row.insertCell(6);

        actionCell.innerHTML = `
        <button onclick="printReceipt(${index})">🧾</button>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
        `;

        totalStudents++;

        totalFeesAmount +=
            Number(student.totalFees);

        totalDueAmount +=
            Number(student.dueFees);
    });

    document.getElementById("studentCount").innerText =
        totalStudents;

    document.getElementById("totalFeeAmount").innerText =
        "₹" + totalFeesAmount;

    document.getElementById("dueFeeAmount").innerText =
        "₹" + totalDueAmount;
}

function deleteStudent(index) {

    if (confirm("Delete Student?")) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        loadStudents();
    }
}

function editStudent(index) {

    let student =
        students[index];

    document.getElementById("name").value =
        student.name;

    document.getElementById("age").value =
        student.age;

    document.getElementById("course").value =
        student.course;

    document.getElementById("totalFees").value =
        student.totalFees;

    document.getElementById("paidFees").value =
        student.paidFees;

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    loadStudents();

    showForm();
}

function searchStudent() {

    let search =
        prompt("Enter Student Name");

    if (!search) return;

    let found =
        students.find(student =>
            student.name.toLowerCase() ===
            search.toLowerCase()
        );

    if (found) {
        alert("Student Found");
    } else {
        alert("Student Not Found");
    }
}

function showRecords() {

    let table =
        document.getElementById("studentTable");

    if (table.style.display === "none") {
        table.style.display = "table";
    } else {
        table.style.display = "none";
    }
}

function printReceipt(index) {

    let student =
        students[index];

    let coachingName =
        localStorage.getItem("coachingName") ||
        "My Coaching";

    let ownerName =
        localStorage.getItem("ownerName") || "";

    let mobile =
        localStorage.getItem("mobile") || "";

    let address =
        localStorage.getItem("address") || "";

    let logoData =
        localStorage.getItem("logoData") || "";

    let w =
        window.open("", "", "width=800,height=700");

    w.document.write(`
    <html>
    <body style="font-family:Arial;padding:20px;">

    <table style="width:100%;">
    <tr>

    <td>
        <h1>${coachingName}</h1>
        <p>${address}</p>
        <p>${ownerName}</p>
        <p>${mobile}</p>
    </td>

    <td style="text-align:right;">
        ${logoData ? `<img src="${logoData}" width="180">` : ""}
    </td>

    </tr>
    </table>

    <hr>

    <h2>Fee Receipt</h2>

    <p><b>Name:</b> ${student.name}</p>
    <p><b>Course:</b> ${student.course}</p>
    <p><b>Total Fees:</b> ₹${student.totalFees}</p>
    <p><b>Paid Fees:</b> ₹${student.paidFees}</p>
    <p><b>Due Fees:</b> ₹${student.dueFees}</p>

    </body>
    </html>
    `);

    w.document.close();
    w.print();
}

window.onload = function () {

    loadStudents();

    document.getElementById("coachingName").value =
        localStorage.getItem("coachingName") || "";

    document.getElementById("ownerName").value =
        localStorage.getItem("ownerName") || "";

    document.getElementById("mobile").value =
        localStorage.getItem("mobile") || "";

    document.getElementById("address").value =
        localStorage.getItem("address") || "";

    let logo =
        localStorage.getItem("logoData");

    if (logo) {
        document.getElementById("logoPreview").src =
            logo;
    }
};