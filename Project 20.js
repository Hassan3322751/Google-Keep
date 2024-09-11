const main = document.getElementById("main");
const addbtn = document.getElementById("addBtn");

const LSData = () => {
  const textareaValue = document.querySelectorAll("textarea");
  const notes = [];
  textareaValue.forEach((div) => {
    return notes.push(div.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNewNote = (text = "") => {
  const div = document.createElement("div");
  div.classList.add("note");
  const data = `
  <div class="operation">
  <button class="edit"><li class="fas fa-edit"></li></button>
  <button class="saveBtn" title="Save"><i class="fas fa-save"></i></button>
  <button class="delete" id="del" onclick="deleteNote(this)">
             <li class="fas fa-trash-alt"></li>
             </button>
             </div> 
             
             <div class="text">
                <div id="saved" class="save ${text ? "" : "hidden"}"></div>
                <textarea class="${text ? "hidden" : ""}"></textarea>
             </div>`;

  div.insertAdjacentHTML("afterbegin", data);

  const del = div.querySelector(".delete");
  const edit = div.querySelector(".edit");
  const save = div.querySelector(".save");
  const saveBtn = div.querySelector(".saveBtn");
  const textarea = div.querySelector("textarea");

  del.addEventListener("click", () => {
    div.remove();
    LSData();
  });

  textarea.value = text;
  save.innerHTML = text;

  edit.addEventListener("click", () => {
    save.classList.add('hidden')
    textarea.classList.remove('hidden')
  });
  
  saveBtn.addEventListener("click", () => {
    save.classList.remove('hidden')
    textarea.classList.add('hidden')
  });

  textarea.addEventListener("change", (event) => {
    const value = event.target.value;
    text = textarea.value;
    save.innerHTML = value;
    LSData();
  });

  main.appendChild(div);
};

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  console.log(notes);
  notes.forEach((note) => addNewNote(note));
}

addbtn.addEventListener("click", () => addNewNote());
