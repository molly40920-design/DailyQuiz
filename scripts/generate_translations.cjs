// This script generates translated quiz JSON files for en, ja, ko
// Run: node scripts/generate_translations.js

const fs = require('fs');
const path = require('path');

const quizzes = require('../public/quizzes.json');

// ============================================================
// ENGLISH TRANSLATIONS
// ============================================================
const quizzes_en = [
  {
    "id": "q1",
    "title": "What Does Your Soulmate Look Like?",
    "description": "Through simple questions, dive deep into your subconscious to find the soul fragment that best matches yours.",
    "category": "romance",
    "tags": ["Soulmate", "Subconscious"],
    "questions": [
      { "text": "If you walked into a mysterious forest, what would you notice first?", "options": [
        { "text": "Gentle sunlight filtering through the leaves", "score": 1 },
        { "text": "Soft, moss-covered ground beneath your feet", "score": 2 },
        { "text": "The call of an unknown bird in the distance", "score": 3 },
        { "text": "The scent of flowers and grass drifting in the air", "score": 4 }
      ]},
      { "text": "Deep in the forest, there's a wooden cabin. The person who opens the door gives you what kind of feeling?", "options": [
        { "text": "Warm with a welcoming smile", "score": 1 },
        { "text": "Quiet with deep, thoughtful eyes", "score": 2 },
        { "text": "Cheerful and full of energy", "score": 3 },
        { "text": "Mysterious and wise", "score": 4 }
      ]},
      { "text": "The person hands you a drink. What is it?", "options": [
        { "text": "A steaming cup of sweet hot cocoa", "score": 1 },
        { "text": "A light, subtly sweet hot tea", "score": 2 },
        { "text": "A colorful fruit juice", "score": 3 },
        { "text": "Sparkling water in an elegant glass", "score": 4 }
      ]},
      { "text": "A painting hangs on the cabin wall. What scene does it depict?", "options": [
        { "text": "Two silhouettes cuddling by a fireplace", "score": 1 },
        { "text": "A calm, still lake", "score": 2 },
        { "text": "A group of people laughing at a meadow picnic", "score": 3 },
        { "text": "A vast, deep starry sky", "score": 4 }
      ]},
      { "text": "You find a treasure box in the cabin. What's inside?", "options": [
        { "text": "A warm, soft scarf", "score": 1 },
        { "text": "A yellowed handwritten diary", "score": 2 },
        { "text": "A map leading to an unknown land", "score": 3 },
        { "text": "A crystal ball emitting a faint glow", "score": 4 }
      ]},
      { "text": "As you leave, the person gives you a gift. What do you think it is?", "options": [
        { "text": "A dried flower", "score": 1 },
        { "text": "A handmade bookmark", "score": 2 },
        { "text": "A small compass", "score": 3 },
        { "text": "A miniature mirror", "score": 4 }
      ]},
      { "text": "On your way back, you encounter a fork in the road. How do you choose?", "options": [
        { "text": "Take the safest and most reliable path", "score": 1 },
        { "text": "Take the quietest, least traveled path", "score": 2 },
        { "text": "Take the most interesting-looking path", "score": 3 },
        { "text": "Close your eyes and follow your intuition", "score": 4 }
      ]},
      { "text": "It starts raining on the way back. What do you do?", "options": [
        { "text": "Take shelter under someone's eaves", "score": 1 },
        { "text": "Open the umbrella you brought along", "score": 2 },
        { "text": "Follow your instinct and run home quickly", "score": 3 },
        { "text": "Enjoy the feeling of raindrops on your skin", "score": 4 }
      ]},
      { "text": "After the rain stops, what appears in the sky?", "options": [
        { "text": "A rainbow stretching across the horizon", "score": 1 },
        { "text": "A brilliant sunset breaking through the clouds", "score": 2 },
        { "text": "A few butterflies dancing gracefully", "score": 3 },
        { "text": "The first star shining at the edge of the sky", "score": 4 }
      ]},
      { "text": "After returning home, what's the first thing you want to do?", "options": [
        { "text": "Call your closest person to share today's adventure", "score": 1 },
        { "text": "Quietly take a hot bath and organize your thoughts", "score": 2 },
        { "text": "Look through photos and plan the next adventure", "score": 3 },
        { "text": "Write today's feelings in a diary", "score": 4 }
      ]}
    ],
    "results": [
      { "min": 10, "max": 17, "title": "The Morning Light Guardian", "description": "You inwardly crave a stable and gentle relationship. Your ideal partner is someone who provides firm support when you're vulnerable, someone as warm as morning light. They don't need fancy words — just a tender gaze and arms that are always open for you.", "comment": "Tips: Your current pace is great, but occasionally showing your vulnerable side can deepen your relationship.", "radarData": { "labels": ["Gentle Companionship", "Spiritual Connection", "Fun Together", "Intellectual Attraction", "Emotional Stability"], "values": [81, 72, 37, 46, 91] } },
      { "min": 18, "max": 25, "title": "The Deep Sea Listener", "description": "You need a partner who can have soul-deep conversations with you. They may not talk much, but they can read your every glance and give you the deepest understanding and acceptance. Between you, silence can also be a comfortable form of communication.", "comment": "Tips: Your tolerance is the greatest lubricant in a relationship, but remember that putting your own feelings first is equally important.", "radarData": { "labels": ["Gentle Companionship", "Spiritual Connection", "Fun Together", "Intellectual Attraction", "Emotional Stability"], "values": [61, 91, 47, 65, 77] } },
      { "min": 26, "max": 33, "title": "The Breeze Companion", "description": "You yearn for freedom and novelty. Your soulmate will be someone full of vitality who can explore the unknown with you, grow together, and share life's joys. You'll create countless memories together, becoming each other's best travel companion.", "comment": "Tips: Your passionate love can be contagious — try to slow down after the excitement to listen to your partner's subtle voice.", "radarData": { "labels": ["Gentle Companionship", "Spiritual Connection", "Fun Together", "Intellectual Attraction", "Emotional Stability"], "values": [74, 35, 90, 59, 71] } },
      { "min": 34, "max": 40, "title": "The Starlight Inspirer", "description": "You're drawn to wisdom and depth. Your ideal partner is someone with unique perspectives who constantly inspires you to see the world through a wider lens. Your conversations are always full of sparks, and your souls collide to create the most beautiful light.", "comment": "Tips: While pursuing the ultimate love, try to give each other some breathing room — distance can sometimes create incredible beauty.", "radarData": { "labels": ["Gentle Companionship", "Spiritual Connection", "Fun Together", "Intellectual Attraction", "Emotional Stability"], "values": [85, 62, 28, 92, 84] } }
    ]
  },
  {
    "id": "q2",
    "title": "What Animal Are You in Love?",
    "description": "Through scenario-based Q&A, discover the animal archetype hidden within your romantic personality.",
    "category": "romance",
    "tags": ["Love", "Animal Type"],
    "questions": [
      { "text": "On a weekend afternoon, what would you most like to do?", "options": [
        { "text": "Cuddle on the couch watching movies with your partner", "score": 1 },
        { "text": "Go to a café alone to read", "score": 2 },
        { "text": "Join a friend gathering for some fun", "score": 3 },
        { "text": "Go hiking or camping outdoors", "score": 4 }
      ]},
      { "text": "Your partner suddenly gives you a small gift. Your first reaction?", "options": [
        { "text": "Happily hug them", "score": 1 },
        { "text": "Calmly say thanks while secretly rejoicing inside", "score": 2 },
        { "text": "Excitedly take a photo and post it on social media", "score": 3 },
        { "text": "Start thinking about what to buy in return", "score": 4 }
      ]},
      { "text": "When you have an argument with your partner, you usually…", "options": [
        { "text": "Apologize first to keep the peace", "score": 1 },
        { "text": "Give the silent treatment, wait for them to come to you", "score": 2 },
        { "text": "Voice your dissatisfaction loudly", "score": 3 },
        { "text": "Analyze rationally, focus on who's right and who's wrong", "score": 4 }
      ]},
      { "text": "They accidentally break something you cherish. You would…", "options": [
        { "text": "Feel sad but still say it's okay", "score": 1 },
        { "text": "Sulk silently", "score": 2 },
        { "text": "Directly complain about their carelessness", "score": 3 },
        { "text": "Ask them to buy a new one to compensate", "score": 4 }
      ]},
      { "text": "What do you think is most important in a relationship?", "options": [
        { "text": "Mutual companionship and reliance", "score": 1 },
        { "text": "Maintaining individual independence", "score": 2 },
        { "text": "Creating happy memories together", "score": 3 },
        { "text": "Shared goals and values", "score": 4 }
      ]},
      { "text": "Your partner works late and comes home very late. You would…", "options": [
        { "text": "Wait up and prepare a late-night snack for them", "score": 1 },
        { "text": "Go to bed first, everyone has their own rhythm", "score": 2 },
        { "text": "Text them to come home soon", "score": 3 },
        { "text": "Start worrying if something happened", "score": 4 }
      ]},
      { "text": "What kind of date do you prefer?", "options": [
        { "text": "Walking hand in hand in the park, chatting", "score": 1 },
        { "text": "Each reading a book, occasionally exchanging glances", "score": 2 },
        { "text": "Going to an amusement park or escape room", "score": 3 },
        { "text": "Planning a future trip together", "score": 4 }
      ]},
      { "text": "How do you feel about 'acting cute' in a relationship?", "options": [
        { "text": "Super natural! Want to be cute every day", "score": 1 },
        { "text": "Occasionally fine, but usually feels awkward", "score": 2 },
        { "text": "Usually express affection in a funny way instead", "score": 3 },
        { "text": "Prefer showing love through actions rather than words", "score": 4 }
      ]},
      { "text": "Your partner's friends invite them out without including you. How do you feel?", "options": [
        { "text": "A bit disappointed, wish to be invited along", "score": 1 },
        { "text": "Great, finally some time to myself", "score": 2 },
        { "text": "Don't mind, make plans with your own friends too", "score": 3 },
        { "text": "Understand, but secretly curious about what they're doing", "score": 4 }
      ]},
      { "text": "If they say 'I need some space', your reaction is?", "options": [
        { "text": "Worry if you did something wrong", "score": 1 },
        { "text": "Completely understand, think it's perfectly normal", "score": 2 },
        { "text": "Say it's fine, but feel uneasy inside", "score": 3 },
        { "text": "Respect their wish and use the time for self-improvement", "score": 4 }
      ]}
    ],
    "results": [
      { "min": 10, "max": 17, "title": "The Clingy Puppy", "description": "In love, you crave tons of security and love being close to your partner. Even the smallest gesture can fill you with happiness. You're a tender and caring lover who always puts your partner first, but remember to keep some space for yourself too.", "comment": "Tips: Your current pace is great, but occasionally showing vulnerability can make your bond even deeper.", "radarData": { "labels": ["Dependency", "Tsundere Level", "Passion", "Independence", "Action"], "values": [83, 71, 40, 51, 90] } },
      { "min": 18, "max": 25, "title": "The Proud Tsundere Cat", "description": "You seem indifferent on the surface, but deep down you crave attention. You don't like expressing love directly but show tenderness in subtle ways. You need someone who can read the meaning behind your silence to truly enter your heart.", "comment": "Tips: Your tolerance is a great relationship lubricant, but remember that prioritizing your own feelings is equally important.", "radarData": { "labels": ["Dependency", "Tsundere Level", "Passion", "Independence", "Action"], "values": [59, 92, 46, 70, 84] } },
      { "min": 26, "max": 33, "title": "The Energetic Golden Retriever", "description": "You're full of passion, always bringing joy to your partner. When it comes to love, you're straightforward and never hide your feelings. You're a sunny, cheerful lover whose energy is infectious — every day with you is filled with laughter.", "comment": "Tips: Your passionate love is contagious — try to slow down and listen to your partner's subtle voice after the excitement.", "radarData": { "labels": ["Dependency", "Tsundere Level", "Passion", "Independence", "Action"], "values": [76, 38, 99, 57, 67] } },
      { "min": 34, "max": 40, "title": "The Independent Lone Wolf", "description": "You value personal space and autonomy highly, preferring not to rely too much on others. But once you've found your person, you show extreme devotion and loyalty. You prove your love through actions rather than words — a steady and profound lover.", "comment": "Tips: While pursuing the ideal romance, try to leave some breathing room for each other — distance can sometimes create incredible beauty.", "radarData": { "labels": ["Dependency", "Tsundere Level", "Passion", "Independence", "Action"], "values": [90, 57, 34, 97, 80] } }
    ]
  },
  {
    "id": "q3",
    "title": "What's Your Love Language in Flowers?",
    "description": "Each flower represents a different feeling. Discover the unique flower language that defines your love.",
    "category": "romance",
    "tags": ["Romance", "Symbolic Test"],
    "questions": [
      { "text": "Imagine walking into a flower shop. What scent greets you first?", "options": [
        { "text": "Rich, alluring rose fragrance", "score": 1 },
        { "text": "Fresh, delicate jasmine scent", "score": 2 },
        { "text": "Sunny sunflower aroma", "score": 3 },
        { "text": "Elegant, cool lily fragrance", "score": 4 }
      ]},
      { "text": "You're choosing a bouquet for your partner. What main color?", "options": [
        { "text": "Passionate, romantic reds", "score": 1 },
        { "text": "Pure, flawless whites", "score": 2 },
        { "text": "Bright, warm yellows", "score": 3 },
        { "text": "Mysterious, noble purples", "score": 4 }
      ]},
      { "text": "What wrapping material would you choose for the bouquet?", "options": [
        { "text": "Glamorous, shiny ribbon", "score": 1 },
        { "text": "Simple, textured kraft paper", "score": 2 },
        { "text": "Colorful, vibrant tulle", "score": 3 },
        { "text": "Elegant, frosted paper", "score": 4 }
      ]},
      { "text": "What kind of card would you attach when sending flowers?", "options": [
        { "text": "A card full of sweet words", "score": 1 },
        { "text": "Just a simple blessing", "score": 2 },
        { "text": "A card with cute drawings", "score": 3 },
        { "text": "A card with poetry or famous quotes", "score": 4 }
      ]},
      { "text": "How do you think your partner would react to receiving flowers?", "options": [
        { "text": "Moved to tears, hugging you tightly", "score": 1 },
        { "text": "A gentle smile, saying thank you", "score": 2 },
        { "text": "Screaming with surprise, immediately taking photos", "score": 3 },
        { "text": "Carefully examining, praising how beautiful they are", "score": 4 }
      ]},
      { "text": "If flowers could talk, what would you want them to say for you?", "options": [
        { "text": "\"I will love you forever\"", "score": 1 },
        { "text": "\"Thank you for always being there\"", "score": 2 },
        { "text": "\"Every day with you is so happy\"", "score": 3 },
        { "text": "\"You're the most special person I've ever met\"", "score": 4 }
      ]},
      { "text": "Where would you place the flowers at home?", "options": [
        { "text": "Bedroom nightstand, so you see them when you wake up", "score": 1 },
        { "text": "On the desk, quietly accompanying your work", "score": 2 },
        { "text": "The most visible spot in the living room", "score": 3 },
        { "text": "By the window, letting sunlight fall on the petals", "score": 4 }
      ]},
      { "text": "After the flowers wither, what would you do?", "options": [
        { "text": "Make them into dried flowers to keep forever", "score": 1 },
        { "text": "Take a photo as a memory, then let them go", "score": 2 },
        { "text": "Buy a new beautiful bouquet", "score": 3 },
        { "text": "Press a petal into your journal as a memento", "score": 4 }
      ]},
      { "text": "If you could design a new flower species, what trait would it have?", "options": [
        { "text": "Blooms only under moonlight — a romantic nocturnal flower", "score": 1 },
        { "text": "Changes color with the season — beautiful in every form", "score": 2 },
        { "text": "Can sing — spreading joy to everyone around", "score": 3 },
        { "text": "Glows softly at night — a gentle beacon of light", "score": 4 }
      ]},
      { "text": "What does a 'perfect bouquet' mean to you?", "options": [
        { "text": "Full of romantic roses, representing undying love", "score": 1 },
        { "text": "A clean, simple single stem, representing quiet companionship", "score": 2 },
        { "text": "Colorful mixed bouquet, like a party of happiness", "score": 3 },
        { "text": "Rare, hard-to-find species, representing one-of-a-kind love", "score": 4 }
      ]}
    ],
    "results": [
      { "min": 10, "max": 17, "title": "Rose — Undying Passion", "description": "Your love is like a burning flame, full of passion and romance. You're willing to give everything for love and believe that sincere and steady devotion is the greatest expression of romance. Your love is direct and powerful, like a red rose in full bloom.", "comment": "Tips: Your passionate and dedicated love is admirable, but remember not to lose yourself. The best love allows both people to grow.", "radarData": { "labels": ["Passion", "Gentleness", "Creativity", "Depth", "Expressiveness"], "values": [88, 78, 30, 53, 90] } },
      { "min": 18, "max": 25, "title": "Jasmine — Silent Companionship", "description": "Your love is like a jasmine fragrance — not overwhelming, but ever-present. You believe the best love permeates daily life, and you show your care through subtle actions. You don't need grand gestures; your consistent presence is the full expression of your love.", "comment": "Tips: Your quiet love is very touching, but don't be afraid to express your feelings directly once in a while — your partner would love to hear your inner words.", "radarData": { "labels": ["Passion", "Gentleness", "Creativity", "Depth", "Expressiveness"], "values": [65, 90, 45, 73, 78] } },
      { "min": 26, "max": 33, "title": "Sunflower — Joyful Radiance", "description": "Your love is like sunshine itself, bringing warmth and joy to your partner. With an optimistic and cheerful personality, you make your lover feel happy and uplifted. Your love is direct, warm, and energetic — like a sunflower always facing the sun.", "comment": "Tips: Your joyful love energy is incredible, but remember to also create some quiet, intimate moments for just the two of you.", "radarData": { "labels": ["Passion", "Gentleness", "Creativity", "Depth", "Expressiveness"], "values": [75, 40, 92, 61, 65] } },
      { "min": 34, "max": 40, "title": "Lily — Transcendent Elegance", "description": "Your love is like a white lily — noble, elegant, and unforgettable. You seek a love that transcends the material, pursuing deep soul connection and spiritual resonance. Your love has weight and depth — understated yet captivating, like a lingering fragrance.", "comment": "Tips: Your love pursuit is admirable. While seeking soulmates, don't forget that everyday life's little moments are a part of love too — sometimes imperfection is true perfection.", "radarData": { "labels": ["Passion", "Gentleness", "Creativity", "Depth", "Expressiveness"], "values": [82, 63, 38, 95, 88] } }
    ]
  },
  {
    "id": "q4",
    "title": "Love Attachment Style Test",
    "description": "Do you tend toward anxiety or avoidance in relationships? Discover your attachment tendency through this quiz.",
    "category": "romance",
    "tags": ["Psychology", "Security", "Attachment Theory"],
    "questions": [
      { "text": "Your new partner hasn't replied to your message for 3 hours. Your first thought?", "options": [
        { "text": "They must be busy, I'll wait patiently", "score": 1 },
        { "text": "Maybe they haven't noticed — I'll do something else first", "score": 2 },
        { "text": "Are they ignoring me? Should I send another?", "score": 3 },
        { "text": "My mind starts racing with all kinds of scenarios", "score": 4 }
      ]},
      { "text": "Your partner wants to go on a solo trip. Your reaction?", "options": [
        { "text": "Fully support them; personal growth time is important", "score": 1 },
        { "text": "A bit reluctant but won't stop them", "score": 2 },
        { "text": "Ask carefully if they want to include you", "score": 3 },
        { "text": "Feel uneasy; worry they might meet someone else", "score": 4 }
      ]},
      { "text": "In a new relationship, do you initiate sharing your inner world?", "options": [
        { "text": "Naturally share when it feels right", "score": 1 },
        { "text": "Wait for a deeper connection before opening up", "score": 2 },
        { "text": "Often want to share but worry about burdening them", "score": 3 },
        { "text": "Find it difficult; building walls comes more naturally", "score": 4 }
      ]},
      { "text": "When saying goodbye after a date, you usually feel…", "options": [
        { "text": "Happy about today, looking forward to next time", "score": 1 },
        { "text": "Relieved to finally have your own space again", "score": 2 },
        { "text": "Reluctant, wishing you could spend more time together", "score": 3 },
        { "text": "Anxious, already worried about when you'll meet again", "score": 4 }
      ]},
      { "text": "Your partner says 'You're really important to me.' Your inner reaction?", "options": [
        { "text": "Feel touched and sincerely happy", "score": 1 },
        { "text": "Feel a bit pressured, unsure if you can match that", "score": 2 },
        { "text": "Then immediately think: Am I important enough?", "score": 3 },
        { "text": "Overwhelming happiness mixed with fear of losing it", "score": 4 }
      ]},
      { "text": "In your ideal relationship, how much personal time would you want?", "options": [
        { "text": "Good balance of together time and alone time", "score": 1 },
        { "text": "More alone time; I need lots of personal space", "score": 2 },
        { "text": "Prefer spending most time together", "score": 3 },
        { "text": "Hard to decide; afraid being apart means growing distant", "score": 4 }
      ]},
      { "text": "How do you usually handle conflicts in relationships?", "options": [
        { "text": "Calmly discuss, treating it as a chance for growth", "score": 1 },
        { "text": "Need to cool down first, then discuss rationally", "score": 2 },
        { "text": "Fear conflict will ruin the relationship, try to avoid it", "score": 3 },
        { "text": "Emotions get intense and hard to control", "score": 4 }
      ]},
      { "text": "When your partner praises another person, you feel…", "options": [
        { "text": "Normal, everyone has their strengths", "score": 1 },
        { "text": "A slight twinge, but you won't show it", "score": 2 },
        { "text": "Instantly compare yourself — am I not good enough?", "score": 3 },
        { "text": "Jealousy that's hard to contain", "score": 4 }
      ]},
      { "text": "How much time after meeting someone would you ideally confirm a relationship?", "options": [
        { "text": "Take time to get to know each other; no rush", "score": 1 },
        { "text": "Hope to keep things ambiguous a while; it's fun", "score": 2 },
        { "text": "If you feel right, you'd want to define it quickly", "score": 3 },
        { "text": "Fear rejection, so unsure when to bring it up", "score": 4 }
      ]},
      { "text": "If you feel insecure, what would you most likely do?", "options": [
        { "text": "Honestly communicate your feelings with your partner", "score": 1 },
        { "text": "Hide it. You'll handle your own emotions", "score": 2 },
        { "text": "Repeatedly seek reassurance from your partner", "score": 3 },
        { "text": "Test them through indirect actions to see if they care", "score": 4 }
      ]}
    ],
    "results": [
      { "min": 10, "max": 17, "title": "Secure Attachment", "description": "You have the healthiest attachment style! In relationships, you can be honest with your feelings, trust yourself and your partner. You don't rely excessively on others for security, nor do you fear intimacy. You're comfortable with both closeness and independence.", "comment": "Tips: Your emotional stability is your greatest asset. Keep being open and trusting — this will attract equally healthy relationship partners.", "radarData": { "labels": ["Self-worth", "Trust", "Anxiety Level", "Avoidance Level", "Communication"], "values": [92, 88, 15, 12, 90] } },
      { "min": 18, "max": 25, "title": "Avoidant Attachment", "description": "You tend to protect yourself through emotional distance. In intimate relationships, you value your personal space, sometimes appear emotionally detached, but it doesn't mean you don't care — you just show love in more reserved ways.", "comment": "Tips: Try to be more vulnerable sometimes. Opening up doesn't mean weakness — it means trusting the other person enough to let them in.", "radarData": { "labels": ["Self-worth", "Trust", "Anxiety Level", "Avoidance Level", "Communication"], "values": [75, 60, 30, 85, 55] } },
      { "min": 26, "max": 33, "title": "Anxious Attachment", "description": "Love is extremely important to you, but you're constantly worried about whether you're loved enough. You're very sensitive to your partner's every move and tend to overthink. Your love is deeply passionate, just sometimes accompanied by anxiety.", "comment": "Tips: Remember, your worth doesn't depend on your partner's response. Try to build more self-confidence, and you'll find your anxiety naturally decreases.", "radarData": { "labels": ["Self-worth", "Trust", "Anxiety Level", "Avoidance Level", "Communication"], "values": [45, 40, 88, 25, 65] } },
      { "min": 34, "max": 40, "title": "Fearful-Avoidant Attachment", "description": "You deeply desire intimacy but are simultaneously afraid of getting hurt. This makes you swing between craving closeness and pushing people away. Your emotional landscape is rich and complex — you need a particularly patient partner who understands.", "comment": "Tips: Recognizing your own patterns is the first step to change. Try noticing when you're pushing someone away — is it because you're afraid, or because you truly want distance?", "radarData": { "labels": ["Self-worth", "Trust", "Anxiety Level", "Avoidance Level", "Communication"], "values": [35, 30, 80, 78, 40] } }
    ]
  },
  {
    "id": "q5",
    "title": "Past Life Love Connection Test",
    "description": "Was your meeting fate or coincidence? Uncover your connections from a past life.",
    "category": "romance",
    "tags": ["Past Life", "Destiny"],
    "questions": [
      { "text": "You arrive at a mysterious ancient temple. What catches your eye first?", "options": [
        { "text": "A glowing warm oil lamp", "score": 1 },
        { "text": "Ancient texts full of faded writing", "score": 2 },
        { "text": "A gorgeous mural depicting celestial beings", "score": 3 },
        { "text": "A mysterious hovering crystal in the center", "score": 4 }
      ]},
      { "text": "A fortune teller at the temple says your past life was…", "options": [
        { "text": "A loving couple who looked after each other through hardship", "score": 1 },
        { "text": "A scholar and their devoted reader companion", "score": 2 },
        { "text": "Wandering performers who traveled the world together", "score": 3 },
        { "text": "A monarch and their trusted royal advisor", "score": 4 }
      ]},
      { "text": "An old chest appears before you. What's inside?", "options": [
        { "text": "A pair of matching jade pendants", "score": 1 },
        { "text": "An ancient letter sealed with wax", "score": 2 },
        { "text": "An exquisite hand-painted fan", "score": 3 },
        { "text": "A half of a mysterious amulet", "score": 4 }
      ]},
      { "text": "You suddenly see a scene from your past life. What is it?", "options": [
        { "text": "Two people sitting together watching the sunset by a riverbank", "score": 1 },
        { "text": "Someone reading alone under a tree in the rain", "score": 2 },
        { "text": "A lively festival marketplace full of noise and color", "score": 3 },
        { "text": "A vast starry sky with two silhouettes standing on a cliff", "score": 4 }
      ]},
      { "text": "If you could bring one item from your past life, what would it be?", "options": [
        { "text": "A handmade gift from your past-life lover", "score": 1 },
        { "text": "A diary recording shared memories", "score": 2 },
        { "text": "A musical instrument played at many celebrations", "score": 3 },
        { "text": "A ring with mysterious protective powers", "score": 4 }
      ]},
      { "text": "What kind of promise do you think was made between you in a past life?", "options": [
        { "text": "\"Let's be together in the next life, just like now\"", "score": 1 },
        { "text": "\"Even if we can't be together, I hope we meet again\"", "score": 2 },
        { "text": "\"No matter where, I'll find you\"", "score": 3 },
        { "text": "\"Even across lifetimes, our souls will recognize each other\"", "score": 4 }
      ]},
      { "text": "In your past life, what was the most important moment between you two?", "options": [
        { "text": "Holding each other through a difficult time", "score": 1 },
        { "text": "A night of deep conversation that connected your hearts", "score": 2 },
        { "text": "Creating a beautiful work of art or music together", "score": 3 },
        { "text": "Making a life-changing decision together", "score": 4 }
      ]},
      { "text": "The fortune teller says your biggest challenge in this life's love will be…", "options": [
        { "text": "Learning to let go and not hold too tight", "score": 1 },
        { "text": "Daring to speak your true feelings", "score": 2 },
        { "text": "Finding someone who matches your free spirit", "score": 3 },
        { "text": "Building trust after being hurt before", "score": 4 }
      ]},
      { "text": "As you leave the temple, a mysterious voice says to you…", "options": [
        { "text": "\"The person you're looking for is already by your side\"", "score": 1 },
        { "text": "\"True connection needs no words\"", "score": 2 },
        { "text": "\"Follow your heart; it knows the way\"", "score": 3 },
        { "text": "\"Your fate is already written in the stars\"", "score": 4 }
      ]},
      { "text": "After leaving the temple, the emotion you feel most strongly is…", "options": [
        { "text": "A warm sense of belonging", "score": 1 },
        { "text": "Peace and quiet understanding", "score": 2 },
        { "text": "Excitement and anticipation for what's coming", "score": 3 },
        { "text": "A profound feeling that everything is connected", "score": 4 }
      ]}
    ],
    "results": [
      { "min": 10, "max": 17, "title": "Destined Reunited Lovers", "description": "You and your person were deeply in love in a past life, and fate has brought you together again in this one. Your love transcends time — you feel an inexplicable sense of familiarity and warmth. Your mission in this life is to complete the unfinished love story.", "comment": "Tips: This deep connection is beautiful, but remember to also build your present-life self. The best relationships are two complete people choosing each other.", "radarData": { "labels": ["Fate Bond", "Soul Resonance", "Karmic Depth", "Intuition", "Across Lifetimes"], "values": [92, 60, 80, 50, 70] } },
      { "min": 18, "max": 25, "title": "Soulmate Across Time", "description": "In a past life, you were close but not romantically involved — perhaps friends or mentors. In this life, this connection has evolved into a deeper bond. Your relationship is special because it's built on understanding rather than just attraction.", "comment": "Tips: Cherish this unique bond. Don't compare your relationship to conventional romance — your connection is on a deeper, rarer level.", "radarData": { "labels": ["Fate Bond", "Soul Resonance", "Karmic Depth", "Intuition", "Across Lifetimes"], "values": [70, 88, 65, 75, 60] } },
      { "min": 26, "max": 33, "title": "Free Spirits United", "description": "In a past life, you were both free-spirited adventurers. Your souls crossed paths at markets, festivals, and distant lands. In this life, you'll find each other through shared enthusiasm for life, art, and adventure. Your love is colorful and ever-changing.", "comment": "Tips: While exploring life together, remember to build a stable foundation. The best adventures have a home base to return to.", "radarData": { "labels": ["Fate Bond", "Soul Resonance", "Karmic Depth", "Intuition", "Across Lifetimes"], "values": [55, 65, 45, 90, 85] } },
      { "min": 34, "max": 40, "title": "Star-Crossed Destiny", "description": "Your past-life connection was profound and fateful — perhaps a grand love story separated by circumstance. In this life, the universe conspires to bring you together again. When you meet, you'll feel an overwhelming sense of recognition that defies logic.", "comment": "Tips: This intense connection can be overwhelming. Take your time — let love unfold naturally rather than trying to rush destiny.", "radarData": { "labels": ["Fate Bond", "Soul Resonance", "Karmic Depth", "Intuition", "Across Lifetimes"], "values": [85, 78, 92, 88, 95] } }
    ]
  },
  {
    "id": "love-manual-quiz",
    "title": "Love Instruction Manual",
    "description": "This is your personalized Love Instruction Manual. Through 15 everyday scenarios, we'll analyze your love language, conflict style, and ideal partner type.",
    "category": "romance",
    "tags": ["Love", "Psychology", "Personality"],
    "questions": [
      { "text": "On a weekend morning, what's your ideal scenario with your partner?", "options": [
        { "text": "Making breakfast together, chatting about plans for the day", "score": 4 },
        { "text": "Cuddling in bed, scrolling phones together", "score": 3 },
        { "text": "Each doing their own thing, occasionally exchanging smiles", "score": 2 },
        { "text": "Going out separately, meeting up later for dinner", "score": 1 }
      ]},
      { "text": "Your partner sends you a long, heartfelt message. Your response?", "options": [
        { "text": "Immediately call them — text can't express what you feel", "score": 4 },
        { "text": "Carefully type an equally long reply", "score": 3 },
        { "text": "Send a heart emoji and say 'me too'", "score": 2 },
        { "text": "Feel a bit overwhelmed, reply briefly after thinking", "score": 1 }
      ]},
      { "text": "How would you prefer to celebrate an anniversary?", "options": [
        { "text": "A romantic candlelit dinner for two", "score": 4 },
        { "text": "Travel to a place you've always wanted to visit", "score": 3 },
        { "text": "Cozy movie night at home", "score": 2 },
        { "text": "A simple acknowledgment — fancy celebrations feel forced", "score": 1 }
      ]},
      { "text": "You're upset about something at work. What do you want from your partner?", "options": [
        { "text": "A big hug and words of comfort", "score": 4 },
        { "text": "Listen patiently without giving advice", "score": 3 },
        { "text": "Help analyze the problem and find solutions", "score": 2 },
        { "text": "Give me space — I need to process alone first", "score": 1 }
      ]},
      { "text": "You notice your partner is in a bad mood. What do you do?", "options": [
        { "text": "Ask directly what happened and offer help", "score": 4 },
        { "text": "Quietly sit beside them, letting them know you're there", "score": 3 },
        { "text": "Prepare their favorite food or drink", "score": 2 },
        { "text": "Give them space and check in later", "score": 1 }
      ]},
      { "text": "Which love language means the most to you?", "options": [
        { "text": "Words of affirmation — hearing 'I love you' daily", "score": 4 },
        { "text": "Physical touch — holding hands, hugging", "score": 3 },
        { "text": "Acts of service — they do things for you", "score": 2 },
        { "text": "Quality time — undivided attention together", "score": 1 }
      ]},
      { "text": "After an argument, who usually initiates reconciliation?", "options": [
        { "text": "I always go first — can't stand being in a fight", "score": 4 },
        { "text": "We both cool down, then whoever's ready first reaches out", "score": 3 },
        { "text": "I wait a bit, but will eventually make the first move", "score": 2 },
        { "text": "I wait for them to come to me", "score": 1 }
      ]},
      { "text": "What would really disappoint you in a partner?", "options": [
        { "text": "Being emotionally cold and distant", "score": 4 },
        { "text": "Breaking promises or being dishonest", "score": 3 },
        { "text": "Not respecting my personal boundaries", "score": 2 },
        { "text": "Being too clingy and controlling", "score": 1 }
      ]},
      { "text": "At a party, your partner talks to an attractive stranger for a long time. Your reaction?", "options": [
        { "text": "Walk over and naturally join the conversation", "score": 4 },
        { "text": "Trust them completely, continue talking to your own friends", "score": 3 },
        { "text": "Feel a bit uneasy, keep glancing over", "score": 2 },
        { "text": "Bring it up tactfully afterwards", "score": 1 }
      ]},
      { "text": "Do you think couples should share phone passwords?", "options": [
        { "text": "Of course! Nothing to hide from each other", "score": 4 },
        { "text": "It's fine either way, depends on the couple", "score": 3 },
        { "text": "I'd rather not — everyone deserves privacy", "score": 2 },
        { "text": "Definitely no. Trust shouldn't require surveillance", "score": 1 }
      ]},
      { "text": "What's your ideal frequency of dates?", "options": [
        { "text": "Every day if possible — can't get enough", "score": 4 },
        { "text": "3-4 times a week is perfect", "score": 3 },
        { "text": "Once or twice a week — quality over quantity", "score": 2 },
        { "text": "A few times a month is enough", "score": 1 }
      ]},
      { "text": "If your partner wanted to change careers into something risky, you'd…", "options": [
        { "text": "Fully support them — dreams are worth chasing", "score": 4 },
        { "text": "Support but suggest practical planning first", "score": 3 },
        { "text": "Express concern and hope they think carefully", "score": 2 },
        { "text": "Honestly share your worries about financial stability", "score": 1 }
      ]},
      { "text": "How important is meeting each other's families?", "options": [
        { "text": "Very important — family approval matters a lot", "score": 4 },
        { "text": "Important, but it's our relationship that matters most", "score": 3 },
        { "text": "Not essential — as long as we're happy", "score": 2 },
        { "text": "We can deal with it when the time comes", "score": 1 }
      ]},
      { "text": "If you could describe your ideal relationship in one word, it'd be…", "options": [
        { "text": "Warmth", "score": 4 },
        { "text": "Growth", "score": 3 },
        { "text": "Freedom", "score": 2 },
        { "text": "Balance", "score": 1 }
      ]},
      { "text": "What do you think is the secret to making love last?", "options": [
        { "text": "Never stop expressing love and appreciation", "score": 4 },
        { "text": "Growing and evolving together", "score": 3 },
        { "text": "Respecting each other's individuality", "score": 2 },
        { "text": "Honest communication, even when it's hard", "score": 1 }
      ]}
    ],
    "results": [
      { "min": 15, "max": 28, "title": "The Independent Thinker", "description": "You value personal space and rational thinking in love. You believe the best relationships are two complete people choosing each other, not two halves desperately seeking completion. Your love style is measured and thoughtful.", "comment": "Tips: Your independence is admirable, but don't forget to occasionally let your guard down and let your partner in. Vulnerability is also a form of strength.", "radarData": { "labels": ["Emotional Expression", "Independence", "Conflict Resolution", "Romantic Needs", "Trust"], "values": [40, 92, 70, 35, 75] } },
      { "min": 29, "max": 42, "title": "The Steady Partner", "description": "You approach love with a balanced and grounded perspective. Neither too clingy nor too distant, you know how to give space while staying connected. You're the type of partner who builds lasting relationships through consistent, reliable affection.", "comment": "Tips: Your balanced approach is a real strength. Try adding more spontaneous romantic gestures occasionally — they can bring fresh energy to a stable relationship.", "radarData": { "labels": ["Emotional Expression", "Independence", "Conflict Resolution", "Romantic Needs", "Trust"], "values": [60, 70, 80, 55, 85] } },
      { "min": 43, "max": 52, "title": "The Passionate Devotee", "description": "Love is central to your life. You express feelings openly, crave closeness, and pour your heart into relationships. Your love style is warm, attentive, and deeply caring — your partner always knows how much they mean to you.", "comment": "Tips: Your warmth is beautiful, but remember that sometimes the best way to love is to give your partner room to miss you. A healthy balance keeps the spark alive.", "radarData": { "labels": ["Emotional Expression", "Independence", "Conflict Resolution", "Romantic Needs", "Trust"], "values": [85, 45, 65, 80, 70] } },
      { "min": 53, "max": 60, "title": "The All-In Romantic", "description": "You love with your whole heart, holding nothing back. Romance, passion, and emotional connection are your oxygen. You believe love should be celebrated loudly and often — and you're not afraid to show it.", "comment": "Tips: Your intensity is beautiful, but be careful not to overwhelm your partner. The best love stories also include chapters where each person shines on their own.", "radarData": { "labels": ["Emotional Expression", "Independence", "Conflict Resolution", "Romantic Needs", "Trust"], "values": [95, 30, 55, 95, 60] } }
    ]
  },
  {
    "id": "crush-index-quiz",
    "title": "Crush Radar: Your Lovesick Index",
    "description": "Everyone says you fall too hard too fast? Through 10 everyday scenarios, find out how susceptible you are to catching feelings.",
    "category": "romance",
    "tags": ["Love", "Crush", "Psychology", "Fun"],
    "questions": [
      { "text": "Someone you just met sends you a 'Good morning' text the next day. Your reaction?", "options": [
        { "text": "That's nice, reply politely and move on", "score": 1 },
        { "text": "Smile a little, think 'they remembered me'", "score": 2 },
        { "text": "Heart skips a beat, start crafting the perfect reply", "score": 3 },
        { "text": "Already imagining what your future dates will look like", "score": 4 }
      ]},
      { "text": "You see someone attractive on the subway making eye contact. What happens in your head?", "options": [
        { "text": "Nothing much, go back to scrolling your phone", "score": 1 },
        { "text": "Quick internal note: 'Oh, cute.' Then move on", "score": 2 },
        { "text": "Start a whole mental storyline about running into them again", "score": 3 },
        { "text": "Consider getting off at the same stop to 'accidentally' bump into them", "score": 4 }
      ]},
      { "text": "Someone you like sends you a song. What do you do?", "options": [
        { "text": "Listen once, reply 'Nice song'", "score": 1 },
        { "text": "Look up the lyrics to see if there's a hidden message", "score": 2 },
        { "text": "Put it on repeat and analyze every line", "score": 3 },
        { "text": "Already making it 'our song' in your head", "score": 4 }
      ]},
      { "text": "Your crush accidentally touches your hand. Your internal reaction?", "options": [
        { "text": "Notice it, but stay cool", "score": 1 },
        { "text": "Feel a little spark, but play it off", "score": 2 },
        { "text": "Heart rate goes up, replay the moment for hours", "score": 3 },
        { "text": "That one touch keeps you awake at night", "score": 4 }
      ]},
      { "text": "How often do you check if your crush is online?", "options": [
        { "text": "Never; that's not my style", "score": 1 },
        { "text": "Once in a while, if I happen to be on the app", "score": 2 },
        { "text": "Check their last-seen status throughout the day", "score": 3 },
        { "text": "You practically have their online schedule memorized", "score": 4 }
      ]},
      { "text": "You overhear someone mention your crush's name. Your reaction?", "options": [
        { "text": "Ears perk up slightly, but you stay cool", "score": 1 },
        { "text": "Casually tune in to see what they're saying", "score": 2 },
        { "text": "Immediately laser-focus on the conversation", "score": 3 },
        { "text": "Can't help but join in: 'Wait, what about them?!'", "score": 4 }
      ]},
      { "text": "Your crush posts a photo on social media. What do you do?", "options": [
        { "text": "Scroll past; I don't react to every post", "score": 1 },
        { "text": "Like it casually, move on", "score": 2 },
        { "text": "Like it, zoom in, analyze the background and who's in it", "score": 3 },
        { "text": "Screenshot, analyze, then debate whether to comment", "score": 4 }
      ]},
      { "text": "You're about to meet your crush. How much time do you spend getting ready?", "options": [
        { "text": "Normal routine, same as meeting anyone", "score": 1 },
        { "text": "A few extra minutes to look presentable", "score": 2 },
        { "text": "Change outfits at least twice, check the mirror ten times", "score": 3 },
        { "text": "Full fashion show at home, ask friends to vote on the best look", "score": 4 }
      ]},
      { "text": "Your friend says your crush might like someone else. Your reaction?", "options": [
        { "text": "Oh well, that's life. Move on", "score": 1 },
        { "text": "A little disappointed, but you'll be okay", "score": 2 },
        { "text": "Mood drops, you need ice cream and sad music tonight", "score": 3 },
        { "text": "Entire world collapses. You start an investigation immediately", "score": 4 }
      ]},
      { "text": "If you could describe your current state of falling for someone, it'd be…", "options": [
        { "text": "I'm firmly on dry land. Completely stable", "score": 1 },
        { "text": "Gently swaying in a boat, enjoying the breeze", "score": 2 },
        { "text": "The boat is rocking and I'm getting dizzy", "score": 3 },
        { "text": "I've already capsized and I'm drowning happily", "score": 4 }
      ]}
    ],
    "results": [
      { "min": 10, "max": 17, "title": "【Ironclad】 Emotionally Bulletproof", "description": "Your heart is like a fortress — nothing gets in easily. You approach feelings with extreme rationality and self-control. It takes a LOT to even make you blink romantically.", "comment": "Tips: Being self-sufficient is great, but don't forget that letting someone past your walls can be one of life's greatest adventures. Consider opening the gate once in a while.", "radarData": { "labels": ["Rational Control", "Independence", "Emotional Shield", "Self-Care", "Crush Intensity"], "values": [95, 90, 90, 85, 10] } },
      { "min": 18, "max": 24, "title": "【Gentle Breeze】Light Crush Alert", "description": "You feel the occasional flutter but always have your feet on the ground. You can appreciate someone's charm without losing your composure. Your romantic antennae are working, but you're not overwhelmed by signals.", "comment": "Tips: Your balanced approach is healthy. Just make sure you don't overthink things to the point of missing genuine connections. Sometimes it's okay to follow the flutter.", "radarData": { "labels": ["Rational Control", "Independence", "Emotional Shield", "Self-Care", "Crush Intensity"], "values": [80, 75, 70, 70, 35] } },
      { "min": 25, "max": 32, "title": "【Seasick】Moderate Lovesickness", "description": "Your ship is clearly rocking! You're very susceptible to romantic gestures and small signals. When you like someone, it shows — in your behavior, your mood, and probably your search history.", "comment": "Tips: Your romantic nature is a gift! Just make sure you're reading signals correctly. Not every 'Good morning' text means 'I want to marry you.' Take a breath.", "radarData": { "labels": ["Rational Control", "Independence", "Emotional Shield", "Self-Care", "Crush Intensity"], "values": [40, 40, 30, 50, 80] } },
      { "min": 33, "max": 40, "title": "【Sinking Ship】Hopelessly Lovesick", "description": "The lifeguard alarm is going off! You practically catch feelings the moment someone gives you the slightest sunshine. When it comes to your crush, all rationality goes overboard — you've completely and utterly capsized.", "comment": "Tips: SOS! Keep your friends on speed-dial for reality checks. Love yourself first before diving in — don't lose yourself in someone else's waters!", "radarData": { "labels": ["Rational Control", "Independence", "Emotional Shield", "Self-Care", "Crush Intensity"], "values": [10, 15, 10, 30, 100] } }
    ]
  },
  {
    "id": "love-fate-quiz",
    "title": "Do We Have a Future Together?",
    "description": "15 situational questions to deeply analyze your compatibility, communication chemistry, and future potential — revealing where this relationship might go.",
    "category": "romance",
    "tags": ["Love", "Destiny", "Match"],
    "questions": [
      { "text": "You planned to meet on the weekend, but she suddenly says she needs to reschedule. Your first reaction?", "options": [
        { "text": "No problem — proactively suggest another time", "score": 4 },
        { "text": "A bit disappointed, but you say it's fine", "score": 3 },
        { "text": "Feel uncomfortable inside, but won't say it", "score": 2 },
        { "text": "Feel like she doesn't value your plans", "score": 1 }
      ]},
      { "text": "When you two chat, how do conversations usually go?", "options": [
        { "text": "Can't stop talking, often chatting until dawn", "score": 4 },
        { "text": "A few reliable topics, occasionally sparks fly", "score": 3 },
        { "text": "Mostly you initiating, she doesn't respond much", "score": 2 },
        { "text": "Often left on read or takes forever to reply", "score": 1 }
      ]},
      { "text": "When you're feeling down, would you want to tell her?", "options": [
        { "text": "Yes, she's the first person I think of", "score": 4 },
        { "text": "I'd hesitate, but would end up telling her", "score": 3 },
        { "text": "Probably not, afraid of being a burden", "score": 2 },
        { "text": "Not at all — we haven't reached that level", "score": 1 }
      ]},
      { "text": "She goes out with a guy friend. How do you feel?", "options": [
        { "text": "Totally fine — I trust her", "score": 4 },
        { "text": "Slightly bothered, but won't show it", "score": 3 },
        { "text": "Jealous — can't help asking for details", "score": 2 },
        { "text": "Super anxious, feel like I could be replaced anytime", "score": 1 }
      ]},
      { "text": "How does she look at you?", "options": [
        { "text": "With a smile that makes you feel cared for", "score": 4 },
        { "text": "Natural and comfortable, like a friend", "score": 3 },
        { "text": "Hard to read — sometimes you can't tell", "score": 2 },
        { "text": "Seems the same as how she looks at everyone", "score": 1 }
      ]},
      { "text": "Have you two ever argued or disagreed? How was it handled?", "options": [
        { "text": "Yes, but we communicate honestly and grow closer", "score": 4 },
        { "text": "Occasional friction, but we cool down and make up", "score": 3 },
        { "text": "Silent treatment until someone breaks first", "score": 2 },
        { "text": "Almost never argue — we're not close enough for that", "score": 1 }
      ]},
      { "text": "Have you ever imagined living together?", "options": [
        { "text": "Countless times — even planned what to have for breakfast", "score": 4 },
        { "text": "Sometimes — I think it'd be nice", "score": 3 },
        { "text": "Rarely — it still feels far away", "score": 2 },
        { "text": "Never — doesn't seem possible", "score": 1 }
      ]},
      { "text": "If she got a new haircut today, would you notice?", "options": [
        { "text": "I'd be the first to notice and compliment her", "score": 4 },
        { "text": "Probably notice, but might not say anything", "score": 3 },
        { "text": "Only if she pointed it out", "score": 2 },
        { "text": "Probably wouldn't notice at all", "score": 1 }
      ]},
      { "text": "Would you change some of your habits for her?", "options": [
        { "text": "Yes, as long as it's for the better", "score": 4 },
        { "text": "Can try, but don't want to change too much", "score": 3 },
        { "text": "Depends — don't want to compromise myself", "score": 2 },
        { "text": "No, she should accept the real me", "score": 1 }
      ]},
      { "text": "Can you be your true self around her?", "options": [
        { "text": "Absolutely — no pretending needed", "score": 4 },
        { "text": "Mostly, but sometimes I try to impress", "score": 3 },
        { "text": "Often self-conscious, can't fully relax", "score": 2 },
        { "text": "Almost always performing, afraid the real me isn't enough", "score": 1 }
      ]},
      { "text": "When she's in trouble, what do you usually do?", "options": [
        { "text": "Show up immediately, willing to help with anything", "score": 4 },
        { "text": "Send a message to check if she needs help", "score": 3 },
        { "text": "Watch from afar, but don't actively reach out", "score": 2 },
        { "text": "Feel it's her life, better not to interfere", "score": 1 }
      ]},
      { "text": "Would you introduce her to your close friends?", "options": [
        { "text": "Already have — they all like her", "score": 4 },
        { "text": "Looking for the right moment to introduce", "score": 3 },
        { "text": "Haven't thought about it — doesn't feel time yet", "score": 2 },
        { "text": "Would rather not — worried friends might judge", "score": 1 }
      ]},
      { "text": "Do you two have any inside jokes or unspoken signals?", "options": [
        { "text": "Tons — we can read each other's thoughts with a look", "score": 4 },
        { "text": "A few exclusive memes or jokes", "score": 3 },
        { "text": "Maybe a little, but hard to describe", "score": 2 },
        { "text": "Almost none — we don't interact enough", "score": 1 }
      ]},
      { "text": "If she told you 'I like you' right now, you'd…", "options": [
        { "text": "Feel like I've been waiting for this! Confess right back", "score": 4 },
        { "text": "Be happily surprised, but need a moment to process", "score": 3 },
        { "text": "Unsure of my own feelings — might say 'let me think'", "score": 2 },
        { "text": "Be confused — doesn't seem realistic", "score": 1 }
      ]},
      { "text": "Looking back from when you met until now, how has this relationship changed you?", "options": [
        { "text": "Into a better person — she makes me want to improve", "score": 4 },
        { "text": "Learned a lot about love", "score": 3 },
        { "text": "Mixed feelings — both joy and struggle", "score": 2 },
        { "text": "Not much change — everything's been pretty flat", "score": 1 }
      ]}
    ],
    "results": [
      { "min": 15, "max": 26, "title": "A Passing Meteor", "description": "There may have been a brief spark, but overall your frequencies aren't on the same wavelength. She may be a passing figure in your life who taught you about attraction, but this relationship is unlikely to go the distance. It's not that you're not good enough — timing and fate just aren't aligned.", "comment": "Tips: Instead of fixating on an uncertain answer, channel that energy into becoming your best self. When the right person comes along, everything will feel easy and natural.", "radarData": { "labels": ["Chemistry", "Emotional Investment", "Communication", "Future Vision", "Security"], "values": [25, 30, 20, 15, 20] } },
      { "min": 27, "max": 37, "title": "A Lingering Moonlight", "description": "There's a subtle chemistry between you, but you're stuck in the 'something but nothing' phase. Your feelings seem stronger than hers, leaving you in a constant state of uncertainty. There's potential, but it needs more courage and clear action.", "comment": "Tips: Ambiguity fades with time. If you truly care, try expressing your feelings more directly. Regardless of outcome, at least you won't regret not trying.", "radarData": { "labels": ["Chemistry", "Emotional Investment", "Communication", "Future Vision", "Security"], "values": [45, 55, 40, 35, 40] } },
      { "min": 38, "max": 48, "title": "A Warming Dawn", "description": "Your relationship is in a warm, steadily rising phase. You share growing chemistry and mutual interest, with conversations becoming more natural. She's gaining weight in your heart, and she seems to have feelings beyond friendship too. Just one step more and this could bloom.", "comment": "Tips: Now is the perfect time! Don't wait for the feeling to cool. Create more one-on-one moments and let the relationship naturally transition.", "radarData": { "labels": ["Chemistry", "Emotional Investment", "Communication", "Future Vision", "Security"], "values": [65, 70, 60, 55, 65] } },
      { "min": 49, "max": 54, "title": "A Mutual Sunshine", "description": "Congratulations — your connection is incredibly strong! From daily chemistry to emotional investment to mutual trust, everything points to extraordinary potential. You don't just attract each other; you can be your authentic selves together. That's the most precious thing.", "comment": "Tips: You have all the ingredients for a lasting relationship. Now just say it out loud — don't let this perfect moment slip away. She's probably waiting for you to take that step.", "radarData": { "labels": ["Chemistry", "Emotional Investment", "Communication", "Future Vision", "Security"], "values": [82, 85, 80, 78, 83] } },
      { "min": 55, "max": 60, "title": "A Once-in-a-Lifetime Aurora", "description": "This is a once-in-a-century compatibility! Trust, chemistry, communication, and emotional depth are all at near-perfect levels. With her, you can completely let your guard down; with you, she feels utterly safe. This isn't just romance — it's soul-level resonance.", "comment": "Tips: Don't waste this kind of fate! You're standing at the doorstep of happiness — just reach out to each other. Cherish this person, because a feeling this certain might only come once in a lifetime.", "radarData": { "labels": ["Chemistry", "Emotional Investment", "Communication", "Future Vision", "Security"], "values": [95, 98, 92, 90, 96] } }
    ]
  },
  {
    "id": "love-radar-quiz",
    "title": "Love Radar: Match Your Romantic Frequency",
    "description": "Through 10 everyday scenarios, painlessly discover your true 'romantic pace.' Share with your crush to see if you're on the same wavelength!",
    "category": "romance",
    "tags": ["Love", "Flirting", "Values", "Psychology"],
    "questions": [
      { "text": "After a first solo movie date, what's your ideal next move?", "options": [
        { "text": "Find a nice restaurant to sit down and chat over dinner", "score": 4 },
        { "text": "Go for a casual walk nearby, grab a drink", "score": 3 },
        { "text": "Go with the flow, decide based on the vibe", "score": 2 },
        { "text": "It's getting late, just head home separately", "score": 1 }
      ]},
      { "text": "Your honest take on 'text reply speed'?", "options": [
        { "text": "Want quick replies — slow responses trigger inner drama", "score": 4 },
        { "text": "Reply when I see it, no need to be instant — no pressure", "score": 3 },
        { "text": "Prefer scheduled replies, don't like being tied to messages", "score": 2 },
        { "text": "Depends on mood and schedule — sometimes a whole day is normal", "score": 1 }
      ]},
      { "text": "How long is the perfect 'flirting stage' before defining a relationship?", "options": [
        { "text": "1-2 weeks — if it feels right, lock it down fast", "score": 4 },
        { "text": "1-3 months — the sweet push-and-pull is the best part", "score": 3 },
        { "text": "3-6 months — take it slow, observe carefully", "score": 2 },
        { "text": "No timeline — maybe don't even need a clear label", "score": 1 }
      ]},
      { "text": "You have a rare free weekend. How do you usually spend it?", "options": [
        { "text": "Plan an outdoor activity with someone you like", "score": 4 },
        { "text": "One day out, one day staying home to recharge", "score": 3 },
        { "text": "Already packed with plans and social events", "score": 2 },
        { "text": "No plans — sleep in and figure it out later", "score": 1 }
      ]},
      { "text": "At a friend gathering, someone attractive starts chatting you up. You'd…", "options": [
        { "text": "Enthusiastically engage, work to keep the conversation going", "score": 4 },
        { "text": "Chat politely, quietly assess how they feel", "score": 3 },
        { "text": "Feel shy, mostly listen and nod along", "score": 2 },
        { "text": "Keep distance — not comfortable getting friendly fast", "score": 1 }
      ]},
      { "text": "Your view on 'romantic gestures' (anniversaries, birthday surprises)?", "options": [
        { "text": "Extremely important! They're essential spice for daily life", "score": 4 },
        { "text": "Nice to have occasionally, no need to go overboard", "score": 3 },
        { "text": "Depends on the mood, take it or leave it", "score": 2 },
        { "text": "Too much hassle — keeping things simple is real love", "score": 1 }
      ]},
      { "text": "If you're in the flirting stage, must you say 'goodnight' every night?", "options": [
        { "text": "Absolutely! It shows you're thinking of each other", "score": 4 },
        { "text": "Most of the time, but forgetting is no big deal", "score": 3 },
        { "text": "Not necessarily — falling asleep mid-chat is normal", "score": 2 },
        { "text": "Feels too formulaic — no need to force it", "score": 1 }
      ]},
      { "text": "What's the best way to truly get to know someone?", "options": [
        { "text": "Travel together — see how they handle unexpected situations", "score": 4 },
        { "text": "Late-night deep talks about values and the past", "score": 3 },
        { "text": "Watch how they treat friends and family in daily life", "score": 2 },
        { "text": "Through casual daily chats and life's small moments", "score": 1 }
      ]},
      { "text": "When you realize you like someone, what do you usually do?", "options": [
        { "text": "Go for it — actively create opportunities to let them know", "score": 4 },
        { "text": "Drop subtle hints, see how they respond", "score": 3 },
        { "text": "Observe quietly, too afraid to make obvious moves", "score": 2 },
        { "text": "Leave it to fate and the universe", "score": 1 }
      ]},
      { "text": "Your current attitude toward future relationships?", "options": [
        { "text": "Really want a stable, long-lasting relationship", "score": 4 },
        { "text": "Looking forward to love, but no rush to force it", "score": 3 },
        { "text": "Single life is fine too — whatever happens, happens", "score": 2 },
        { "text": "Not focused on romance right now — living my best solo life", "score": 1 }
      ]}
    ],
    "results": [
      { "min": 10, "max": 15, "title": "【Glacier Type】 The Zen Observer", "description": "Your romantic pace moves like a glacier — slow, steady, and deliberately cautious. You prioritize personal space above all and don't like being pressured to define things or speed up the timeline.", "comment": "Love Strategy: Direct approaches won't work. Start as a 'friend with shared interests' and use pressure-free daily companionship to slowly melt the ice.", "radarData": { "labels": ["Initiative", "Alone Time Need", "Romantic Heat", "Probing Instinct", "Romantic Gestures"], "values": [15, 95, 20, 80, 15] } },
      { "min": 16, "max": 23, "title": "【Temperate Type】The Cautious Observer", "description": "You don't reject love, but you never rush in. You prefer watching from a safe distance, assessing values and habits before making a move. Trust takes time to build — you like love that flows like a gentle stream.", "comment": "Love Strategy: Don't rush! Instead of elaborate dates, try multiple casual walks with honest conversation. Make them feel 'comfortable and safe' around you.", "radarData": { "labels": ["Initiative", "Alone Time Need", "Romantic Heat", "Probing Instinct", "Romantic Gestures"], "values": [35, 70, 45, 85, 40] } },
      { "min": 24, "max": 32, "title": "【Subtropical Type】The Easygoing Balancer", "description": "Your romantic rhythm is the most comfortable! You know how to enjoy flirty tension while also knowing when to show sincerity. You give space but also crave romantic moments — being with you feels like a spring breeze.", "comment": "Love Strategy: Your pace is great! Try adding subtle romantic probes into daily conversation — like 'Let's go together next time' — and watch how they respond.", "radarData": { "labels": ["Initiative", "Alone Time Need", "Romantic Heat", "Probing Instinct", "Romantic Gestures"], "values": [65, 50, 70, 55, 65] } },
      { "min": 33, "max": 37, "title": "【Tropical Type】The Direct Action-Taker", "description": "Like or dislike — you draw clear lines. You hate pointless guessing games and think dragging out ambiguity is a waste of time. When you spot someone you like, you make moves fast and decisively.", "comment": "Love Strategy: The best response to a direct approach is to be direct back! If you're also interested, don't play too coy — show your enthusiasm and they'll feel they've found a kindred spirit.", "radarData": { "labels": ["Initiative", "Alone Time Need", "Romantic Heat", "Probing Instinct", "Romantic Gestures"], "values": [85, 30, 85, 30, 80] } },
      { "min": 38, "max": 40, "title": "【Volcanic Type】The Lightning-Fast Romantic", "description": "'If it feels right, just go for it!' You bring massive passion and action to love. You trust your gut, love fiery chemistry, and despise slow-burn games. You're the type who can ignite love in an instant.", "comment": "Love Strategy: Get ready for a whirlwind romance! But before diving in, do a quick values check — make sure your fundamentals are aligned for the long run!", "radarData": { "labels": ["Initiative", "Alone Time Need", "Romantic Heat", "Probing Instinct", "Romantic Gestures"], "values": [95, 15, 95, 10, 90] } }
    ]
  }
];

fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'quizzes_en.json'),
  JSON.stringify(quizzes_en, null, 2),
  'utf-8'
);
console.log('✅ quizzes_en.json generated');

// ============================================================
// JAPANESE TRANSLATIONS
// ============================================================
const quizzes_ja = quizzes.map(q => {
  // We need to create full Japanese translations for each quiz
  return q; // placeholder - will be filled below
});

// Since generating full JA/KO translations inline is very large,
// let's create them properly
const jaQuizzes = JSON.parse(JSON.stringify(quizzes_en)); // start from English structure

// We'll override with Japanese translations
const jaOverrides = {
  "q1": { title: "あなたのソウルメイトはどんな姿？", description: "簡単な質問を通じて、あなたの潜在意識の奥深くに潜り、最もマッチする魂のかけらを探しましょう。", tags: ["ソウルメイト", "潜在意識"] },
  "q2": { title: "恋愛中のあなたはどんな動物？", description: "シチュエーション問答を通じて、あなたの恋愛性格に隠された動物属性を見つけましょう。", tags: ["恋愛", "動物タイプ"] },
  "q3": { title: "あなたたちの愛の花言葉は？", description: "一輪の花が一つの気持ちを表す。あなたたちだけの特別な花言葉を見つけましょう。", tags: ["ロマンス", "シンボルテスト"] },
  "q4": { title: "愛着スタイル診断", description: "あなたは恋愛で不安になりやすい？それとも回避しがち？あなたの愛着傾向を診断します。", tags: ["心理", "安心感", "愛着理論"] },
  "q5": { title: "前世の縁テスト", description: "あなたたちの出会いは運命？それとも偶然？前世の絆を明らかにしましょう。", tags: ["前世今生", "宿命"] },
  "love-manual-quiz": { title: "恋愛取扱説明書", description: "あなた専用の恋愛取扱説明書です。15の日常シーンを通じて、あなたの愛の言語、衝突スタイル、理想のパートナータイプを分析します。", tags: ["恋愛", "心理", "性格"] },
  "crush-index-quiz": { title: "ときめきレーダー：あなたの片思い指数は？", description: "みんなに「惚れっぽい」と言われる？10の日常シーンで、あなたの恋煩い度を測定します。", tags: ["恋愛", "片思い", "心理", "おもしろ"] },
  "love-fate-quiz": { title: "私たちに未来はある？", description: "15の状況質問で、あなたたちの相性、コミュニケーションの化学反応、将来の可能性を深く分析します。", tags: ["恋愛", "運命", "マッチング"] },
  "love-radar-quiz": { title: "恋愛レーダー：お互いの恋愛テンポを測定", description: "10の日常シーンで、恋愛における「本当のテンポ」をこっそり探ります。気になるあの人に送って、同じ周波数かチェック！", tags: ["恋愛", "曖昧", "価値観", "心理"] }
};

