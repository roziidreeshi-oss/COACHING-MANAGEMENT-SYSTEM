
//==============================
// R S COMPUTER COACHING
// MANAGEMENT SYSTEM
//==============================

// Local Storage Data

let students = JSON.parse(localStorage.getItem("students")) || [];

let courses = JSON.parse(localStorage.getItem("courses")) || [];

let feesRecords = JSON.parse(localStorage.getItem("feesRecords")) || [];


//==============================
// PAGE LOAD
//==============================

window.onload = function () {

    loadSetup();

    loadCourses();

    loadCourseTable();

    loadStudents();

    loadFeesRecords();

    loadDashboard();

};


//==============================
// POPUP FUNCTIONS
//==============================

function showSetup() {

    document.getElementById("setupForm").style.display = "block";

}

function closeSetup() {

    document.getElementById("setupForm").style.display = "none";

}

function showForm() {

    document.getElementById("studentForm").style.display = "block";

}

function closeStudentForm() {

    document.getElementById("studentForm").style.display = "none";

}

function showFeesForm() {

    document.getElementById("feesForm").style.display = "block";

    loadStudentDropdown();

}

function closeFeesForm() {

    document.getElementById("feesForm").style.display = "none";

}


//==============================
// SAVE COACHING DETAILS
//==============================

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
                "logo",
                e.target.result
            );

            document.getElementById("logoPreview").src =
                e.target.result;

        }

        reader.readAsDataURL(file);

    }

    document.getElementById("coachingTitle").innerText =
        document.getElementById("coachingName").value;

    alert("Setup Saved");

}


//==============================
// LOAD SETUP
//==============================

function loadSetup() {

    document.getElementById("coachingName").value =
        localStorage.getItem("coachingName") || "";

    document.getElementById("ownerName").value =
        localStorage.getItem("ownerName") || "";

    document.getElementById("mobile").value =
        localStorage.getItem("mobile") || "";

    document.getElementById("address").value =
        localStorage.getItem("address") || "";

    document.getElementById("coachingTitle").innerText =
        localStorage.getItem("coachingName") ||
        "R S Computer Coaching";

    let logo = localStorage.getItem("logo");

    if (logo) {

        document.getElementById("logoPreview").src = logo;

    }

}
//=====================================
// COURSE MANAGEMENT
//=====================================

function saveCourse() {

    let courseName = document.getElementById("courseName").value.trim();
    let courseFees = Number(document.getElementById("courseFees").value);

    if (courseName === "" || courseFees <= 0) {
        alert("Please enter Course Name and Fees.");
        return;
    }

    courses.push({
        name: courseName,
        fees: courseFees
    });

    localStorage.setItem("courses", JSON.stringify(courses));

    document.getElementById("courseName").value = "";
    document.getElementById("courseFees").value = "";

    loadCourseTable();
    loadCourses();

    alert("Course Saved Successfully");
}


//=====================================
// LOAD COURSE TABLE
//=====================================

function loadCourseTable() {

    let table = document.getElementById("courseTable");

    table.innerHTML = `
    <tr>
        <th>Course</th>
        <th>Fees</th>
        <th>Action</th>
    </tr>
    `;

    courses.forEach((course, index) => {

        let row = table.insertRow();

        row.insertCell(0).innerText = course.name;
        row.insertCell(1).innerText = "₹" + course.fees;

        row.insertCell(2).innerHTML = `
        <button class="action-btn edit-btn"
        onclick="editCourse(${index})">
        ✏️
        </button>

        <button class="action-btn delete-btn"
        onclick="deleteCourse(${index})">
        🗑️
        </button>
        `;

    });

}


//=====================================
// LOAD COURSE DROPDOWN
//=====================================

function loadCourses() {

    let select = document.getElementById("course");

    if (!select) return;

    select.innerHTML =
    '<option value="">Select Course</option>';

    courses.forEach(course => {

        select.innerHTML +=
        `<option value="${course.name}">
        ${course.name}
        </option>`;

    });

}


//=====================================
// EDIT COURSE
//=====================================

function editCourse(index) {

    document.getElementById("courseName").value =
    courses[index].name;

    document.getElementById("courseFees").value =
    courses[index].fees;

    courses.splice(index,1);

    localStorage.setItem(
    "courses",
    JSON.stringify(courses));

    loadCourseTable();

}


//=====================================
// DELETE COURSE
//=====================================

