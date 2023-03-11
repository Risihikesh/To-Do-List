let tasks =[];
const tasksList = document.getElementById('list');
const addTaskInput= document.getElementById('add');
const tasksCounter= document.getElementById('tasks-counter');

 console.log('Working');


function addTaskToDOM (task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.done ? 'checked' : ''} class="custom-checkbox">
            <label for="${task.id}">${task.text}</label>
            <img src="bin.svg" class="delete" data-id="${task.id}" />
            
    `;

    tasksList.append(li);

 }

function renderList () {
    tasksList.innerHTML = ''; //whatever list will be empty

    for(let i=0; i< tasks.length; i++){
        addTaskToDOM(tasks[i]);
    }

    tasksCounter.innerHTML= tasks.length;

}

function toggleTask (taskId) {  //markTaskAsComplete
    const task = tasks.filter(function(task){
        return task.id === taskId 
    });

    if(task.length>0){
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification('TAsk toggled Successfully');
        return;
    }
    showNotification('could not toggle the task');

}

function deleteTask (taskId) {
    const newTasks = tasks.filter(function(task){
        return task.id !== taskId 
    });

    tasks= newTasks; 
    renderList();
    showNotification('Task deleted Successfully');
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task added succesfully');
        return;
    }
    showNotification('Task Can notbe added')
}


function showNotification(text) {
    alert(text);
}

// function to handle input by keydown event
function handleInputKeypress (e) {
     if(e.key=== 'Enter'){
        const text = e.target.value; 
    // console.log('text', text);

     if(!text){
        showNotification('Task Text cant be empty');
        return;
     }
     // now we will be create  task
    const task={
        text,
        id: Date.now().toString(), //we use date for id and then convert it into string
        done: false
    }

    e.target.value=" "; // for making task box empty
    addTask(task);
}
}

function handleClickListener(e){
    const target = e.target;
    if(target.className==='delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
        return;
    }
    else if (target.className === 'custom-checkbox'){
        const taskId = target.id;
        toggleTask(taskId);
        return;
    }
}


function initialiseApp (){
addTaskInput.addEventListener('keyup', handleInputKeypress); // add eventListener to the input box
document.addEventListener('click', handleClickListener);
}

initialiseApp();