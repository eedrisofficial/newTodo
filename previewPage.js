const renderCurrentPreviewTodo = () => {
  const todo_db = getDB(dataBase);
  const currentPreviewTodoId = getDB("currentTodoID");
  const currentTodo = todo_db.find((todo) => todo.id === currentPreviewTodoId);
  const { title, id, created_at, description, exactTime } = currentTodo;

  const todoPreviewContainer = document.getElementById("todoPreviewContainer");
  todoPreviewContainer.innerHTML = `
          <section class="flex justify-between items-center">
          <h1 class="text-lg font-bold">${title}</h1>
          
        </section>
        <section class="flex flex-col gap-2">
          <div class = "flex gap-20 items-center">
            <p class="text-md text-gray-500">
              ${description || "No description.."} 
            </p>
            <div class="flex items-center gap-2">
              <button class="text-[#1e847f]" id="viewDescription">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button class="text-red-600">
                <i class="fa-solid fa-trash"></i>
              </button>
             </div>
            </div>
          <section class = "flex flex-co items-center gap-3">
            <span class="text-sm text-gray-700 truncate">${created_at}</span>
            <span class="text-sm text-gray-700 truncate">${exactTime}</span>
            <span class="mx-1">&middot;</span>
            <button class="bg-slate-300 text-sm text-slate-800 px-1 rounded-lg"
              >pending</button
            >
          </section>
        </section>
  `;
};

renderCurrentPreviewTodo();

const viewDescription = document.getElementById("viewDescription");
const addDescription = document.getElementById("addDescription");
const closeBtn = document.getElementById("closeBtn");

// showing popOut
viewDescription.addEventListener("click", () => {
  popUp.style.display = "block";
});

//hiding after submit
addDescription.addEventListener("click", () => {
  const descriptionAdded = document.getElementById("description");
  const todoDescription = descriptionAdded.value;
  console.log(todoDescription);
});

closeBtn.addEventListener("click", () => {
  setTimeout(() => {
    popUp.style.display = "none";
  }, 500);
});