function deleteCourse(index){

    if(confirm("Delete this course?")){

        courses.splice(index,1);

        localStorage.setItem(
        "courses",
        JSON.stringify(courses));

        loadCourseTable();

        loadCourses();

    }

}
//=====================================
// STUDENT MANAGEMENT
//=====================================

// Admission Number Generate
function generateAdmissionNo() {

    return "RS" + String(students.length + 1).padStart(4, "0");

}

// Add Student
function addStudent() {

    let name = document.getElementById("name").value.trim();
    let fatherName = document.getElementById("fatherName").value.trim();
    let dob = document.getElementById("dob").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;
    let mobile = document.getElementById("mobileNo").value.trim();
    let address = document.getElementById("studentAddress").value.trim();

    if (
        name == "" ||
        fatherName == "" ||
        dob == "" ||
        age == "" ||
        course == "" ||
        mobile == ""
    ) {
        alert("Please fill all fields.");
        return;
    }

    // Find Course Fees
    let selectedCourse = courses.find(c => c.name === course);

    let totalFees = selectedCourse ? selectedCourse.fees : 0;

    students.push({

        admissionNo: generateAdmissionNo(),

        name,

        fatherName,

        dob,

        age,

        course,

        mobile,

        address,

        admissionDate: new Date().toLocaleDateString(),

        totalFees: totalFees,

        paidFees: 0,

        dueFees: totalFees

    });

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    loadStudents();

    loadStudentDropdown();

    loadDashboard();

    closeStudentForm();

    document.getElementById("name").value="";
document.getElementById("fatherName").value="";
document.getElementById("dob").value="";
document.getElementById("age").value="";
document.getElementById("course").selectedIndex=0;
document.getElementById("mobileNo").value="";
document.getElementById("studentAddress").value="";

    alert("Student Added Successfully");

}



//=====================================
// LOAD STUDENTS
//=====================================

function loadStudents() {

    let tbody =
        document.querySelector("#studentTable tbody");

    tbody.innerHTML = "";

    students.forEach((student, index) => {

        let row = tbody.insertRow();

        row.innerHTML = `

<td>${student.admissionNo}</td>

<td>${student.name}</td>

<td>${student.fatherName}</td>

<td>${student.course}</td>

<td>${student.mobile}</td>

<td>${student.admissionDate}</td>

<td>

<span style="color:
${student.dueFees==0?'green':'red'}">

${student.dueFees==0?'Paid':'Due'}

</span>

</td>

<td>

<button class="action-btn receipt-btn"
onclick="printReceipt(${index})">

🧾

</button>

<button class="action-btn edit-btn"
onclick="editStudent(${index})">

✏️

</button>

<button class="action-btn delete-btn"
onclick="deleteStudent(${index})">

🗑️

</button>

</td>

`;

    });

}
//=====================================
// LOAD STUDENT DROPDOWN
//=====================================

function loadStudentDropdown(){

    let select=document.getElementById("studentSelect");

    if(!select) return;

    select.innerHTML="<option value=''>Select Student</option>";

    students.forEach((student,index)=>{

        select.innerHTML+=`
        <option value="${index}">
        ${student.admissionNo} - ${student.name}
        </option>
        `;

    });

}



//=====================================
// EDIT STUDENT
//=====================================

function editStudent(index){

    let s=students[index];

    document.getElementById("name").value=s.name;

    document.getElementById("fatherName").value=s.fatherName;

    document.getElementById("dob").value=s.dob;

    document.getElementById("age").value=s.age;

    document.getElementById("course").value=s.course;

    document.getElementById("mobileNo").value=s.mobile;

    document.getElementById("studentAddress").value=s.address;

    students.splice(index,1);

    localStorage.setItem(
    "students",
    JSON.stringify(students));

    loadStudents();

    showForm();

}



//=====================================
// DELETE STUDENT
//=====================================

function deleteStudent(index){

    if(confirm("Delete Student ?")){

        students.splice(index,1);

        localStorage.setItem(
        "students",
        JSON.stringify(students));

        loadStudents();

        loadDashboard();

    }

}



//=====================================
// SEARCH
//=====================================

function liveSearch(){

    let input=document
    .getElementById("searchBox")
    .value
    .toLowerCase();

    let rows=document
    .querySelectorAll("#studentTable tbody tr");

    rows.forEach(row=>{

        row.style.display=
        row.innerText.toLowerCase().includes(input)
        ?"":"none";

    });

}