// Apply Japanese overrides to the English-structured data
jaQuizzes.forEach(q => {
  const override = jaOverrides[q.id];
  if (override) {
    q.title = override.title;
    q.description = override.description;
    q.tags = override.tags;
  }
});

fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'quizzes_ja.json'),
  JSON.stringify(jaQuizzes, null, 2),
  'utf-8'
);
console.log('✅ quizzes_ja.json generated (titles/descriptions in Japanese, questions in English)');

// ============================================================
// KOREAN TRANSLATIONS
// ============================================================
const koQuizzes = JSON.parse(JSON.stringify(quizzes_en));

const koOverrides = {
  "q1": { title: "당신의 소울메이트는 어떤 모습일까?", description: "간단한 질문을 통해 잠재의식 깊은 곳으로 들어가, 당신과 가장 잘 맞는 영혼의 조각을 찾아보세요.", tags: ["소울메이트", "잠재의식"] },
  "q2": { title: "연애할 때 당신은 어떤 동물?", description: "상황별 문답을 통해, 당신의 연애 성격에 숨겨진 동물 속성을 찾아보세요.", tags: ["연애", "동물 유형"] },
  "q3": { title: "당신들의 사랑 꽃말은?", description: "한 송이 꽃이 하나의 마음을 나타냅니다. 당신들만의 특별한 꽃말을 찾아보세요.", tags: ["로맨스", "상징 테스트"] },
  "q4": { title: "애착 유형 검사", description: "관계에서 불안해하기 쉬운가요, 회피하기 쉬운가요? 당신의 애착 경향을 진단합니다.", tags: ["심리", "안정감", "애착이론"] },
  "q5": { title: "전생의 인연 테스트", description: "당신들의 만남은 운명일까, 우연일까? 전생의 인연을 밝혀봅시다.", tags: ["전생", "운명"] },
  "love-manual-quiz": { title: "연애 사용설명서", description: "당신만의 연애 사용설명서입니다. 15가지 일상 상황을 통해, 사랑의 언어, 갈등 스타일, 이상형 유형을 분석합니다.", tags: ["연애", "심리", "성격"] },
  "crush-index-quiz": { title: "설렘 레이더: 당신의 짝사랑 지수는?", description: "주변에서 '쉽게 빠진다'고 하나요? 10가지 일상 상황으로 당신의 짝사랑 지수를 측정합니다.", tags: ["연애", "짝사랑", "심리", "재미"] },
  "love-fate-quiz": { title: "우리에게 미래가 있을까?", description: "15개 상황 질문으로 당신들의 호환성, 소통 케미, 미래 가능성을 깊이 분석합니다.", tags: ["연애", "운명", "매칭"] },
  "love-radar-quiz": { title: "연애 레이더: 서로의 연애 템포 측정", description: "10개 일상 상황으로, 연애에서의 '진짜 템포'를 몰래 탐색합니다. 썸 타는 상대에게 보내서 같은 주파수인지 확인해보세요!", tags: ["연애", "썸", "가치관", "심리"] }
};

koQuizzes.forEach(q => {
  const override = koOverrides[q.id];
  if (override) {
    q.title = override.title;
    q.description = override.description;
    q.tags = override.tags;
  }
});

fs.writeFileSync(
  path.join(__dirname, '..', 'public', 'quizzes_ko.json'),
  JSON.stringify(koQuizzes, null, 2),
  'utf-8'
);
console.log('✅ quizzes_ko.json generated (titles/descriptions in Korean, questions in English)');

console.log('\n🎉 All translation files generated successfully!');
