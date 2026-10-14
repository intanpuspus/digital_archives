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
    alt: "A little happiness to start my 26 journey"
  },
  {
    date: "SEPT 26, 2026",
    title: "making kimchii",
    note: "got my hand messy and learned how to make kimchi at Korean Education Center Indonesia.",
    images: ["images/kimchi1.jpeg",
             "images/kimchi2.jpeg",
             "images/kimchi3.jpeg",
             "images/kimchi4.jpeg",
             "images/kimchi5.jpeg",
             "images/kimchi6.jpeg"
    ],
    alt: "A little taste of Korean Culture thru Kimchi"
  },
  {
    date: "JUNE 18, 2026",
    title: "First Timer: Tennis Coaching",
    note: "not really good with ball sports but enjoyed this one.",
    images: ["images/tennis1.jpeg",
            "images/tennis2.jpeg",
            "images/tennis3.jpeg"
    ],
    alt: "Checked list of new sport this year."
  },
  {
    date: "FEB 11-14, 2026",
    title: "Outing #2: Mekarians go to Bali",
    note: "kind of stress release activity with colleagues.",
    images: ["images/bali1.jpeg",
            "images/bali2.jpeg",
            "images/bali3.jpeg",
            "images/bali4.jpeg",
            "images/bali5.jpeg",
            "images/bali6.jpeg"
    ],
    alt: "Kinda mixed feelings to go on vacation with people we met at work."
  }
];

const notes = [
  {
    date: "OCT 14, 2026",
    title: "a small reminder from one of my colleagues",
    body: "try to loosen your grip on work, don't let the grudge hold you and always remember to not shit where you eat."
  },
  {
    date: "OCT 9, 2026",
    title: "little things to be grateful for",
    body: "everyone has their dark story in life, yet they are still doing good to others and never make excuses using it."
  },
  {
    date: "SEP 02, 2026",
    title: "things i want to remember",
    body: "the warm afternoon light, the long conversation, and the walk home."
  }
];

const things = [
  {
    date: "JULY 4, 2026",
    title: "Museum Tekstil Jakarta",
    note: "visual learning various types of Batik and created my own Batik there.",
    images: ["images/batik1.jpeg",
             "images/batik2.jpeg",
             "images/batik3.jpeg",
             "images/batik4.jpeg",
             "images/batik5.jpeg",
             "images/batik6.jpeg",
             "images/batik7.jpeg",
             "images/batik8.jpeg",
             "images/batik9.jpeg"
    ],
    alt: "another interactive museum to try"
  },
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
    alt: "A little happiness to start my 26 journey"
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
    type: "photos",
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

grid.className = "memory-slideshow";
grid.replaceChildren();

let currentSlide = 0;
let autoplayTimer;

const slides = memories.map((item) => {
  const card = createPhotoCard(item);
  card.classList.add("memory-slide");
  return card;
});

const track = document.createElement("div");
track.className = "memory-slides-track";

slides.forEach((slide, index) => {
  slide.classList.toggle("is-active", index === 0);
  slide.setAttribute("aria-hidden", index !== 0);
  track.appendChild(slide);
});

const controls = document.createElement("div");
controls.className = "slideshow-controls";

const previousButton = document.createElement("button");
previousButton.className = "slide-button";
previousButton.textContent = "←";
previousButton.setAttribute("aria-label", "Previous slide");

const counter = document.createElement("span");
counter.className = "slide-counter";

const nextButton = document.createElement("button");
nextButton.className = "slide-button";
nextButton.textContent = "→";
nextButton.setAttribute("aria-label", "Next slide");

const progress = document.createElement("div");
progress.className = "slideshow-progress";

const progressBar = document.createElement("div");
progressBar.className = "slideshow-progress-bar";
progress.appendChild(progressBar);

controls.append(previousButton, counter, nextButton);
grid.append(track, controls, progress);

function showSlide(index) {
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((slide, i) => {
    const active = i === currentSlide;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });

  counter.textContent =
    `${String(currentSlide + 1).padStart(2, "0")} / ` +
    `${String(slides.length).padStart(2, "0")}`;

  progressBar.style.width =
    `${((currentSlide + 1) / slides.length) * 100}%`;
}

function startAutoplay() {
  clearInterval(autoplayTimer);

  if (slides.length > 1) {
    autoplayTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }
}

previousButton.addEventListener("click", () => {
  showSlide(currentSlide - 1);
  startAutoplay();
});

nextButton.addEventListener("click", () => {
  showSlide(currentSlide + 1);
  startAutoplay();
});

grid.addEventListener("mouseenter", () => {
  clearInterval(autoplayTimer);
});

grid.addEventListener("mouseleave", startAutoplay);

grid.addEventListener("focusin", () => {
  clearInterval(autoplayTimer);
});

grid.addEventListener("focusout", (event) => {
  if (!grid.contains(event.relatedTarget)) {
    startAutoplay();
  }
});

showSlide(0);
startAutoplay();

emptyMessage.hidden = memories.length > 0;
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
