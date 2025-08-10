import type { Roadmap } from "@/types/types"

const yt = (q: string) => ({
  label: "YouTube",
  url: `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`,
  type: "video" as const,
})
const udemy = (q: string) => ({
  label: "Udemy",
  url: `https://www.udemy.com/courses/search/?q=${encodeURIComponent(q)}`,
  type: "course" as const,
})
const scholarpeak = (q: string) => ({
  label: "Scholarpeak",
  url: `https://www.scholarpeak.com/search?q=${encodeURIComponent(q)}`,
  type: "article" as const,
})

export const sampleRoadmaps: Roadmap[] = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description:
      "Master core data structures, algorithms, and complexity analysis to ace interviews and build efficient software.",
    topics: [
      {
        id: "dsa-1",
        title: "Big-O Notation & Complexity",
        section: "Foundations",
        resources: [yt("Big O Notation"), udemy("Data Structures Algorithms"), scholarpeak("Big O complexity")],
      },
      {
        id: "dsa-2",
        title: "Arrays & Strings",
        section: "Foundations",
        resources: [yt("Arrays and Strings"), scholarpeak("Array string problems")],
      },
      {
        id: "dsa-3",
        title: "Hash Maps & Sets",
        section: "Foundations",
        resources: [yt("HashMap tutorial"), udemy("Hash tables course")],
      },
      {
        id: "dsa-4",
        title: "Linked Lists",
        section: "Linear Structures",
        resources: [yt("Linked list problems"), scholarpeak("Linked list basics")],
      },
      {
        id: "dsa-5",
        title: "Stacks & Queues",
        section: "Linear Structures",
        resources: [yt("Stacks queues"), udemy("Data structures basics")],
      },
      {
        id: "dsa-6",
        title: "Trees & Binary Search Trees",
        section: "Hierarchical Structures",
        resources: [yt("Binary Search Tree"), scholarpeak("Tree traversals")],
      },
      {
        id: "dsa-7",
        title: "Heaps & Priority Queues",
        section: "Hierarchical Structures",
        resources: [yt("Heaps priority queue")],
      },
      {
        id: "dsa-8",
        title: "Graphs & Traversals (BFS/DFS)",
        section: "Graphs",
        resources: [yt("Graph BFS DFS"), udemy("Graph algorithms")],
      },
      {
        id: "dsa-9",
        title: "Sorting Algorithms",
        section: "Algorithms",
        resources: [yt("Sorting algorithms"), scholarpeak("Sorting overview")],
      },
      {
        id: "dsa-10",
        title: "Recursion & Backtracking",
        section: "Algorithms",
        resources: [yt("Backtracking problems")],
      },
      {
        id: "dsa-11",
        title: "Dynamic Programming",
        section: "Algorithms",
        resources: [yt("Dynamic Programming"), udemy("DP course")],
      },
      { id: "dsa-12", title: "Greedy Algorithms", section: "Algorithms", resources: [yt("Greedy algorithm tutorial")] },
    ],
  },
  {
    id: "ai",
    title: "Artificial Intelligence",
    description: "Build strong AI fundamentals across search, probability, machine learning, and deep learning.",
    topics: [
      {
        id: "ai-1",
        title: "AI Foundations & History",
        section: "Basics",
        resources: [yt("AI Foundations"), scholarpeak("AI history")],
      },
      {
        id: "ai-2",
        title: "State Space Search (DFS/BFS/A*)",
        section: "Classical AI",
        resources: [yt("A* search tutorial"), udemy("AI search")],
      },
      {
        id: "ai-3",
        title: "Probability & Bayes",
        section: "Probabilistic Reasoning",
        resources: [yt("Bayes theorem"), scholarpeak("Bayesian reasoning")],
      },
      {
        id: "ai-4",
        title: "Machine Learning Overview",
        section: "Machine Learning",
        resources: [yt("ML overview"), udemy("Machine learning")],
      },
      { id: "ai-5", title: "Supervised Learning", section: "Machine Learning", resources: [yt("Supervised learning")] },
      {
        id: "ai-6",
        title: "Unsupervised Learning",
        section: "Machine Learning",
        resources: [yt("Unsupervised learning")],
      },
      {
        id: "ai-7",
        title: "Neural Networks & Backprop",
        section: "Deep Learning",
        resources: [yt("Neural networks"), udemy("Deep learning")],
      },
      { id: "ai-8", title: "CNNs & RNNs", section: "Deep Learning", resources: [yt("CNN RNN")] },
      {
        id: "ai-9",
        title: "Reinforcement Learning",
        section: "Deep Learning",
        resources: [yt("Reinforcement learning")],
      },
      {
        id: "ai-10",
        title: "Ethics & Responsible AI",
        section: "Practice",
        resources: [yt("AI ethics"), scholarpeak("Responsible AI")],
      },
    ],
  },
  {
    id: "cyber",
    title: "Cybersecurity",
    description:
      "Learn core security principles, threat models, and hands-on defensive and offensive security techniques.",
    topics: [
      {
        id: "cyber-1",
        title: "Security Basics & CIA Triad",
        section: "Foundations",
        resources: [yt("CIA Triad security"), scholarpeak("Security basics")],
      },
      {
        id: "cyber-2",
        title: "Cryptography Basics",
        section: "Foundations",
        resources: [yt("Cryptography basics"), udemy("Cryptography")],
      },
      {
        id: "cyber-3",
        title: "Web Security (OWASP Top 10)",
        section: "Application Security",
        resources: [yt("OWASP top 10")],
      },
      {
        id: "cyber-4",
        title: "Network Security",
        section: "Network & Infra",
        resources: [yt("Network security tutorial")],
      },
      {
        id: "cyber-5",
        title: "Penetration Testing Basics",
        section: "Offensive Security",
        resources: [yt("Pentesting basics")],
      },
      { id: "cyber-6", title: "Threat Modeling", section: "Risk & Governance", resources: [yt("Threat modeling")] },
      {
        id: "cyber-7",
        title: "Incident Response",
        section: "Operations",
        resources: [yt("Incident response process")],
      },
      {
        id: "cyber-8",
        title: "Security Auditing & Compliance",
        section: "Operations",
        resources: [yt("Security auditing")],
      },
    ],
  },

  // New: Internet of Things (IoT)
  {
    id: "iot",
    title: "Internet of Things (IoT)",
    description: "Embedded fundamentals, connectivity protocols, cloud integration, and end‑to‑end IoT solutions.",
    topics: [
      {
        id: "iot-1",
        title: "IoT Basics & Use Cases",
        section: "Foundations",
        resources: [yt("What is IoT"), scholarpeak("IoT use cases")],
      },
      {
        id: "iot-2",
        title: "Microcontrollers (Arduino/ESP32)",
        section: "Hardware & Embedded",
        resources: [yt("Arduino ESP32 tutorial"), udemy("Arduino ESP32 course")],
      },
      {
        id: "iot-3",
        title: "Sensors & Actuators",
        section: "Hardware & Embedded",
        resources: [yt("IoT sensors basics")],
      },
      {
        id: "iot-4",
        title: "Protocols (MQTT/HTTP/CoAP)",
        section: "Connectivity",
        resources: [yt("MQTT tutorial"), scholarpeak("IoT protocols")],
      },
      {
        id: "iot-5",
        title: "Networking (Wi‑Fi/BLE/LoRaWAN)",
        section: "Connectivity",
        resources: [yt("LoRaWAN intro"), yt("BLE basics")],
      },
      {
        id: "iot-6",
        title: "Edge Computing & OTA Updates",
        section: "Device Software",
        resources: [yt("Edge computing IoT")],
      },
      {
        id: "iot-7",
        title: "Cloud Platforms (AWS/Azure IoT)",
        section: "Cloud & Data",
        resources: [yt("AWS IoT Core tutorial"), udemy("AWS IoT course")],
      },
      { id: "iot-8", title: "Data Ingestion & Dashboards", section: "Cloud & Data", resources: [yt("IoT dashboards")] },
      {
        id: "iot-9",
        title: "Security (Identity & TLS)",
        section: "Security",
        resources: [yt("IoT security best practices")],
      },
      {
        id: "iot-10",
        title: "End‑to‑End Project: Sensor to Cloud",
        section: "Capstone",
        resources: [yt("IoT project end to end")],
      },
    ],
  },

  // New: Web Development
  {
    id: "webdev",
    title: "Web Development",
    description: "A modern full‑stack path: HTML/CSS/JS, React/Next.js, APIs, databases, auth, and deployment.",
    topics: [
      {
        id: "web-1",
        title: "HTML, CSS, and the DOM",
        section: "Foundations",
        resources: [yt("HTML CSS crash course"), udemy("Modern HTML CSS")],
      },
      {
        id: "web-2",
        title: "JavaScript Essentials (ES6+)",
        section: "Foundations",
        resources: [yt("JavaScript ES6 tutorial")],
      },
      { id: "web-3", title: "TypeScript Basics", section: "Foundations", resources: [yt("TypeScript for beginners")] },
      {
        id: "web-4",
        title: "React Fundamentals",
        section: "Frontend",
        resources: [yt("React tutorial"), udemy("React course")],
      },
      {
        id: "web-5",
        title: "Next.js App Router",
        section: "Frontend",
        resources: [yt("Next.js app router"), udemy("Next.js 15 course")],
      },
      {
        id: "web-6",
        title: "Styling (Tailwind CSS)",
        section: "Frontend",
        resources: [yt("Tailwind CSS crash course")],
      },
      {
        id: "web-7",
        title: "APIs and REST/GraphQL",
        section: "Backend",
        resources: [yt("REST API tutorial"), yt("GraphQL basics")],
      },
      {
        id: "web-8",
        title: "Databases (SQL/NoSQL)",
        section: "Backend",
        resources: [yt("Postgres tutorial"), udemy("SQL fundamentals")],
      },
      {
        id: "web-9",
        title: "Authentication & Authorization",
        section: "Backend",
        resources: [yt("JWT auth"), yt("OAuth 2.0 intro")],
      },
      {
        id: "web-10",
        title: "Deployment & CI/CD",
        section: "DevOps & Deploy",
        resources: [yt("Deploy to Vercel"), yt("CI/CD basics")],
      },
    ],
  },
]