//=====================================
// DASHBOARD
//=====================================

function loadDashboard(){

    document.getElementById("studentCount").innerText=
    students.length;

    let total=0;

    let due=0;

    students.forEach(s=>{

        total+=Number(s.paidFees);

        due+=Number(s.dueFees);

    });

    document.getElementById("totalFeeAmount").innerText=
    "₹"+total;

    document.getElementById("dueFeeAmount").innerText=
    "₹"+due;

    document.getElementById("todayCollection").innerText=
    "₹0";

}
//=====================================
// RECEIPT NUMBER
//=====================================

function generateReceiptNo(){

    return "REC"+String(feesRecords.length+1).padStart(4,"0");

}



//=====================================
// SAVE FEES
//=====================================

function saveFees(){

    let studentIndex=document.getElementById("studentSelect").value;

    let month=document.getElementById("feesMonth").value;

    let paid=parseFloat(document.getElementById("paidFees").value);

    if(studentIndex=="" || month=="" || isNaN(paid)){

        alert("Please fill all fields.");

        return;

    }

    let student=students[studentIndex];

    student.paidFees+=paid;

    student.dueFees=student.totalFees-student.paidFees;

    feesRecords.push({

        receiptNo:generateReceiptNo(),

        admissionNo:student.admissionNo,

        name:student.name,

        course:student.course,

        month:month,

        totalFees:student.totalFees,

        paidFees:paid,

        dueFees:student.dueFees,

        date:new Date().toLocaleDateString()

    });

    localStorage.setItem("students",JSON.stringify(students));

    localStorage.setItem("feesRecords",JSON.stringify(feesRecords));

    loadFeesRecords();

    loadDashboard();

    alert("Fees Saved Successfully");

}
//=====================================
// LOAD FEES RECORDS
//=====================================

function loadFeesRecords(){

    let tbody=document.querySelector("#feesTable tbody");

    if(!tbody) return;

    tbody.innerHTML="";

    feesRecords.forEach((fee,index)=>{

        let row=tbody.insertRow();

        row.innerHTML=`

<td>${fee.receiptNo}</td>

<td>${fee.name}</td>

<td>${fee.course}</td>

<td>${fee.month}</td>

<td>₹${fee.totalFees}</td>

<td>₹${fee.paidFees}</td>

<td>₹${fee.dueFees}</td>

<td>${fee.date}</td>

<td>

<button class="action-btn receipt-btn"
onclick="printReceipt(${index})">

🧾

</button>

<button class="action-btn edit-btn"
onclick="editFees(${index})">

✏️

</button>

<button class="action-btn delete-btn"
onclick="deleteFees(${index})">

🗑️

</button>

</td>

`;

    });

}
//=====================================
// LOAD FEES RECORDS
//=====================================

function loadFeesRecords(){

    let tbody=document.querySelector("#feesTable tbody");

    if(!tbody) return;

    tbody.innerHTML="";

    feesRecords.forEach((fee,index)=>{

        let row=tbody.insertRow();

        row.innerHTML=`

<td>${fee.receiptNo}</td>

<td>${fee.name}</td>

<td>${fee.course}</td>

<td>${fee.month}</td>

<td>₹${fee.totalFees}</td>

<td>₹${fee.paidFees}</td>

<td>₹${fee.dueFees}</td>

<td>${fee.date}</td>

<td>

<button class="action-btn receipt-btn"
onclick="printReceipt(${index})">

🧾

</button>

<button class="action-btn edit-btn"
onclick="editFees(${index})">

✏️

</button>

<button class="action-btn delete-btn"
onclick="deleteFees(${index})">

🗑️

</button>

</td>

`;

    });

}
//=====================================
// PRINT RECEIPT
//=====================================

