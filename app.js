
// Initialize Firebase with your config
const firebaseConfig = {
    apiKey: "AIzaSyCVUvuX3RJkjyfNs6Jx8tgzgNVPCNAWhGA",
    authDomain: "task-management-3891e.firebaseapp.com",
    databaseURL: "https://task-management-3891e-default-rtdb.firebaseio.com",
    projectId: "task-management-3891e",
    storageBucket: "task-management-3891e.appspot.com",
    messagingSenderId: "193099414393",
    appId: "1:193099414393:web:037518b265367aae368da8",
    measurementId: "G-M4HW7B8ZME"
  };

const db =firebase.firestore();

//Function to add a task
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if(task !== ""){
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

//Function to render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
        <span> ${doc.data().task} </span>
        <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

//Realtime listener for tasks
db.collection("task")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (changes.type === "added") {
            renderTasks(change.doc);

        }
    });
  } );

  //Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete()
  }
