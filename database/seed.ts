import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ImageKit from "imagekit";

import { books } from "@/database/schema";
import { config } from "dotenv";
config({
  path: ".env.local",
});

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const dummyBooks = [
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    genre: "Artificial Intelligence",
    rating: 4,
    coverUrl: "https://m.media-amazon.com/images/I/61nHC3YWZlL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#c7cdd9",
    description:
      "A leading textbook on AI, offering deep dives into search algorithms, machine learning, and robotics, suitable for both beginners and professionals.",
    totalCopies: 10,
    videoUrl: "https://file-examples.com/wp-content/storage/2020/03/file_example_WEBM_480_900KB.webm",
    summary:
      "‘Artificial Intelligence: A Modern Approach’ presents the fundamental concepts and algorithms underpinning AI, from uninformed and heuristic search to logic and planning.\n\n" +
      "The authors bridge theory and practice by including chapters on probabilistic reasoning, decision making under uncertainty, and machine learning, with clear pseudocode and examples.\n\n" +
      "Widely adopted in academia, this book remains the definitive text for students and practitioners, providing a rigorous yet accessible treatment of both classical and contemporary AI topics."
  },
  {
    title: "Computer Networking: A Top-Down Approach",
    author: "James F. Kurose & Keith W. Ross",
    genre: "Networking",
    rating: 5,
    coverUrl: "https://m.media-amazon.com/images/I/91hg1HHyiWL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#f7a13e",
    description:
      "An accessible introduction to computer networks, starting from application-layer protocols down to link-layer technologies.",
    totalCopies: 25,
    videoUrl: "https://file-examples.com/wp-content/storage/2020/03/file_example_WEBM_640_1_4MB.webm",
    summary:
      "‘Computer Networking: A Top-Down Approach’ teaches networking by first engaging readers with HTTP, FTP, DNS, and other high‑level protocols before covering TCP, IP, and Ethernet.\n\n" +
      "Each protocol chapter includes real‑world examples and hands‑on exercises, helping students understand performance, security, and design trade‑offs.\n\n" +
      "Kurose & Ross also explore emerging topics like peer‑to‑peer systems, multimedia networking, and mobile networks, ensuring relevance in today’s connected world."
  },
  {
    title: "Design Patterns: Elements of Reusable Object‑Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson & John Vlissides",
    genre: "Software Engineering",
    rating: 5,
    coverUrl: "https://m.media-amazon.com/images/I/51szD9HC9pL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#e3dccf",
    description:
      "The classic ‘Gang of Four’ book cataloging 23 object‑oriented design patterns to solve common software design problems.",
    totalCopies: 15,
    videoUrl: "https://file-examples.com/wp-content/storage/2020/03/file_example_WEBM_1280_3_6MB.webm",
    summary:
      "This seminal work identifies recurring solutions—like Singleton, Observer, and Factory Method—that can be applied across languages and domains.\n\n" +
      "For each pattern, the authors discuss intent, applicability, structure, consequences, and sample code, providing a robust template for implementation.\n\n" +
      "Beyond the patterns themselves, the book teaches how to think in patterns, fostering better software architecture and communication among design teams."
  },
  {
    title: "Clean Architecture: A Craftsman's Guide to Software Structure and Design",
    author: "Robert C. Martin",
    genre: "Software Engineering",
    rating: 4,
    coverUrl: "https://m.media-amazon.com/images/I/411csr6Nn0L._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#ffffff",
    description:
      "Uncle Bob’s guide to creating systems that are easy to maintain, test, and evolve over time.",
    totalCopies: 20,
    videoUrl: "https://file-examples.com/wp-content/storage/2020/03/file_example_WEBM_1920_3_7MB.webm",
    summary:
      "‘Clean Architecture’ lays out universal rules for software structure: separate concerns, manage dependencies, and enforce boundaries between layers.\n\n" +
      "Drawing on decades of experience, Martin shows how to apply these principles in any language or framework, focusing on use cases rather than UI or database details.\n\n" +
      "Whether you’re building microservices or monoliths, this book offers a blueprint for systems that withstand changing requirements and technology shifts."
  },
  {
    title: "The Pragmatic Programmer: Your Journey to Mastery",
    author: "Andrew Hunt & David Thomas",
    genre: "Software Engineering",
    rating: 5,
    coverUrl: "https://m.media-amazon.com/images/I/71f743sOPoL._AC_UF1000,1000_QL80_.jpg",
    coverColor: "#1c2833",
    description:
      "A collection of practical tips and philosophies to help you think and work like a true software craftsman.",
    totalCopies: 30,
    videoUrl: "https://file-examples.com/wp-content/storage/2017/04/file_example_MP4_480_1_5MG.mp4",
    summary:
      "This modern classic covers everything from career development to code cleanliness, emphasizing adaptability and continuous learning.\n\n" +
      "Key concepts include DRY (Don't Repeat Yourself), orthogonality, and tracer bullets—making code more robust and easier to evolve.\n\n" +
      "Packed with real‑world anecdotes, checklists, and exercises, it guides you toward pragmatic solutions rather than silver‑bullet frameworks."
  },
  {
    title: "System Design Interview – An Insider's Guide",
    author: "Alex Xu",
    genre: "Software Engineering",
    rating: 4,
    coverUrl: "https://m.media-amazon.com/images/I/41+e3refnZL._SX331_BO1,204,203,200_.jpg",
    coverColor: "#ffffff",
    description:
      "A step‑by‑step framework to tackle large‑scale system design questions in tech interviews.",
    totalCopies: 25,
    videoUrl: "https://file-examples.com/wp-content/storage/2017/04/file_example_MP4_640_3MG.mp4",
    summary:
      "Alex Xu presents a repeatable process: requirements gathering, API design, high‑level architecture, detailed component design, and trade‑off discussions.\n\n" +
      "Through 16 real‑world case studies—URL shorteners, news feeds, chat apps—readers learn to reason about scalability, reliability, and maintainability.\n\n" +
      "The book’s focused approach demystifies what interviewers look for, so you can confidently tackle any distributed system question."
  },
  {
    title: "The Midnight Library",
    author: "Matt Haig",
    genre: "Fantasy / Fiction",
    rating: 3,
    totalCopies: 20,
    availableCopies: 10,
    description:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
    coverColor: "#1c1f40",
    coverUrl: "https://m.media-amazon.com/images/I/81J6APjwxlL.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death. A dazzling novel about all the choices that go into a life well lived, The Midnight Library tells the story of Nora Seed as she finds herself between life and death.",
  },
  {
 
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self-Help / Productivity",
    rating: 4,
    totalCopies: 99,
    availableCopies: 50,
    description:
      "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
    coverColor: "#fffdf6",
    coverUrl: "https://m.media-amazon.com/images/I/81F90H7hnML.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A revolutionary guide to making good habits, breaking bad ones, and getting 1% better every day.",
  },
  {

    title: "You Don't Know JS: Scope & Closures",
    author: "Kyle Simpson",
    genre: "Computer Science / JavaScript",
    rating: 3,
    totalCopies: 9,
    availableCopies: 5,
    description:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
    coverColor: "#f8e036",
    coverUrl:
      "https://m.media-amazon.com/images/I/7186YfjgHHL._AC_UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "An essential guide to understanding the core mechanisms of JavaScript, focusing on scope and closures.",
  },
  {
 
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Philosophy / Adventure",
    rating: 4,
    totalCopies: 78,
    availableCopies: 50,
    description:
      "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
    coverColor: "#ed6322",
    coverUrl:
      "https://m.media-amazon.com/images/I/61HAE8zahLL._AC_UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A magical tale of Santiago, an Andalusian shepherd boy, who embarks on a journey to find a worldly treasure.",
  },
  {
 
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self-Help / Productivity",
    rating: 3,
    totalCopies: 23,
    availableCopies: 23,
    description:
      "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
    coverColor: "#ffffff",
    coverUrl: "https://m.media-amazon.com/images/I/81JJ7fyyKyS.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Rules for focused success in a distracted world, teaching how to cultivate deep focus to achieve peak productivity.",
  },
  {
  
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Computer Science / Programming",
    rating: 4,
    totalCopies: 56,
    availableCopies: 56,
    description:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
    coverColor: "#080c0d",
    coverUrl:
      "https://m.media-amazon.com/images/I/71T7aD3EOTL._UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A handbook of agile software craftsmanship, offering best practices and principles for writing clean and maintainable code.",
  },
  {

    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    genre: "Computer Science / Programming",
    rating: 4,
    totalCopies: 25,
    availableCopies: 3,
    description:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
    coverColor: "#100f15",
    coverUrl:
      "https://m.media-amazon.com/images/I/71VStSjZmpL._AC_UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "A timeless guide for developers to hone their skills and improve their programming practices.",
  },
  {
   
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Finance / Self-Help",
    rating: 5,
    totalCopies: 10,
    availableCopies: 5,
    description:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
    coverColor: "#ffffff",
    coverUrl:
      "https://m.media-amazon.com/images/I/81Dky+tD+pL._AC_UF1000,1000_QL80_.jpg",
    videoUrl: "/sample-video.mp4?updatedAt=1722593504152",
    summary:
      "Morgan Housel explores the unique behaviors and mindsets that shape financial success and decision-making.",
  },
];

export default dummyBooks;


const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
});

//crappy shit, apparently thhese drizzle and db files are standalone files and can't be affected by next directly so we can't use the config.ts here.

async function uploadToImageKit(url: string, fileName: string, folder: string) {
  try {
    const response = await imagekit.upload({
      file: url,
      fileName: fileName,
      folder,
    });
    return response.filePath;
  } catch (error) {
    console.error(`Error uploading ${fileName} to ImageKit:`, error);
    throw error;
  }
}

async function seed() {
  console.log("Seeding books...");

  try {
    for (const book of dummyBooks) {
      const coverUrl = await uploadToImageKit(
        book.coverUrl,
        `${book.title}.jpg`,
        "/books/covers"
      );

      const videoUrl = await uploadToImageKit(
        book.videoUrl,
        `${book.title}.mp4`,
        "/books/videos"
      );

      await db.insert(books).values({
        ...book,
        coverUrl,
        videoUrl,
      });

      console.log(`Added book: ${book.title}`);
    }

    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding books:", error);
  }
}

seed();
