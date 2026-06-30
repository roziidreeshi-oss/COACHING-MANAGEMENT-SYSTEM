
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
document.getElementById("setupForm").style.display = "none";
        alert("Setup Saved Successfully");
    }
}

function addStudent() {

    let name =
        document.getElementById("name").value;

         let fatherName =
    document.getElementById("fatherName").value;
    let dob =
    document.getElementById("dob").value;

    let age =
        document.getElementById("age").value;

    let course =
        document.getElementById("course").value;

   


let mobileNo =
    document.getElementById("mobileNo").value;

let studentAddress =
    document.getElementById("studentAddress").value;

 let studentTotalFees =
Number(document.getElementById("studentTotalFees").value);  

    let student = {
    name,
    fatherName,
    dob,
    age,
    mobileNo,
    studentAddress,
    course
};

    students.push(student);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    loadStudents();

    document.getElementById("name").value = "";
     document.getElementById("fatherName").value = "";
     document.getElementById("dob").value = "";
    document.getElementById("age").value = "";
    document.getElementById("course").value = "";
document.getElementById("mobileNo").value = "";
document.getElementById("studentAddress").value = "";
    document.getElementById("studentForm").style.display = "none";
}

function loadStudents() {

    let table =
        document.getElementById("studentTable");

   table.innerHTML = `
<tr>
    <th>Name</th>
    <th>Father Name</th>
    <th>DOB</th>
    <th>Age</th>
    <th>Course</th>
    <th>Mobile</th>
    <th>Action</th>
    <th>Address</th>
</tr>
`;

    totalStudents = 0;
    totalFeesAmount = 0;
    totalDueAmount = 0;

    students.forEach((student, index) => {

        let row = table.insertRow();


row.insertCell(0).innerText = student.name;
row.insertCell(1).innerText = student.fatherName;
row.insertCell(2).innerText = student.dob;
row.insertCell(3).innerText = student.age;
row.insertCell(4).innerText = student.course;
row.insertCell(5).innerText = student.mobileNo;
let actionCell = row.insertCell(6);

actionCell.innerHTML = `
<button onclick="printReceipt(${index})">🧾</button>
<button onclick="editStudent(${index})">Edit</button>
<button onclick="deleteStudent(${index})">Delete</button>
`;

row.insertCell(7).innerText = student.studentAddress;

        totalStudents++;

        
    });

    document.getElementById("studentCount").innerText =
        totalStudents;

   
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

    let student = students[index];

    let coachingName = localStorage.getItem("coachingName") || "My Coaching";
    let ownerName = localStorage.getItem("ownerName") || "";
    let mobile = localStorage.getItem("mobile") || "";
    let address = localStorage.getItem("address") || "";
    let logoData = localStorage.getItem("logoData") || "";

    let w = window.open("", "", "width=800,height=700");

    w.document.write(`
    <html>
    <style>
img{
    width:180px;
}

*{
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}
</style>
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

    <table style="width:100%;border-collapse:collapse;">
        <tr>
            <td style="border:1px solid black;padding:10px;"><b>Name</b></td>
            <td style="border:1px solid black;padding:10px;">${student.name}</td>
        </tr>

        <tr>
            <td style="border:1px solid black;padding:10px;"><b>Course</b></td>
            <td style="border:1px solid black;padding:10px;">${student.course}</td>
        </tr>

        <tr>
            <td style="border:1px solid black;padding:10px;"><b>Total Fees</b></td>
            <td style="border:1px solid black;padding:10px;">₹${student.totalFees}</td>
        </tr>

        <tr>
            <td style="border:1px solid black;padding:10px;"><b>Paid Fees</b></td>
            <td style="border:1px solid black;padding:10px;">₹${student.paidFees}</td>
        </tr>

        <tr>
            <td style="border:1px solid black;padding:10px;"><b>Due Fees</b></td>
            <td style="border:1px solid black;padding:10px;">₹${student.dueFees}</td>
        </tr>
    </table>
          <p><b>Date & Time:</b> ${new Date().toLocaleString()}</p>
    </body>
    </html>
    `);

    w.document.close();
    w.print();
}


