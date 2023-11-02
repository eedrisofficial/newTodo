// TODO UTILITIES FUNCTIONS

//TODO ID PROVIDER
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const todoInput = document.getElementById("todoInput");
const inputMessage = document.getElementById("message");
const add_Btn = document.getElementById("add_Btn");
const update_Btn = document.getElementById("update_Btn");

// TODO ADD_BTN TO UPDATE_BTN
const toggle_to_update_Btn = () => {
  add_Btn.classList.add("hidden");
  update_Btn.classList.remove("hidden");
};

// TODO UPDATE_BTN TO ADD_BTN
const toggle_to_add_Btn = () => {
  add_Btn.classList.remove("hidden");
  update_Btn.classList.add("hidden");
};

// TODO INPUT RESET
function resetInput() {
  todoInput.value = "";
}

//TODO CHECK INPUT VALUE IF EMPTY
const checkInputValue = () => {
  inputMessage.innerHTML = "Please write something.";
  inputMessage.classList.remove("hidden");
  inputMessage.classList.add("text-red-700", "text-lg", "font-bold");
};

// TODO STORAGE
const dataBase = "todoData";

// TODO, END OF UTILITIES FUNC.....

//TODO CREATION
const addTodo = (event) => {
  event.preventDefault();
  if (!todoInput.value) {
    checkInputValue();
    setTimeout(() => {
      inputMessage.classList.add("hidden");
    }, 3000);

    return;
  }

  const new_Todo = {
    id: uuid(),
    title: todoInput.value,
    created_at: new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  };

  const todoDB = JSON.parse(localStorage.getItem(dataBase)) || [];
  const new_todo_db = [...todoDB, new_Todo];
  console.log(new_todo_db);
  localStorage.setItem(dataBase, JSON.stringify(new_todo_db)) || [];
  fetchTodo();
  resetInput();
};

// TODO RENDERING/READ
const fetchTodo = () => {
  const todoContainer = document.getElementById("todoList");
  const todoDB = JSON.parse(localStorage.getItem(dataBase)) || [];

  const noTodoInDB = todoDB.length === 0;
  if (noTodoInDB) {
    // todo: Checking in database is empty
    todoContainer.innerHTML = `<h1 class="text-center text-red-500">Please add todo......</h1>`;
    //   "return" will also do the work of else statement
  } else {
    const renderTodo = todoDB
      .sort((a, b) =>
        a.created_at < b.created_at ? 1 : a.created_at > b.created_at ? -1 : 0
      )
      .map((todo) => {
        return `
    <div
            class="bg-[#FFF] group flex justify-between py-3 px-3 rounded-lg hover:bg-gray-300"
          >
            <h1>${todo.title}</h1>
            <p>${todo.created_at}</p>
            <section class="gap-4 hidden group-hover:flex">
              <button onClick="editingTodo('${todo.id}')" class="text-[#1e847f]"><i class="fa-solid fa-pen-to-square"></i></button>
              <button  onClick = "deleteTodo('${todo.id}')" class="text-red-600"><i class="fa-solid fa-trash"></i></button>
            </section>
          </div>
      `;
      });
    todoContainer.innerHTML = renderTodo.join("");
  }
};
fetchTodo();

// TODO DELETE
const deleteTodo = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#1e3d59",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const todoDB = JSON.parse(localStorage.getItem(dataBase)) || [];
      const new_Todo_database = todoDB.filter((todo) => todo.id !== id);
      localStorage.setItem(dataBase, JSON.stringify(new_Todo_database));
      fetchTodo();
      Swal.fire("Deleted!", "Your todo has been deleted.", "success");
    }
  });
};

// TODO EDITING & UPDATING
const editingTodo = (id) => {
  const todoDB = JSON.parse(localStorage.getItem(dataBase)) || [];
  const todoToEdit = todoDB.find((todo) => todo.id === id);
  todoInput.value = todoToEdit.title;
  toggle_to_update_Btn();
  update_Btn.setAttribute("todoToUpdate", id);
  todoInput.classList.add("border-red-500");
};

const updatedTodo = (event) => {
  event.preventDefault();

  if (!todoInput.value) {
    checkInputValue();
    setTimeout(() => {
      inputMessage.classList.add("hidden");
    }, 3000);
    return;
  }
  const todoToUpdate = update_Btn.getAttribute("todoToUpdate");
  const todoDB = JSON.parse(localStorage.getItem(dataBase)) || [];
  const updated_database = todoDB.map((todo) => {
    if (todo.id === todoToUpdate) {
      return { ...todo, title: todoInput.value };
    } else {
      return todo;
    }
  });
  localStorage.setItem(dataBase, JSON.stringify(updated_database));
  fetchTodo();
  toggle_to_add_Btn();
  resetInput();
  todoInput.classList.remove("border-red-500");
};
