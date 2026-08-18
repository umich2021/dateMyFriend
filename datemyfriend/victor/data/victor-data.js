/*
  This is the "temp database" for the whole site.
  Every page (card/, personal/, admin/) loads this file and reads from
  window.VictorDB. All content below is PLACEHOLDER — swap it once
  questionnaire.md comes back from Victor.

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
      age: 27,
      location: "Ann Arbor, MI",
      job: "Software Engineer",
      school: "University of Michigan",
      height: "5'10\"",
    },

    bio: "Half sarcasm, half genuine enthusiasm. Ask me about the best ramen spot in town — I have strong, unsolicited opinions.",

    // Longer-form version of the same personality, used on personal/'s About
    // section. personal/ dropped the Hinge-style Prompts page — a person
    // spends real time on a site, not two seconds swiping, so this folds
    // the same specific details (ramen, the crypto thing, the 5k) into
    // actual prose instead of isolated Q&A cards.
    aboutEssay: [
      "I build software for a living and spend the rest of my time chasing good food, better playlists, and the occasional personal best on a hiking trail. I laugh easily, cook enthusiastically, and I'm the friend who already has the group chat plans figured out.",
      "Ask me about the best ramen spot in town and I will have opinions — strong, specific, mildly exhausting ones. I've also been known to leave a party the second someone brings up crypto unprompted, and I will absolutely make you try whatever I just cooked, no exceptions.",
      "Right now I'm chasing a pretty small goal: beating my own 5k time before the leaves change. That's mostly how I operate — less about grand plans, more about picking something and quietly getting a little better at it. Fresh sheets, a good playlist on a long drive, and a board game I take slightly too seriously round out the rest.",
    ],

    // Kept for card/ only — that site is intentionally the app-style clone,
    // so Hinge-style prompt cards fit its format. personal/ uses aboutEssay
    // above instead.
    prompts: [
      {
        label: "I'll know it's time to leave the party when...",
        answer: "...someone starts talking about crypto unprompted.",
      },
      {
        label: "My simple pleasures",
        answer: "Fresh sheets, a good playlist on a long drive, and beating my own high score.",
      },
      {
        label: "A goal I'm currently working toward",
        answer: "Finally beating my own 5k time before the leaves change.",
      },
    ],

    interests: [
      "Basketball", "Cooking", "Anime", "Hiking",
      "Board Games", "Photography", "Coffee Snob", "Traveling",
    ],

    // Real photos go here once they exist — until then, these render as
    // labeled placeholder tiles on personal/ so the page doesn't feel like
    // a wall of text. Swap each `photo` with a real image path/URL later.
    gallery: [
      { emoji: "📸", label: "Main photo" },
      { emoji: "🥾", label: "Doing the thing" },
      { emoji: "👯", label: "With friends" },
      { emoji: "😄", label: "Candid" },
      { emoji: "🍜", label: "Ramen opinions, mid-rant" },
      { emoji: "🎲", label: "Taking a board game too seriously" },
    ],

    // Green and red flags live together as one list now — mixed, not
    // grouped into two separate pages. A person is more than a pro/con
    // list split in half.
    flags: [
      { type: "green", text: "Texts back within a reasonable amount of time" },
      { type: "red", text: "Will absolutely talk your ear off about ramen" },
      { type: "green", text: "Has a hobby he's genuinely, embarrassingly excited about" },
      { type: "red", text: "Overly competitive at board games — like, unreasonably so" },
      { type: "green", text: "Remembers small details from earlier conversations" },
      { type: "red", text: "Has strong, specific opinions about how to load a dishwasher" },
      { type: "green", text: "Comfortable ordering for the table" },
      { type: "red", text: "Takes 20 minutes to pick a Netflix show, then falls asleep" },
      { type: "green", text: "Still close with his college friends" },
      { type: "red", text: "Will make you try his cooking experiments, no exceptions" },
      { type: "green", text: "Cries at the right movies" },
    ],

    idealType: {
      // No `photo` field here on purpose — the Ideal Type pages render a
      // "character select" placeholder instead (see card/ideal-type.html
      // and personal/ideal-type.html), since this is someone Victor
      // hasn't met yet.
      summary: "Someone who's kind first, funny second, and doesn't take themselves too seriously. Bonus points if you have a go-to karaoke song.",
      tags: ["Kind", "Funny", "Adventurous eater"],
      note: "(not a checklist — just what tends to click)",
      relationshipType: "Long-term, ideally — not here to keep things casual forever, not rushing to the altar either.",
      loveLanguage: "Quality time, with a side of acts of service.",
      dealbreakers: [
        "Chronic flakiness — if plans change, just say so",
        "No interest in ever traveling anywhere",
        "Doesn't get along with dogs",
      ],
    },

    values: [
      {
        emoji: "🧭",
        label: "Where I'm headed",
        text: "Deep in a stretch where work is genuinely exciting, but I'm protecting weekends for people, not just my inbox.",
      },
      {
        emoji: "👶",
        label: "Family & kids",
        text: "Want kids someday, not in a rush, open to figuring out timing together.",
      },
      {
        emoji: "🤝",
        label: "How I show up",
        text: "Quality time and actually following through beats grand gestures — I'll remember what you said three weeks ago before I remember to buy flowers.",
      },
      {
        emoji: "💪",
        label: "Strengths",
        text: "Staying calm when plans fall apart, cooking under pressure, and making people feel heard when they need to vent.",
      },
    ],

    faq: [
      {
        q: "Wait, did your friend really build you a website?",
        a: "Unfortunately, yes. I found out when it was already live.",
      },
      {
        q: "Is this real? Are you actually single?",
        a: "Extremely real, and yes.",
      },
      {
        q: "What are you hoping for?",
        a: "Something that starts with a good conversation and doesn't feel like work.",
      },
      {
        q: "How do I actually talk to you?",
        a: "Check the Contact page — message first, and we'll figure out a time from there.",
      },
    ],

    friendReviews: [
      {
        name: "Sarah",
        relation: "College roommate",
        quote: "Victor once drove two hours to bring me soup when I was sick. 10/10 would recommend.",
      },
      {
        name: "Marcus",
        relation: "Coworker",
        quote: "He's the guy who remembers everyone's coffee order. Also insufferable at trivia night — in a good way.",
      },
      {
        name: "Emily",
        relation: "Childhood friend",
        quote: "Known him since we were 8. He's exactly as loyal now as he was then, just with better fashion sense.",
      },
    ],

    contact: {
      note: "Message first — Victor will follow up to find a time that works. This keeps a real person in the loop before anything gets locked in.",
      // Deliberately fake-formatted placeholders: 555 is a reserved
      // fictional exchange in North America, and example.com is a domain
      // reserved for documentation — neither one is a real, reachable
      // destination. Replace both with Victor's real info before sharing.
      phone: "(555) 010-1234",
      email: "victor.ng@example.com",
      // Empty by default and gated behind visibility.schedulingEnabled —
      // see note there for why self-serve booking is off by default.
      schedulingLink: "",
    },

    // Which sections show up on the site. This is what the admin panel edits.
    // Values here are the DEFAULTS; the admin panel's live overrides live in
    // localStorage on top of these, so this file stays untouched unless you
    // edit it by hand.
    visibility: {
      about: true,
      prompts: true,
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
      // tradeoff — until then, contact.html points people to message
      // first instead.
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
