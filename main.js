const data = [
    {id: 1, task: "take the dog", priority: "medium", status: "todo", deadline: "2021-10-01"},
    {id: 2, task: "take the cat", priority: "low", status: "doing", deadline: "2021-10-01"},
    {id: 3, task: "take the cow", priority: "high", status: "done", deadline: "2021-10-01"},

]

const table = document.querySelector("table")

const date = new Date();
const day = date.getDay()
const month = date.getMonth() + 1
const year = date.getFullYear()
const today = +[year, month, day].join("")

function show(arr) {
    arr.forEach(item => {
        const tr = document.querySelector(".todo").cloneNode(true)
        tr.classList.replace("todo","task")
        const priority = tr.querySelector(".priority").querySelector("span")
        const status = tr.querySelector(".status").querySelector("span")
        const deadline = tr.querySelector(".deadline").querySelector("span");
        const preview = tr.querySelector(".bi-eye-fill");
        preview.setAttribute("id",`${item.id}`)
        const del = tr.querySelector(".bi-trash-fill");
        del.setAttribute("id",`${item.id}`)
        const edit = tr.querySelector(".bi-pencil-fill");
        edit.setAttribute("id",`${item.id}`)
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
        switch (item.deadline) {
            case "overdue":
                deadline.classList.add("badge--overdue")
                break;
            case "today":
                deadline.classList.add("badge--today")
                break;
            case "future":
                deadline.classList.add("badge--future")
                break;
        }
        table.append(tr)
    });


}

function preview(event){
    console.log(event.target.id)
}

show(data)