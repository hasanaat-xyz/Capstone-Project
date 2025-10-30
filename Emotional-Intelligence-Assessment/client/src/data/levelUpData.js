/**
 * 🌀 LevelUpData — Self-Regulation Round (Twisted & Psychologically Confusing)
 * Each question forces the player to navigate emotional nuance.
 * All answers sound “emotionally mature,” but only one reflects true regulation.
 */

const levelUpData = [
  { // 😤 Emotional Impulse
    question: "1. During a tense argument, your heart races and your voice trembles slightly. What’s your response?",
    options: [
      "Keep talking calmly to prove you’re in control, even if your thoughts blur.",
      "Notice the rush, take a breath, and choose to pause—even if it feels like losing power.",
      "Stay quiet but mentally prepare stronger comebacks for later.",
      "Switch topics smoothly so no one notices your rising tension."
    ],
    answer: 1, // true self-regulation involves conscious pause, not image control
  },

  { // ⏳ Pressure Response
    question: "2. You’re drowning in work but smiling to maintain your reputation as 'the reliable one'. What’s your best move?",
    options: [
      "Privately acknowledge the stress and intentionally reset your energy before continuing.",
      "Keep smiling, it maintains morale for everyone else.",
      "Tell yourself it’s temporary and keep pushing harder for one more week.",
      "Vent to one friend just to release pressure—then ignore it again."
    ],
    answer: 0, // regulation = awareness + reset, not repression or delay
  },

  { // 💭 Guilt Processing
    question: "3. You snapped at someone and instantly regret it. What’s your best next thought?",
    options: [
      "You replay the moment repeatedly to ensure you never act that way again.",
      "You justify it to yourself, they pushed you too far after all.",
      "You admit you overreacted, understand the trigger, and decide how to repair calmly.",
      "You quickly apologize to make the guilt disappear as fast as possible."
    ],
    answer: 2, // true regulation balances awareness, accountability, and calmness
  },

  { // 🪞 Handling Criticism
    question: "4. In a team meeting, someone challenges your decision publicly, and you feel heat in your chest. What’s your best emotional move?",
    options: [
      "Clarify your reasoning immediately before they control the narrative.",
      "Smile politely but internally decide to distance from that colleague.",
      "Laugh and agree with them to look humble, even if you disagree.",
      "Maintain eye contact, breathe, and listen fully before choosing whether to respond."

    ],
    answer: 3, // regulation = grounding before reaction, not strategic masking
  },

  { // ⚖️ Anxiety and Control
    question: "5. You’re moments away from an important presentation; your heart’s racing and your hands feel cold. What’s your best choice?",
    options: [
      "Channel the nerves as excitement and speak faster to ride the adrenaline wave.",
      "Pause, feel the physical sensations without judging them, and breathe with intention.",
      "Distract yourself by thinking of something completely unrelated until you’re on stage.",
      "Mentally scold yourself, this isn’t the time to be nervous."
    ],
    answer: 1, // mindfulness without suppression = advanced emotional regulation
  },
];

export default levelUpData;
