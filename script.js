async function getPages() {
  const url = `https://swapi.dev/api/people/?format=json&page=`;

  let page = 1;
  let people = [];
  let lastResult = [];

  do {
    try {
      const resp = await fetch(`${url}${page}`);
      const data = await resp.json();
      lastResult = data;
      data.results.forEach((person) => {
        const { name, eye_color, height, birht_year, vehicles } = person;
        people.push({ name, eye_color, height, birht_year, vehicles });
      });
      page++;
    } catch (error) {
      console.error(`Oops, something is wrong! ${error}`);
    }
  } while (lastResult.next !== null);
  console.log(people);

  const listElement = document.getElementById("list");
  const paginationElement = document.getElementById("pagination");

  let currentPage = 1;
  let rows = 10;

  // display list
  function displayList(items, wrapper, rowsPerPage, page) {
    wrapper.innerHTML = " ";
    page--;

    let start = rowsPerPage * page;
    let end = start + rowsPerPage;
    let paginatedItems = items.slice(start, end);

    for (let i = 0; i < paginatedItems.length; i++) {
      let item = paginatedItems[i];

      let myString = JSON.stringify(item);

      let itemElement = document.createElement("div");
      itemElement.classList.add("item");
      itemElement.innerText = myString;

      wrapper.appendChild(itemElement);
    }
  }

  //pagination
  function pagination(items, wrapper, rowsPerPage) {
    wrapper.innerHTML = " ";

    let pageCount = Math.ceil(items.length / rowsPerPage);
    for (let i = 1; i < pageCount + 1; i++) {
      let btn = paginationButton(i, items);
      wrapper.appendChild(btn);
    }
  }

  //pagination btn
  function paginationButton(page, items) {
    let button = document.createElement("button");
    button.innerText = page;

    if (currentPage == page) button.classList.add("active");

    button.addEventListener("click", function () {
      currentPage = page;
      displayList(items, listElement, rows, currentPage);

      let currentBtn = document.querySelector(".pagenumbers button.active");
      currentBtn.classList.remove("active");

      button.classList.add("active");
    });

    return button;
  }

  displayList(people, listElement, rows, currentPage);
  pagination(people, paginationElement, rows);
}

getPages();
