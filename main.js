let data = [
    {id: 1, task: "take the dog", priority: "medium", status: "todo", deadline: "2022-10-01"},
    {id: 2, task: "take the cat", priority: "low", status: "doing", deadline: "2022-10-05"},
    {id: 3, task: "take the cow", priority: "high", status: "done", deadline: "2022-10-10"},

]

const table = document.querySelector("table")

const date = new Date();
let day = date.getDate()
day = day < 10 ? `0${day}` : day
let month = date.getMonth() + 1
month = month < 10 ? `0${month}` : month
const year = date.getFullYear()
const today = +[year, month, day].join("")


function show(arr) {
    arr.forEach(item => {
        const tr = document.querySelector(".todo").cloneNode(true)
        tr.classList.replace("todo", "tasks")
        const priority = tr.querySelector(".priority").querySelector("span")
        const status = tr.querySelector(".status").querySelector("span")
        const deadline = tr.querySelector(".deadline").querySelector("span");
        const preview = tr.querySelector(".bi-eye-fill");
        preview.setAttribute("id", `${item.id}`)
        const del = tr.querySelector(".bi-trash-fill");
        del.setAttribute("id", `${item.id}`)
        const edit = tr.querySelector(".bi-pencil-fill");
        edit.setAttribute("id", `${item.id}`)
        tr.querySelector(".task").innerHTML = `${item.task}`
        priority.innerHTML = `${item.priority}`;
        status.innerHTML = `${item.status}`;
        deadline.innerHTML = `${item.deadline}`;

        switch (item.priority) {
            case "high":
                priority.classList.add("badge--high")
                break;
            case "medium":
                priority.classList.add("badge--medium")
                break;
            case "low":
                priority.classList.add("badge--low")
                break;
        }
        switch (item.status) {
            case "todo":
                status.classList.add("badge--todo")
                break;
            case "doing":
                status.classList.add("badge--doing")
                break;
            case "done":
                status.classList.add("badge--done")
                break;
        }

        if (+item.deadline.split("-").join("") < today) {
            deadline.classList.add("badge--overdue")
            item.ds = "overdue"
        }
        if (+item.deadline.split("-").join("") === today) {
            deadline.classList.add("badge--today")
            item.ds = "today"
        }
        if (+item.deadline.split("-").join("") > today) {
            deadline.classList.add("badge--future")
            item.ds = "future"
        }
        table.append(tr)
    });


}

function preview(event) {
    document.querySelector(".modalPreview").style.display = "flex";
    document.querySelector("#close").addEventListener("click", () => document.querySelector(".modalPreview").style.display = "none");
    const findPreview = data.find(item => item.id === +event.target.id);
    document.querySelector("#taskNamePreview").value = findPreview.task;
    document.querySelector("#priorityPreview").value = findPreview.priority;
    document.querySelector("#statusPreview").value = findPreview.status;
    document.querySelector("#deadLinePreview").value = findPreview.deadline;
}

function del(event) {
    const newData = [...data]
    const filter = newData.filter(item => item.id !== +event.target.id);
    data = filter
    document.querySelectorAll(".tasks").forEach(item => item.remove());
    show(filter);
}

const save = event => {
    const newData = [...data];
    const findEdit = data.find(item => item.id === +event.target.id);
    document.querySelector("#taskNameEdit").value = findEdit.task;
    document.querySelector("#priorityEdit").value = findEdit.priority;
    document.querySelector("#statusEdit").value = findEdit.status;
    document.querySelector("#deadLineEdit").value = findEdit.deadline;
    document.querySelector("#save").addEventListener("click", () => {
        document.querySelector(".modalEdit").style.display = "none"
        const index = newData.findIndex(item => item.id === +event.target.id)
        newData[index] = {
            id: +event.target.id,
            task: document.querySelector("#taskNameEdit").value,
            priority: document.querySelector("#priorityEdit").value,
            status: document.querySelector("#statusEdit").value,
            deadline: document.querySelector("#deadLineEdit").value
        }
        data = newData;
        console.log(data)
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        show(data)

    })


}

function edit(event) {
    document.querySelector(".modalEdit").style.display = "flex";
    save(event)
}

function add() {
    document.querySelector(".modalAdd").style.display = "flex"
    document.querySelector("#saveAdd").addEventListener("click", () => {
        document.querySelector(".modalAdd").style.display = "none"
        const addData = {
            id: Math.floor(Math.random() * (1000 - 10) + 10),
            task: document.querySelector("#taskNameAdd").value,
            priority: document.querySelector("#priorityAdd").value,
            status: document.querySelector("#statusAdd").value,
            deadline: document.querySelector("#deadLineAdd").value
        }
        data.push(addData)
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        show(data)
    })
}

function filter() {
    document.querySelector(".filter").style.display = "block";
    document.querySelector(".filter").style.right = "0";
    document.querySelector("#closeFilter").addEventListener("click", () => {
        const priorityFilter = document.querySelector("#priorityFilter").value;
        console.log(priorityFilter)
        const statusFilter = document.querySelector("#statusFilter").value;
        const deadlineFilter = document.querySelector("#deadlineFilter").value;
        const filter = data.filter(item => (priorityFilter ? item.priority === priorityFilter : true) && (statusFilter ? item.status === statusFilter : true) && (deadlineFilter ? item.ds === deadlineFilter : true));
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        show(filter)
        document.querySelector(".filter").style.right = "-20rem";
        document.querySelector(".filter").style.display = "none";
    })
}

function search(event) {
    if (event.target.value) {
        const searchData = [...data];
        const filterSearch = searchData.filter(item => item.task.toLowerCase().search(event.target.value.toLowerCase()) >=0 );

        document.querySelectorAll(".tasks").forEach(item => item.remove());
        show(filterSearch);
    } else {
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        show(data);
    }

}

show(data)