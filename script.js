// FRESH START (RUN ONCE)
if(!localStorage.getItem("initialized")){
 localStorage.clear();
 localStorage.setItem("initialized","yes");
}

// REGISTER
function registerUser(){
 let users = JSON.parse(localStorage.getItem("users")) || [];

 users.push({
  name:rname.value,
  email:remail.value,
  password:rpassword.value,
  role:rrole.value
 });

 localStorage.setItem("users",JSON.stringify(users));
 alert("Registered Successfully");
 location.href="login.html";
}

// LOGIN
function loginUser(){
 let users = JSON.parse(localStorage.getItem("users")) || [];
 let user = users.find(u=>u.email===lemail.value && u.password===lpassword.value);

 if(!user){
  alert("Invalid login");
  return;
 }

 localStorage.setItem("currentUser",JSON.stringify(user));
 user.role==="student" ? location.href="student.html" : location.href="faculty.html";
}

// STUDENT DASHBOARD
function studentDashboard(){
 let user = JSON.parse(localStorage.getItem("currentUser"));
 if(!user) location.href="login.html";

 let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
 let box = document.getElementById("studentData");
 box.innerHTML="";

 complaints.filter(c=>c.student===user.name).forEach(c=>{
  box.innerHTML+=`
   <div>
    <b>Complaint:</b> ${c.complaint}<br>
    <b>Status:</b> <span class="status-${c.status}">${c.status}</span><br>
    <b>Solution:</b> ${c.solution || "Pending"}
    <hr>
   </div>`;
 });
}

// SUBMIT
function submitComplaint(){
 let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
 let user = JSON.parse(localStorage.getItem("currentUser"));

 complaints.push({
  student:user.name,
  complaint:complaint.value,
  suggestion:suggestion.value,
  status:"Pending",
  solution:""
 });

 localStorage.setItem("complaints",JSON.stringify(complaints));
 location.href="thankyou.html";
}

// FACULTY
function facultyDashboard(){
 let complaints = JSON.parse(localStorage.getItem("complaints")) || [];
 let table = document.getElementById("facultyData");
 table.innerHTML="";

 complaints.forEach((c,i)=>{
  table.innerHTML+=`
   <tr>
    <td>${c.student}</td>
    <td>${c.complaint}</td>
    <td class="status-${c.status}">${c.status}</td>
    <td><button onclick="solve(${i})">Give Solution</button></td>
   </tr>`;
 });
}

function solve(i){
 let complaints = JSON.parse(localStorage.getItem("complaints"));
 let sol = prompt("Enter solution");

 if(sol){
  complaints[i].solution = sol;
  complaints[i].status = "Resolved";
  localStorage.setItem("complaints",JSON.stringify(complaints));
  location.reload();
 }
}

function logout(){
 localStorage.removeItem("currentUser");
}
