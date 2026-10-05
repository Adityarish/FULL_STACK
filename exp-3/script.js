showMessages();
 
function saveMessage(){
 
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let message=document.getElementById("message").value;
 
    if(name=="" || email=="" || message==""){
        alert("Please fill all fields");
        return;
    }
 
    let messages=JSON.parse(localStorage.getItem("messages")) || [];
 
    messages.push({
        name:name,
        email:email,
        message:message
    });
 
    localStorage.setItem("messages",JSON.stringify(messages));
 
    document.getElementById("status").innerHTML="Message Sent Successfully";
 
    document.getElementById("name").value="";
    document.getElementById("email").value="";
    document.getElementById("message").value="";
 
    showMessages();
}
 
function showMessages(){
 
    let messages=JSON.parse(localStorage.getItem("messages")) || [];
 
    let table=document.getElementById("table");
 
    table.innerHTML=`
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
        </tr>`;
 
    messages.forEach(function(item){
 
        table.innerHTML+=`
        <tr>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.message}</td>
        </tr>`;
 
    });
 
}