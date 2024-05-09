let cards = document.querySelectorAll(".card");
let lists = document.querySelectorAll(".list");

cards.forEach((card) => {
  movecards(card);
});

lists.forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    let dragcard = document.querySelector(".dragging");
    let task = inserttask(list, e.clientY);
    if (task) {
      task.parentNode.insertBefore(dragcard, task);
    } else {
      list.appendChild(dragcard);
    }
  });
});

function movecards(card) {
  card.addEventListener("dragstart", (e) => {
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", (e) => {
    card.classList.remove("dragging");
  });
}

function inserttask(list, mouseY) {
  let listtasks = [...list.querySelectorAll(".card:not(.dragging)")];

  return listtasks.reduce(
    (closestCard, nextCard) => {
      let taskRec = nextCard.getBoundingClientRect();
      let offset = mouseY - taskRec.top - taskRec.height / 2;

      if (offset < 0 && offset > closestCard.offset) {
        return { offset, element: nextCard };
      } else {
        return closestCard;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