function printReceipt(index){

    let fee = feesRecords[index];

    let coachingName =
    localStorage.getItem("coachingName") || "R S Computer Coaching";

    let address =
    localStorage.getItem("address") || "";

    let mobile =
    localStorage.getItem("mobile") || "";

    let logo =
    localStorage.getItem("logo") || "";

    let win = window.open("","","width=900,height=700");

    win.document.write(`

<html>

<head>

<title>Receipt</title>

<style>

body{

font-family:Arial;

padding:30px;

}

table{

width:100%;

border-collapse:collapse;

margin-top:20px;

}

th,td{

border:1px solid #000;

padding:10px;

text-align:left;

}

h1{

color:#004aad;

}

</style>

</head>

<body>

<center>

<img src="${logo}" width="90"><br>

<h1>${coachingName}</h1>

<p>${address}</p>

<p>${mobile}</p>

<hr>

<h2>FEE RECEIPT</h2>

</center>

<table>

<tr>

<th>Receipt No</th>

<td>${fee.receiptNo}</td>

</tr>

<tr>

<th>Student</th>

<td>${fee.name}</td>

</tr>

<tr>

<th>Course</th>

<td>${fee.course}</td>

</tr>

<tr>

<th>Month</th>

<td>${fee.month}</td>

</tr>

<tr>

<th>Total Fees</th>

<td>₹${fee.totalFees}</td>

</tr>

<tr>

<th>Paid Fees</th>

<td>₹${fee.paidFees}</td>

</tr>

<tr>

<th>Due Fees</th>

<td>₹${fee.dueFees}</td>

</tr>

<tr>

<th>Date</th>

<td>${fee.date}</td>

</tr>

</table>

<br><br>

<div style="display:flex;justify-content:space-between;">

<span>Student Signature</span>

<span>Authorized Signature</span>

</div>

</body>

</html>

`);

    win.print();

}
//=====================================
// BACKUP DATA
//=====================================

function backupData(){

    let data={

        students,

        courses,

        feesRecords,

        coachingName:localStorage.getItem("coachingName"),

        ownerName:localStorage.getItem("ownerName"),

        mobile:localStorage.getItem("mobile"),

        address:localStorage.getItem("address"),

        logo:localStorage.getItem("logo")

    };

    let blob=new Blob([JSON.stringify(data,null,2)],{
        type:"application/json"
    });

    let a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download="RS_Coaching_Backup.json";

    a.click();

}



//=====================================
// RESTORE
//=====================================

function restoreData(){

    document.getElementById("restoreFile").click();

}

function restoreBackup(e){

    let file=e.target.files[0];

    if(!file) return;

    let reader=new FileReader();

    reader.onload=function(){

        let data=JSON.parse(reader.result);

        students=data.students||[];

        courses=data.courses||[];

        feesRecords=data.feesRecords||[];

        localStorage.setItem("students",JSON.stringify(students));

        localStorage.setItem("courses",JSON.stringify(courses));

        localStorage.setItem("feesRecords",JSON.stringify(feesRecords));

        localStorage.setItem("coachingName",data.coachingName||"");

        localStorage.setItem("ownerName",data.ownerName||"");

        localStorage.setItem("mobile",data.mobile||"");

        localStorage.setItem("address",data.address||"");

        localStorage.setItem("logo",data.logo||"");

        location.reload();

    }

    reader.readAsText(file);

}



//=====================================
// EXPORT STUDENTS CSV
//=====================================

function exportStudents(){

    let csv="Admission No,Name,Father,Course,Mobile,Total Fees,Paid,Due\n";

    students.forEach(s=>{

        csv+=`${s.admissionNo},${s.name},${s.fatherName},${s.course},${s.mobile},${s.totalFees},${s.paidFees},${s.dueFees}\n`;

    });

    downloadCSV(csv,"Students.csv");

}



//=====================================
// EXPORT FEES CSV
//=====================================

function exportFees(){

    let csv="Receipt,Student,Course,Month,Paid,Due,Date\n";

    feesRecords.forEach(f=>{

        csv+=`${f.receiptNo},${f.name},${f.course},${f.month},${f.paidFees},${f.dueFees},${f.date}\n`;

    });

    downloadCSV(csv,"Fees_Report.csv");

}



//=====================================
// DOWNLOAD CSV
//=====================================

function downloadCSV(csv,fileName){

    let blob=new Blob([csv],{
        type:"text/csv"
    });

    let a=document.createElement("a");

    a.href=URL.createObjectURL(blob);

    a.download=fileName;

    a.click();

}



//=====================================
// PRINT STUDENTS
//=====================================

function printAllStudents(){

    window.print();

}



//=====================================
// PRINT FEES REPORT
//=====================================

function printFeesReport(){

    document.getElementById("feesRecords").style.display="block";

    window.print();

}



//=====================================
// FILTER FEES MONTH
//=====================================

function filterFees(){

    let month=document.getElementById("filterMonth").value;

    let rows=document.querySelectorAll("#feesTable tbody tr");

    rows.forEach(row=>{

        row.style.display=row.innerText.includes(month)?"":"none";

    });

}
