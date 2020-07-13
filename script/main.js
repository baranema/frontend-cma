(function(fn){var d=document;(d.readyState=='loading')?d.addEventListener('DOMContentLoaded',fn):fn();})(function(){
    myStorage = window.localStorage;

    var retrievedScores = [];

    if (!(localStorage.getItem("test_obj") === null)) {
        var retrievedScores = JSON.parse(localStorage.getItem("test_obj"));
        for (var i = 0; i < retrievedScores.length; i++) {
            document.getElementById("mytbody").insertRow(-1).innerHTML = "<tr><td>"+ retrievedScores[i].FirstName + "</td>" +
                                                                            "<td>" + retrievedScores[i].LastName + "</td>" +
                                                                            "<td>" + retrievedScores[i].Date + "</td>"+
                                                                            "<td>" + retrievedScores[i].Email + "</td>"+
                                                                            "<td>" + retrievedScores[i].Address + "</td>"+
                                                                        "</tr>";
        }
    } else {
        alert("The Local Storage is empty.");
    }

    document.getElementById("addnew").addEventListener("click", addnew);
    document.getElementById("all").addEventListener("click", all_contacts);
    document.getElementById("edit").addEventListener("click", edit);
    document.getElementById("deleteall").addEventListener("click", deleteall);

    function addnew() {
        document.getElementById("mytbody").insertRow(-1).innerHTML = '<tr>' +
                                                            '<td><input id="new_name" class="newinput" type="text" placeholder="First Name" required></td>' +
                                                            '<td><input id="new_lname" class="newinput" type="text" placeholder="Last Name" required></td>' +
                                                            '<td><input type="date" id="new_date" class="newinput" name="trip-start" placeholder="YYYY-MM-DD" required></td>' +
                                                            '<td><input id="new_email" class="newinput" type="email" placeholder="E-mail" required></td>' +
                                                            '<td><input id="new_address" class="newinput" type="text" placeholder="Address"></td>' +
                                                         '</tr';

        var node = document.createElement("div");
        node.innerHTML = '<input id="submit_button" type="button" name="submit" value="submit" form="submitForm"/>';
        node.classList.add("submitInput");

        var elements = document.getElementsByClassName('contacts_table');
        elements[0].appendChild(node);

        document.getElementById("addnew").disabled = true;
        document.getElementById("addnew").style.opacity = "0.6";
        document.getElementById("addnew").style.cursor = "default";

        document.getElementById("edit").disabled = true;
        document.getElementById("edit").style.opacity = "0.6";
        document.getElementById("edit").style.cursor = "default";

        var elmnt = document.getElementById("new_name");
        elmnt.scrollIntoView();
    }

    function edit() {
        var trs = document.getElementsByTagName("tr");

        for(var i = 0; i < trs.length; i++) {
            trs[i].style.cursor = "default";
            trs[i].classList.add("edit_row");
            var x = trs[i].insertCell(0);
            x.innerHTML = '<i class="fa fa-pencil-square editIcon" id="' + i + '" aria-hidden="true"></i><i class="fa fa-trash ' + i + '" id="deleteIcon" aria-hidden="true"></i>';
            x.classList.add("editcell");

            if (i != 0) {
                x.style.color = '#28262B';
                x.style.fontSize = "1.15em";
                x.style.width = "6%";
                document.getElementById(i).style.cursor = "pointer";
            } else {
                x.style.fontSize = "1.15em";
                x.style.width = "6%";
                x.style.color = "#336666";
                x.style.backgroundColor = "#336666";
            }   
        } 
        document.getElementById("addnew").disabled = true;
        document.getElementById("addnew").style.opacity = "0.6";
        document.getElementById("addnew").style.cursor = "default";

        document.getElementById("edit").disabled = true;
        document.getElementById("edit").style.opacity = "0.6";
        document.getElementById("edit").style.cursor = "default";
    }

    document.addEventListener('click', function(e){
        if(e.target && e.target.id == 'deleteIcon') {   
            var index = e.target.classList[2];
            retrievedScores.splice(index-1, 1);
            localStorage.clear();
            localStorage.setItem("test_obj", JSON.stringify(retrievedScores));

            document.getElementById("mytbody").deleteRow(index);

            document.getElementById("addnew").style.cursor = "pointer";
            document.getElementById("addnew").disabled = false;
            document.getElementById("addnew").style.opacity = "100%";

            document.getElementById("edit").style.cursor = "pointer";
            document.getElementById("edit").disabled = false;
            document.getElementById("edit").style.opacity = "100%";
        }
    });

    document.addEventListener('click', function(e){
        if(e.target && e.target.classList.contains('editIcon')) {   
            e.target.classList.remove("fa-pencil-square");  
            e.target.classList.remove("editIcon");
            e.target.classList.add("fa-check-square");

            var trs = document.getElementsByTagName("tr");
            
            var tds = trs[e.target.id].getElementsByTagName("td");
            var td_name = tds[1].innerHTML;
            tds[1].innerHTML = '<input id="new_name" class="newinput" type="text" placeholder="'+ td_name + '">';

            var td_lastname = tds[2].innerHTML;
            tds[2].innerHTML = '<input id="new_lname" class="newinput" type="text" placeholder="'+ td_lastname + '">';
            
            var td_date = tds[3].innerHTML;
            tds[3].innerHTML = '<input id="new_date" class="newinput" type="text" placeholder="'+ td_date + '">';

            var td_email = tds[4].innerHTML;
            tds[4].innerHTML = '<input id="new_email" class="newinput" type="text" placeholder="'+ td_email + '">';

            var td_address = tds[5].innerHTML;
            tds[5].innerHTML = '<input id="new_address" class="newinput" type="text" placeholder="'+ td_address + '">';
            
            first = 1;
            e.target.classList.add("save_btn");
        }
    });

    function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

    function isDate(value) {
        var dateFormat;
        if (toString.call(value) === '[object Date]') {
            return true;
        }
        if (typeof value.replace === 'function') {
            value.replace(/^\s+|\s+$/gm, '');
        }
        dateFormat = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
        return dateFormat.test(value);
    }

    function ifValid(name, lname, date, email, address) {;
        var checkIfValid = 1;

        if ((/[^a-zA-Z]/.test(name.value) || name.value.length == 0)) {
            name.style.border= "1px solid firebrick";
            checkIfValid = 0;
        } else {
            name.style.border= "none";
            name.style.borderBottom = "1px solid rgb(221, 221, 221)";
        }
        if ((/[^a-zA-Z]/.test(lname.value) || lname.value.length == 0)) {
            lname.style.border= "1px solid firebrick";
            checkIfValid = 0;
        } else {
            lname.style.border= "none";
            lname.style.borderBottom = "1px solid rgb(221, 221, 221)";
        }
        if (isDate(date.value)) {
            date.style.border= "none";
            date.style.borderBottom = "1px solid rgb(221, 221, 221)";
        } else {
            date.style.border= "1px solid firebrick";
            checkIfValid = 0;
        }
        if (!validateEmail(email.value)) {
            email.style.border= "1px solid firebrick";
            checkIfValid = 0;
        } else {
            email.style.border= "none";
            email.style.borderBottom = "1px solid rgb(221, 221, 221)";
        }
        return checkIfValid;
    }

    document.addEventListener('click', function(e){
        if(e.target && e.target.id== 'submit_button') {   
            var name = document.getElementById("new_name");
            var lname = document.getElementById("new_lname");
            var date = document.getElementById("new_date");
            var email = document.getElementById("new_email");
            var address = document.getElementById("new_address");

            var checkIfValid = ifValid(name, lname, date, email, address);

            if (checkIfValid == 1) {
                var contact = JSON.parse( '{ "FirstName": "'+ name.value +'","LastName": "'+ lname.value +'", "Date": "'+ date.value +'", "Email": "'+ email.value +'", "Address": "'+ address.value +'"}' ); 
                
                localStorage.clear();
                retrievedScores.push(contact);
                localStorage.setItem("test_obj", JSON.stringify(retrievedScores));
                document.getElementById("mytbody").deleteRow(-1);

                document.getElementById("mytbody").insertRow(-1).innerHTML = "<tr><td>" + retrievedScores[retrievedScores.length-1].FirstName + "</td>" +
                                                                                  "<td>" + retrievedScores[retrievedScores.length-1].LastName + "</td>" +
                                                                                  "<td>" + retrievedScores[retrievedScores.length-1].Date + "</td>"+
                                                                                  "<td>" + retrievedScores[retrievedScores.length-1].Email + "</td>"+
                                                                                  "<td>" + retrievedScores[retrievedScores.length-1].Address + "</td>"+
                                                                              "</tr>";
                document.getElementById("submit_button").remove();
                
                document.getElementById("addnew").style.cursor = "pointer";
                document.getElementById("addnew").disabled = false;
                document.getElementById("addnew").style.opacity = "100%";

                document.getElementById("edit").style.cursor = "pointer";
                document.getElementById("edit").disabled = false;
                document.getElementById("edit").style.opacity = "100%";
            }
         }
     });

    document.addEventListener('click', function(e){
        if(e.target && e.target.classList.contains('save_btn') && !e.target.classList.contains('editIcon')) {   
            var name = document.getElementById("new_name");
            var lname = document.getElementById("new_lname");
            var date = document.getElementById("new_date");
            var email = document.getElementById("new_email");
            var address = document.getElementById("new_address");

            var checkIfValid = ifValid(name, lname, date, email, address);
            if (checkIfValid == 1) {
                var contact = JSON.parse( '{ "FirstName": "'+ name.value +'","LastName": "'+ lname.value +'", "Date": "'+ date.value +'", "Email": "'+ email.value +'", "Address": "'+ address.value +'"}' ); 
                
                localStorage.clear();
                retrievedScores[e.target.id-1] = contact;
                localStorage.setItem("test_obj", JSON.stringify(retrievedScores));

                document.getElementById("mytbody").deleteRow(e.target.id-1);
                document.getElementById("mytbody").insertRow(e.target.id-1).innerHTML = "<tr><td></td><td>" + retrievedScores[e.target.id-1].FirstName + "</td>" +
                                                                                  "<td>" + retrievedScores[e.target.id-1].LastName + "</td>" +
                                                                                  "<td>" + retrievedScores[e.target.id-1].Date + "</td>"+
                                                                                  "<td>" + retrievedScores[e.target.id-1].Email + "</td>"+
                                                                                  "<td>" + retrievedScores[e.target.id-1].Address + "</td>"+
                                                                              "</tr>";
                document.getElementById("save_btn").remove();

                document.getElementById("addnew").style.cursor = "pointer";
                document.getElementById("addnew").disabled = false;
                document.getElementById("addnew").style.opacity = "100%";

                document.getElementById("edit").style.cursor = "pointer";
                document.getElementById("edit").disabled = false;
                document.getElementById("edit").style.opacity = "100%";
            }
         }
     });

     function all_contacts() {
        location.reload();

        document.getElementById("addnew").style.cursor = "pointer";
        document.getElementById("addnew").disabled = false;
        document.getElementById("addnew").style.opacity = "100%";

        document.getElementById("edit").style.cursor = "pointer";
        document.getElementById("edit").disabled = false;
        document.getElementById("edit").style.opacity = "100%";
     }

     function deleteall() {
        localStorage.clear();
        location.reload();
        alert("All data has been deleted.");
     }
}); 