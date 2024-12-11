//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.querySelector('.add__btn');//first button
var incompleteTaskHolder=document.getElementById("incomplete__Tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed__tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");
    listItem.className = "task__elements";

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //Each elements, needs appending
    checkBox.type="checkbox";
    checkBox.className = "element__checkbox";
    
    
    //label
    var label=document.createElement("label");//label
    label.className = "element__label";
    label.innerText = taskString;
    //input (text)
    var editInput=document.createElement("input");//text
    editInput.type="text";
    editInput.className = "element__input";
    //button.edit
    var editButton=document.createElement("button");//edit button
    editButton.innerText="Edit";
    editButton.className="btn edit__btn";

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    deleteButton.className="btn delete__btn";

    var deleteButtonImg=document.createElement("img");//delete button image
    deleteButtonImg.src='./remove.svg';
    deleteButtonImg.alt = "remove";
    deleteButtonImg.className = "delete__img";
    deleteButton.appendChild(deleteButtonImg);



    

     //innerText encodes special characters, HTML does not.
    
    

    
    
    


    //and appending.
    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask = function () {
    if (!taskInput.value.trim()) return;

    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
};

//Edit an existing task.

var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".element__input");
    var label = listItem.querySelector(".element__label");
    var editButton = listItem.querySelector(".edit__btn");

    if (listItem.classList.contains("elements_edit-mode")) {
        label.innerText = editInput.value;
        editButton.innerText = "Edit";
    } else {
        editInput.value = label.innerText;
        editButton.innerText = "Save";
    }
    listItem.classList.toggle("elements_edit-mode");
};



//Delete task.
var deleteTask = function () {
    var listItem = this.parentNode;
    listItem.parentNode.removeChild(listItem);
};


//Mark task completed
var taskCompleted = function () {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
};


var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
};



var ajaxRequest=function(){
    console.log("AJAX Request");
}




var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector(".element__checkbox");
    var editButton = taskListItem.querySelector(".edit__btn");
    var deleteButton = taskListItem.querySelector(".delete__btn");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}


addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.