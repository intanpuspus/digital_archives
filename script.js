const memories = [
  {
    date: "OCT 1, 2026",
    title: "bday feasttts",
    note: "getting older and wiser, with these little blessings.",
    images: ["images/flower.jpeg",
             "images/sashimi.jpeg",
             "images/cake.jpeg",
             "images/sushi.jpeg",
             "images/essel.jpeg"
    ],
    alt: "A little happiness on Oct 1st"
  },
  {
    date: "AUG 19, 2026",
    title: "something blooming",
    note: "i brought home a little piece of the afternoon.",
    image: "images/flowers.jpg",
    alt: "Flowers collected on an afternoon"
  },
  {
    date: "SEP 06, 2026",
    title: "the sky was pink",
    note: "one of those things you wish you could keep.",
    image: "images/sunset.jpg",
    alt: "A pink sunset"
  }
];

const notes = [
  {
    date: "AUG 15, 2026",
    title: "a thought for today",
    body: "maybe a good life is made of ordinary days that we learn to notice."
  },
  {
    date: "AUG 22, 2026",
    title: "a small reminder",
    body: "you don't have to make every moment meaningful. sometimes being there is enough."
  },
  {
    date: "SEP 02, 2026",
    title: "things i want to remember",
    body: "the warm afternoon light, the long conversation, and the walk home."
  }
];

const things = [
  {
    date: "AUG 19, 2026",
    title: "a little flower",
    body: "a flower i saw on my way home. a small detail that made the day feel special."
  },
  {
    date: "AUG 27, 2026",
    title: "a place i found",
    body: "a quiet corner, a cup of tea, and a few hours to myself."
  }
];

const dateCollections = [
  {
    date: "AUGUST 2026",
    title: "a slower month",
    body: "slow mornings, flowers on the way home, and a little more time for myself."
  },
  {
    date: "SEPTEMBER 2026",
    title: "little transitions",
    body: "pink skies, weekend walks, and moments worth keeping."
  }
];

const sections = {
  photos: {
    label: "FILE 001 / VISUAL RECORDS",
    title: "Photographs",
    description: "little frames of the life i'm living.",
    type: "photos",
    items: memories
  },

  notes: {
    label: "FILE 002 / PERSONAL WRITINGS",
    title: "Little Notes",
    description: "thoughts i didn't want to lose.",
    type: "notes",
    items: notes
  },

  things: {
    label: "FILE 003 / SMALL DISCOVERIES",
    title: "Collected Things",
    description: "little objects, places, and fragments.",
    type: "notes",
    items: things
  },

  dates: {
    label: "FILE 004 / CHRONOLOGICAL INDEX",
    title: "By the Dates",
    description: "a small timeline of where i've been.",
    type: "notes",
    items: dateCollections
  }
};

const grid = document.querySelector("#memory-grid");
const archiveTitle = document.querySelector("#archive-title");
const archiveLabel = document.querySelector("#archive-label");
const archiveDescription =
  document.querySelector("#archive-description");
const closeSection = document.querySelector("#close-section");
const emptyMessage = document.querySelector("#empty-message");

const dialog = document.querySelector("#note-dialog");
const noteDate = document.querySelector("#note-date");
const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");

let activeSection = null;

function openNote(item) {
  noteDate.textContent = item.date;
  noteTitle.textContent = item.title;
  noteBody.textContent = item.body;

  dialog.showModal();
}

function createPhotoCard(item) {
  const card = document.createElement("article");
  card.className = "memory-card";

  const photoGrid = document.createElement("div");
  photoGrid.className = "memory-photos";

  // Support both the new images array
  // and the old single-image property.
  const photos = item.images || [item.image];

  photos.filter(Boolean).forEach((src, index) => {
    const frame = document.createElement("div");
    frame.className = "memory-image";

    const image = document.createElement("img");
    image.src = src;
    image.alt = `${item.alt || item.title} — photo ${index + 1}`;
    image.loading = "lazy";

    frame.append(image);
    photoGrid.append(frame);
  });

  const date = document.createElement("p");
  date.className = "memory-date";
  date.textContent = item.date;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const note = document.createElement("p");
  note.className = "memory-note";
  note.textContent = item.note;

  card.append(photoGrid, date, title, note);

  return card;
}

function createNoteCard(item) {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "note-card";

  const date = document.createElement("p");
  date.className = "memory-date";
  date.textContent = item.date;

  const title = document.createElement("h3");
  title.textContent = item.title;

  const preview = document.createElement("p");
  preview.className = "note-preview";
  preview.textContent = item.body;

  card.append(date, title, preview);
  card.addEventListener("click", () => openNote(item));

  return card;
}

function renderSection(sectionKey, shouldScroll = true) {
  const section = sections[sectionKey];

  if (!section) return;

  activeSection = sectionKey;

  archiveLabel.textContent = section.label;
  archiveTitle.textContent = section.title;
  archiveDescription.textContent = section.description;

  grid.replaceChildren();

  grid.className = section.type === "photos"
    ? "memory-grid"
    : "note-grid";

  emptyMessage.hidden = section.items.length > 0;

  section.items.forEach((item) => {
    const card = section.type === "photos"
      ? createPhotoCard(item)
      : createNoteCard(item);

    grid.append(card);
  });

  closeSection.hidden = false;

  document.querySelectorAll(".pocket").forEach((pocket) => {
    const isActive = pocket.dataset.section === sectionKey;

    pocket.setAttribute("aria-pressed", String(isActive));
  });

  if (shouldScroll) {
    document.querySelector("#archive").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }
}

function renderHome() {
  activeSection = null;

  archiveLabel.textContent = "FROM MY COLLECTION";
  archiveTitle.textContent = "A few things I've kept";
  archiveDescription.textContent =
    "fragments of ordinary days, saved for later.";

  grid.className = "memory-grid";
  grid.replaceChildren();

  memories.forEach((item) => {
    grid.append(createPhotoCard(item));
  });

  emptyMessage.hidden = true;
  closeSection.hidden = true;

  document.querySelectorAll(".pocket").forEach((pocket) => {
    pocket.setAttribute("aria-pressed", "false");
  });
}

document.querySelectorAll(".pocket").forEach((pocket) => {
  pocket.setAttribute("aria-pressed", "false");

  pocket.addEventListener("click", () => {
    renderSection(pocket.dataset.section);
  });
});

closeSection.addEventListener("click", renderHome);

document.querySelector("#close-note").addEventListener("click", () => {
  dialog.close();
});

// Clicking outside the note paper closes the popup.
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
