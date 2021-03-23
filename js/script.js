// Number of student displayed
const perPage = 9;
var studentList = document.querySelector(".student-list");

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage(list, page) {
  // Create two variables to store the start index and the end index of the list items
  const startIndex = page * perPage - perPage;
  const endIndex = page * perPage;

  // Select the UL element and remove the content.

  studentList.innerHTML = "";

  // get the info for each student and insert into the ul
  for (let i = 0; i < list.length; i++) {
    const student = list[i];
    if (i >= startIndex && i < endIndex) {
      studentList.insertAdjacentHTML(
        "beforeend",
        `
      <li class="student-item cf">
        <div class="student-details">
         <img class="avatar" src="${student.picture.thumbnail}" alt="Profile Picture">
         <h3>${student.name.first} ${student.name.last}</h3>
         <span class="email">${student.email}</span>
       </div>
       <div class="joined-details">
       <span class="date">Joined ${student.registered.date}</span>
       </div>
      </li>`
      );
    }
  }
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  // number of pagination buttons needed
  const numOfPages = Math.ceil(list.length / perPage);

  // select the ul and empty it
  const linkList = document.querySelector(".link-list");
  linkList.innerHTML = "";

  // add the buttons to the ul
  for (let i = 1; i <= numOfPages; i++) {
    linkList.insertAdjacentHTML(
      "beforeend",
      `<li>
      <button type="button">${i}</button>
      </li>`
    );
  }

  // Set the first button as "active"

  const firstButton = document.querySelectorAll("button")[0];
  firstButton.className = "active";

  // pagination buttons handler
  linkList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      // Remove the active class from any other pagination button.
      document.querySelector(".active").className = "";

      // Add the active class to the pagination button.
      e.target.className = "active";

      // Get the page number and call showPage()
      const pageNumber = e.target.textContent;
      showPage(list, pageNumber);
    }
  });
}

// Call functions
showPage(data, 1);
addPagination(data);

// Add a Search Component
const header = document.querySelector(".header");
header.insertAdjacentHTML(
  "beforeend",
  `
<label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`
);

// Add Functionality to the Search Component
const searchButton = document.querySelector(".student-search button");
const input = document.getElementById("search");

// the input
input.addEventListener("keyup", () => {
  const newList = [];

  data.forEach((student) => {
    const inputValue = input.value.toLocaleLowerCase();
    const fName = student.name.first.toLowerCase();
    const lName = student.name.last.toLowerCase();

    // check if the charachters in the input are included in the name.
    if (fName.includes(inputValue) || lName.includes(inputValue)) {
      newList.push(student);
    }
  });
  showPage(newList, 1);
  addPagination(newList);

  // Ceck if the array is empty or not
  if (newList.length < 1) {
    studentList.innerHTML = `
    <div> <p>No Matches Found </p></div>
    `;
  }
});

// the button
searchButton.addEventListener("click", () => {
  const newList = [];

  data.forEach((student) => {
    const inputValue = input.value.toLocaleLowerCase();
    const fName = student.name.first.toLowerCase();
    const lName = student.name.last.toLowerCase();

    if (fName.includes(inputValue) || lName.includes(inputValue)) {
      newList.push(student);
    }
  });

  showPage(newList, 1);
  addPagination(newList);
});