window.onload = function () {

    loadStudents();
    loadDashboard();
    loadFeesRecords();
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
function showFeesForm() {

    document.getElementById("feesForm").style.display = "block";

    let select =
        document.getElementById("studentSelect");

    select.innerHTML = "";

    students.forEach((student, index) => {

        select.innerHTML +=
        `<option value="${index}">
            ${student.name}
        </option>`;
    });

    if(students.length > 0){
        document.getElementById("feesCourse").value =
            students[0].course;
    }
}

document.addEventListener("change", function(e){

    if(e.target.id === "studentSelect"){

        let index = e.target.value;

        document.getElementById("feesCourse").value =
            students[index].course;
    }
});

function saveFees() {

    let feesRecords =
        JSON.parse(localStorage.getItem("feesRecords")) || [];

    let index = Number(document.getElementById("studentSelect").value);

    let paidFees = Number(document.getElementById("paidFees").value);

    let student = students[index];

    let totalFees = Number(student.totalFees || 0);

    let dueFees = totalFees - paidFees;

    // Student data update
    student.paidFees = paidFees;
    student.dueFees = dueFees;

    localStorage.setItem("students", JSON.stringify(students));

    // Fees Record Save
    feesRecords.push({
        studentName: student.name,
        course: student.course,
        month: document.getElementById("feesMonth").value,
        totalFees: totalFees,
        paidFees: paidFees,
        dueFees: dueFees
    });

    localStorage.setItem("feesRecords", JSON.stringify(feesRecords));

    loadFeesRecords();
    loadDashboard();

    alert("Fees Saved");

    printReceipt(index);
}
function loadDashboard() {

    let feesRecords =
        JSON.parse(localStorage.getItem("feesRecords")) || [];

    console.log("Fees Records:", feesRecords);

    let totalFees = 0;
    let totalDue = 0;

    feesRecords.forEach(record => {

        totalFees += Number(record.paidFees || 0);

        totalDue += Number(record.dueFees || 0);
    });

    console.log("Total Fees =", totalFees);
    console.log("Total Due =", totalDue);

    document.getElementById("totalFeeAmount").innerText =
        "₹" + totalFees;

    document.getElementById("dueFeeAmount").innerText =
        "₹" + totalDue;

    document.getElementById("studentCount").innerText =
        students.length;
}
function loadStudentFees(index){

    let student = students[index];

    document.getElementById("feesCourse").value =
        student.course || "";

    document.getElementById("totalFees").value =
        student.totalFees || "";

    document.getElementById("paidFees").value =
        student.paidFees || "";
}
function loadFeesRecords() {

    let feesRecords =
        JSON.parse(localStorage.getItem("feesRecords")) || [];

    let table =
        document.getElementById("feesTable");

    table.innerHTML = `
<tr>
<th>Student Name</th>
<th>Course</th>
<th>Month</th>
<th>Total Fees</th>
<th>Paid Fees</th>
<th>Due Fees</th>
<th>Action</th>
</tr>`;

    feesRecords.forEach((record, index) => {

        let row = table.insertRow();

        row.insertCell(0).innerText = record.studentName;
        row.insertCell(1).innerText = record.course;
        row.insertCell(2).innerText = record.month;
        row.insertCell(3).innerText = "₹" + record.totalFees;
        row.insertCell(4).innerText = "₹" + record.paidFees;
        row.insertCell(5).innerText = "₹" + record.dueFees;

       
        row.insertCell(6).innerHTML = `
<button onclick="printFeesReceipt(${index})">🧾</button>
<button onclick="editFeesRecord(${index})">✏️</button>
<button onclick="deleteFeesRecord(${index})">🗑️</button>
`;
    });

}
function printFeesReceipt(index) {

    let feesRecords =
        JSON.parse(localStorage.getItem("feesRecords")) || [];

    let record = feesRecords[index];

    let coachingName = localStorage.getItem("coachingName") || "My Coaching";
    let ownerName = localStorage.getItem("ownerName") || "";
    let mobile = localStorage.getItem("mobile") || "";
    let address = localStorage.getItem("address") || "";
    let logoData = localStorage.getItem("logoData") || "";

    let w = window.open("", "", "width=800,height=700");

    w.document.write(`
    <html>
    <head>
    <style>

    body{
        font-family:Arial;
        padding:20px;
    }

    table{
        width:100%;
        border-collapse:collapse;
    }

    td{
        border:1px solid black;
        padding:10px;
    }

    img{
        width:120px;
    }

    *{
        -webkit-print-color-adjust:exact !important;
        print-color-adjust:exact !important;
    }

    </style>
    </head>

    <body>

    <table style="border:none;">
        <tr>
            <td style="border:none;">
                <h1>${coachingName}</h1>
                <p>${address}</p>
                <p>${ownerName}</p>
                <p>${mobile}</p>
            </td>

            <td style="border:none;text-align:right;">
                ${logoData ? `<img src="${logoData}">` : ""}
            </td>
        </tr>
    </table>

    <hr>

    <h2 style="text-align:center;">Fees Receipt</h2>

    <table>

        <tr>
            <td><b>Name</b></td>
            <td>${record.studentName}</td>
        </tr>

        <tr>
            <td><b>Course</b></td>
            <td>${record.course}</td>
        </tr>

        <tr>
            <td><b>Month</b></td>
            <td>${record.month}</td>
        </tr>

        <tr>
            <td><b>Total Fees</b></td>
            <td>₹${record.totalFees}</td>
        </tr>

        <tr>
            <td><b>Paid Fees</b></td>
            <td>₹${record.paidFees}</td>
        </tr>

        <tr>
            <td><b>Due Fees</b></td>
            <td>₹${record.dueFees}</td>
        </tr>

    </table>

    <br>

    <b>Date :</b> ${new Date().toLocaleString()}

    </body>
    </html>
    `);

    w.document.close();
    w.print();
}
function deleteFeesRecord(index){

    if(confirm("Delete Fees Record?")){

        let feesRecords =
        JSON.parse(localStorage.getItem("feesRecords")) || [];

        feesRecords.splice(index,1);

        localStorage.setItem(
            "feesRecords",
            JSON.stringify(feesRecords)
        );

        loadFeesRecords();
        loadDashboard();
    }

}
function editFeesRecord(index){

    let feesRecords =
    JSON.parse(localStorage.getItem("feesRecords")) || [];

    let record = feesRecords[index];

    document.getElementById("feesForm").style.display="block";

    let studentIndex = students.findIndex(
        s => s.name === record.studentName
    );

    document.getElementById("studentSelect").value = studentIndex;
    document.getElementById("feesMonth").value = record.month;
    document.getElementById("paidFees").value = record.paidFees;

    feesRecords.splice(index,1);

    localStorage.setItem(
        "feesRecords",
        JSON.stringify(feesRecords)
    );

    loadFeesRecords();
}