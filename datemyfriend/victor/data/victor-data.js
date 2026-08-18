/*
  This is the "database" for the site (gallery/ + admin/): the single file
  to edit for both text content and photos.

  Photos: drop real image files into ../photos/ (e.g. photos/portrait.jpg,
  photos/hiking.jpg) and point to them with a path like "photos/portrait.jpg"
  in the `portrait` field below or a `photo` field on a gallery entry. Until
  a `photo`/`portrait` path is set, those spots render an emoji/initials
  placeholder instead, nothing breaks if photos aren't ready yet.

  Why a .js file and not a .json file: these pages are meant to be opened
  directly as local files (double-click, no server). Browsers block
  fetch()-ing local JSON over file:// due to CORS, but a plain <script src>
  tag works everywhere. So this file just assigns a global object instead
  of being fetched as data.
*/
(function () {
  const DEFAULT_DATA = {
    basics: {
      name: "Victor Ng",
      age: 28,
      location: "San Francisco, CA",
      job: "Software Engineer",
      school: "Rensselaer Polytechnic Institute",
      height: "5'10\"",
    },

    // Used on the Self-Portrait room. Path to a file in ../photos/, e.g.
    // "photos/portrait.jpg", leave empty ("") to keep the initials plate.
    portrait: "photos/victor-hike-1.jpg",

    aboutEssay: [
      "Software engineer living in San Francisco, by way of Rensselaer Polytechnic Institute. Outside of work: improv, bouldering, hiking, board games, and usually a book in progress.",
      "A friend of his put it this way: \"The guy you want in a long-term relationship. Peak prefrontal cortex behavior. He communicates, has interesting hobbies, comes from a well-adjusted family, and stays socially active.\"",
    ],

    interests: [
      "Improv", "Bouldering", "Hiking", "Board Games", "Reading",
    ],

    // The Collection room's filmstrip. Each entry can carry a
    // `photo: "photos/whatever.jpg"` (file lives in ../photos/) to show a
    // real image, or a `video: "photos/whatever.mp4"` (+ optional `photo`
    // used as the poster frame) for inline video, emoji is the fallback
    // if neither is set.
    gallery: [
      { emoji: "🌲", label: "Lost in the redwoods", photo: "photos/victor-trees-1.jpg" },
      { emoji: "👯", label: "Hiking with friends", photo: "photos/victor-hiking-friends-1.jpg" },
      { emoji: "🍽️", label: "Dinner with friends", photo: "photos/victor-friends-dinner.jpg" },
      { emoji: "🎤", label: "At a concert", photo: "photos/victor-concert-1.jpg" },
      { emoji: "🚗", label: "Road trip candid", photo: "photos/victor-in-car.jpg" },
      { emoji: "🧗", label: "Working a problem", video: "photos/victor-climbing-1.mp4", photo: "photos/victor-climbing-1-poster.jpg" },
      { emoji: "🧗", label: "Sending it", video: "photos/victor-climbing-2.mp4", photo: "photos/victor-climbing-2-poster.jpg" },
    ],

    // Green and red flags live together as one list now, mixed, not
    // grouped into two separate pages.
    flags: [
      { type: "green", text: "Communicates well" },
      { type: "green", text: "Extremely clean" },
      { type: "green", text: "Great chef" },
      { type: "green", text: "Active organizer" },
      { type: "red", text: "Can't fully relate to Asian trauma" },
      { type: "red", text: "Can't speak Chinese, only Cantonese" },
    ],

    idealType: {
      // No `photo` field here on purpose, this is someone Victor hasn't
      // met yet, so The Sitter's Brief room renders text only.
      summary: "Someone who's kind, has a good background, and is willing to try new things.",
      tags: ["Adventurous", "Intelligent", "Funny"],
      note: "(not a checklist, just what tends to click)",
      relationshipType: "Long-term relationship.",
      loveLanguage: "Quality time.",
      dealbreakers: [
        "Not communicating internal struggles",
        "No interest in trying different cuisines",
        "Staying in one place too long",
      ],
    },

    values: [
      {
        emoji: "🧭",
        label: "Where I'm headed",
        text: "Probably an engineer in machine learning, building something worth inventing.",
      },
      {
        emoji: "👶",
        label: "Family & kids",
        text: "Would like to have them someday, but it's not a priority right now.",
      },
      {
        emoji: "🤝",
        label: "How I show up",
        text: "Good food and comforting dates.",
      },
      {
        emoji: "💪",
        label: "Strengths",
        text: "A good listener and a good speaker.",
      },
    ],

    faq: [
      {
        q: "Why is your friend building you a website to date? Red flag?",
        a: "\"I wanted to see if this would work for my friends: the idea of doing bold, extroverted stuff to find love. It'll help when I have time to date.\" (That's the friend talking, not Victor.)",
      },
      {
        q: "What does our first date look like?",
        a: "Do you like arts? I go to this video game music concert that happens every month.",
      },
      {
        q: "Will I love you if you were a worm?",
        a: "Would you love me if I turned myself into a worm to join you?",
      },
    ],

    friendReviews: [
      {
        name: "Jimson",
        relation: "Friend",
        quote: "Victor and I are like yin and yang. If you want a stable relationship, he's your guy. If you want a toxic rollercoaster relationship, send them my way. (Kidding. Not kidding.)",
      },
      {
        name: "Santi",
        relation: "Friend",
        quote: "If I was gay, I would want to date you.",
      },
      {
        name: "Evonne",
        relation: "Parent of two kids, friend of Victor's",
        quote: "Victor is a great communicator. He's very open and honest, and stands up for himself when it matters, in a way that's warm, caring, and respectful. He has a great balance of strength and kindness. He can be direct without being harsh, and he genuinely cares about the person on the other side of the conversation.",
      },
    ],

    contact: {
      note: "Message first, with a link to your socials, so Victor knows who he's talking to.",
      phone: "(732) 299-5373",
      email: "",
      // Empty by default and gated behind visibility.schedulingEnabled,
      // see note there for why self-serve booking is off by default.
      schedulingLink: "",
    },

    // Which sections show up on the site. This is what the admin panel edits.
    // Values here are the DEFAULTS; the admin panel's live overrides live in
    // localStorage on top of these, so this file stays untouched unless you
    // edit it by hand.
    visibility: {
      about: true,
      interests: true,
      gallery: true,
      flags: true,
      idealType: true,
      friends: true,
      values: true,
      faq: true,
      // Off by default on purpose: a self-serve "book a time" link lets
      // someone lock in a date with Victor before he's had any chance to
      // screen them, which undercuts the whole friend-vetted premise of
      // this site. Flip this on only once Victor's comfortable with that
      // tradeoff.
      schedulingEnabled: false,
    },
  };

  const STORAGE_KEY = "victorSiteVisibility";

  function getVisibility() {
    let overrides = {};
    try {
      overrides = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      overrides = {};
    }
    return Object.assign({}, DEFAULT_DATA.visibility, overrides);
  }

  function setVisibility(key, value) {
    const current = getVisibility();
    current[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  }

  function resetVisibility() {
    localStorage.removeItem(STORAGE_KEY);
  }

  function isVisible(key) {
    return getVisibility()[key] !== false;
  }

  window.VictorDB = {
    data: DEFAULT_DATA,
    getVisibility,
    setVisibility,
    resetVisibility,
    isVisible,
    STORAGE_KEY,
  };
})();
