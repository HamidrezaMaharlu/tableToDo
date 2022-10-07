let data = [
    {id: 1, task: "have breakfast", priority: "high", status: "doing", deadline: "2022-10-01", ds: "overdue"},
    {id: 2, task: "call mom", priority: "high", status: "doing", deadline: "2022-10-05", ds: "overdue"},
    {id: 3, task: "do the dishes", priority: "high", status: "todo", deadline: "2022-10-10", ds: "future"},
    {id: 4, task: "take a nap", priority: "high", status: "todo", deadline: "2022-10-16", ds: "future"},
    {id: 5, task: "make the bed", priority: "low", status: "todo", deadline: "2022-10-02", ds: "overdue"},
    {id: 6, task: "watch game", priority: "low", status: "doing", deadline: "2022-10-03", ds: "overdue"},
    {id: 7, task: "go to the gym", priority: "low", status: "done", deadline: "2022-10-04", ds: "overdue"},
    {id: 8, task: "take a shower", priority: "medium", status: "done", deadline: "2022-10-05", ds: "overdue"},
    {id: 9, task: "take the dog", priority: "medium", status: "todo", deadline: "2022-10-07", ds: "today"},
    {id: 10, task: "go shopping", priority: "medium", status: "done", deadline: "2022-10-08", ds: "future"},

]
let pageSize = 5;
let pageNumber = 1;
let currentPage = 1;

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
    const filter = data.filter(item => item.id !== +event.target.id);
    data = filter;
    document.querySelectorAll(".tasks").forEach(item => item.remove());
    makePageNumber(data);
    const pagi = paginate(data, pageNumber, pageSize);
    show(pagi);
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
    document.querySelector("#saveAdd").addEventListener("click", (event) => {
        event.preventDefault()
        const addData = {
            id: Math.floor(Math.random() * (1000 - 10) + 10),
            task: `${document.querySelector("#taskNameAdd").value}`,
            priority: `${document.querySelector("#priorityAdd").value}`,
            status: `${document.querySelector("#statusAdd").value}`,
            deadline: `${document.querySelector("#deadLineAdd").value}`,
        }
        if (document.querySelector("#taskNameAdd").value) {
            data.push(addData);
            document.querySelectorAll(".tasks").forEach(item => item.remove());
            makePageNumber(data);
            const pagi = paginate(data, pageNumber, pageSize);
            show(pagi);
            document.querySelector(".modalAdd").style.display = "none";
        } else {
            alert(`you didn't enter anything`)
            document.querySelector(".modalAdd").style.display = "none";
        }
    }, {once: true})
    document.querySelector("#taskNameAdd").value = ""
}

function filter() {
    document.querySelector(".filter").style.display = "block";
    document.querySelector(".filter").style.right = "0";
    document.querySelector("#closeFilter").addEventListener("click", () => {
        const priorityFilter = document.querySelector("#priorityFilter").value;
        const statusFilter = document.querySelector("#statusFilter").value;
        const deadlineFilter = document.querySelector("#deadlineFilter").value;
        const filter = data.filter(item => (priorityFilter ? item.priority === priorityFilter : true) && (statusFilter ? item.status === statusFilter : true) && (deadlineFilter ? item.ds === deadlineFilter : true));
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        makePageNumber(filter);
        const pagi = paginate(filter, pageNumber, pageSize);
        show(pagi)
        document.querySelector(".filter").style.right = "-20rem";
        document.querySelector(".filter").style.display = "none";
    }, {once: true})
}

function search(event) {
    if (event.target.value) {
        const filterSearch = data.filter(item => item.task.toLowerCase().search(event.target.value.toLowerCase()) >= 0);
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        document.querySelector(".page").querySelectorAll(".badge--small").forEach(item => item.remove())
        const pagi = paginate(filterSearch, pageNumber, pageSize);
        show(pagi);
    } else {
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        makePageNumber(data);
        const pagi = paginate(data, pageNumber, pageSize);
        show(pagi);
    }

}

function changeItem(event) {
    pageSize = event.target.value;
    const newData = paginate(data, pageNumber, pageSize);
    document.querySelectorAll(".tasks").forEach(item => item.remove());
    show(newData);
    makePageNumber(data)
}

function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items)
        .slice(startIndex)
        .take(pageSize)
        .value();
}

function makePageNumber(arr) {
    pageNumber = 1
    const countOfFilterItems = arr.length;
    const pagesCount = Math.ceil(countOfFilterItems / pageSize);
    if (pagesCount > 1) {
        document.querySelector(".page").querySelectorAll(".badge--small").forEach(item => item.remove())
        for (let i = 1; i <= pagesCount; i++) {
            const mySpan = document.createElement("span")
            mySpan.id = i;
            mySpan.className = "badge badge--small";
            mySpan.innerHTML = i;
            document.querySelector(".page").append(mySpan)
        }
        document.querySelectorAll(".badge--small").forEach(item => {
            item.addEventListener("click", (event) => {
                document.querySelector(".page").querySelectorAll(".badge--small").forEach(item => item.classList.remove("badge--active"))
                pageNumber = event.target.id;
                item.classList.add("badge--active")
                const newData = paginate(arr, pageNumber, pageSize);
                document.querySelectorAll(".tasks").forEach(item => item.remove());
                show(newData);
            })
        });

    } else {
        document.querySelector(".page").querySelectorAll(".badge--small").forEach(item => item.remove())
        document.querySelectorAll(".tasks").forEach(item => item.remove());
        const pagi = paginate(data, pageNumber, pageSize);
        show(pagi);
    }
}

function active() {
    if (pageNumber == currentPage) {
        const li = document.getElementById(`${pageNumber}`);
        li.classList.add("badge--active");
    } else {
        const li = document.getElementById(`${pageNumber}`);
        li.classList.remove("badge--active");
    }
}

makePageNumber(data)
const pagi = paginate(data, pageNumber, pageSize);
active()
show(pagi)