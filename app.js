  // validate form input before adding submiting data
  function validateForm(){
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    var position = document.getElementById("position").value;

    if(name == ""){
        alert("Name is required");
        return false;
    }

    if(address == ""){
        alert("Address is required");
        return false;
    }

    if(email == ""){
        alert("Email is required");
        return false;
    }
    if(!email.includes("@")){
        alert("Invalid email address");
        return false;
    }
    else if(position == ""){
        alert("position is required");
        return false;
    }
    return true;
}

//funcion to show data
function showData(){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    var html = "";

    peoplelist.forEach(function(element, index){
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.address + "</td>";
        html += "<td>" + element.email + "</td>";
        html += "<td>" + element.position + "</td>";
        html +='<td><button onclick="deleteData('+index+')"class="btn-danger" style="background: red;width: 70px; font-size: 20px; color: white; border-radius: 5px;border:1px solid white;">Delete</button><button onclick="updateData('+index+')"class="btn-warning" style="background: orange;width: 70px; color: white; font-size: 20px; border-radius: 5px; border:1px solid white;">Edit</button></td>';
        html += "<tr>";   
    });

    document.querySelector("#teamTable tbody").innerHTML = html;
}
// load All data when page loaded
document.onload = showData();

// function to add data
function AddData(){
    //if form is validate
    if(validateForm() == true){
        var name = document.getElementById("name").value;
        var address = document.getElementById("address").value;
        var email = document.getElementById("email").value;
        var position = document.getElementById("position").value;

        var peoplelist;
        if(localStorage.getItem("peoplelist") == null){
            peoplelist = [];
        }
        else{
            peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
        }
        
        peoplelist.push({
            name: name,
            address: address,
            email: email,
            position: position,
        });

        localStorage.setItem("peoplelist", JSON.stringify(peoplelist));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
        document.getElementById("position").value = "";
    }
}

// function to delete Data from local storage
function deleteData(index){
    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }

    peoplelist.splice(index, 1);
    localStorage.setItem("peoplelist", JSON.stringify(peoplelist));

    showData();
}

// Function to update data/edit from localstorage
function updateData(index){
    //submit button will be hide and update button will show for opdating data of local storage
    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "block";

    var peoplelist;
    if(localStorage.getItem("peoplelist") == null){
        peoplelist = [];
    }
    else{
        peoplelist = JSON.parse(localStorage.getItem("peoplelist"));
    }
    document.getElementById("name").value = peoplelist[index].name;
    document.getElementById("address").value = peoplelist[index].address;
    document.getElementById("email").value = peoplelist[index].email;
    document.getElementById("position").value = peoplelist[index].position;

    document.querySelector("#update").onclick = function(){
        if(validateForm() == true){
        peoplelist[index].name = document.getElementById("name").value;
        peoplelist[index].address = document.getElementById("address").value;
        peoplelist[index].email = document.getElementById("email").value;
        peoplelist[index].position = document.getElementById("position").value;

        localStorage.setItem("peoplelist", JSON.stringify(peoplelist));

        showData();

        document.getElementById("name").value = "";
        document.getElementById("address").value = "";
        document.getElementById("email").value = "";
        document.getElementById("position").value = "";

        // updat button will be hide and add button will be show
        document.getElementById("submit").style.display = "block";
        document.getElementById("update").style.display = "none";
        }
    }
    
}