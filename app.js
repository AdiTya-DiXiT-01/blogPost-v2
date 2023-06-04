//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent =
  "Welcome to CodeCrafters, where we delve into the intricate world of programming, development, and all things tech. In this blog post, we invite you to embark on a journey of discovery and mastery as we explore the art and science of coding. Whether you're a seasoned developer or a curious beginner, our aim is to provide valuable insights, tips, and resources that will enhance your coding skills and broaden your understanding of the ever-evolving tech landscape. From programming languages and frameworks to best practices and innovative projects, join us as we unravel the secrets of the digital realm and unlock the potential of code. Let's start crafting the future, one line at a time.";
const aboutContent =
  "Welcome to our blog! We are thrilled to have you here and excited to share our passion for knowledge, creativity, and inspiration with you. At CodeCrafters, we strive to create a space that encourages meaningful discussions, provides valuable insights, and fosters a sense of community among our readers.Our Mission: Our mission is to empower individuals to explore, learn, and grow through the power of words. We believe that knowledge has the ability to transform lives and that everyone deserves access to quality information. With this in mind, we aim to curate and deliver engaging content that sparks curiosity, encourages critical thinking, and ignites a thirst for lifelong learning.What We Offer: At CodeCrafters, you'll find a wide range of topics covering diverse interests and niches. From technology to travel, from lifestyle to literature, we strive to offer something for everyone. Our team of passionate writers and contributors work diligently to deliver thought-provoking articles, insightful tips, helpful guides, and engaging stories.Community and Engagement: We believe that the true essence of a blog lies in its community. We value your opinions, perspectives, and experiences, and we encourage you to actively participate in the conversations happening on our blog. Whether it's leaving comments, sharing your thoughts on social media, or reaching out to us directly, we want to hear from you. Together, we can create a vibrant and supportive community where ideas are shared, questions are answered, and connections are made.Quality and Integrity: We take great pride in delivering content of the highest quality. Our team of experienced writers and editors ensures that each piece meets rigorous standards, providing accurate information, engaging storytelling, and valuable insights. We strive to maintain integrity in all aspects of our blog, from the topics we cover to the sources we cite. Our commitment to excellence is unwavering, and we constantly seek to improve and evolve to meet the needs and expectations of our readers.Get Involved: We believe in the power of collaboration and welcome guest contributions from aspiring writers, experts, and enthusiasts. If you have a unique perspective, valuable knowledge to share, or an inspiring story to tell, we invite you to join our community of contributors. Together, we can create a platform that amplifies diverse voices and offers a multitude of perspectives.Thank You: We extend our heartfelt gratitude to each and every one of our readers. Your support, engagement, and feedback inspire us to continue our mission and provide you with exceptional content. We are here to serve you, and we strive to make your experience on CodeCrafters both enriching and enjoyable.So, take a moment to explore our blog, discover new ideas, and join the conversations. We hope you find inspiration, entertainment, and valuable knowledge within these digital pages. Together, let's embark on a journey of discovery, growth, and connection. Welcome to CodeCrafters!";
const contactContent =
  "We would love to hear from you! If you have any questions, suggestions, or feedback, feel free to reach out to us. Whether you want to share your coding journey, contribute an article, or simply say hello, our inbox is always open. You can contact us through the form below or send us an email at [email protected] Our team of passionate coders is here to assist you and engage in meaningful discussions. Connect with us on social media too, and join our vibrant community of fellow CodeCrafters. Together, let's fuel our coding passions and inspire each other to reach new heights in the world of programming.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://user-aditya:QHRZPR2SPw9xPghs@cluster0.svp75lg.mongodb.net/blogPostDB?retryWrites=true&w=majority"
);

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

app.get("/", function (req, res) {
  Blog.find().then(function (foundItems) {
    res.render("home", { pageContent: homeStartingContent, posts: foundItems });
  });
});

app.get("/posts/:postId", function (req, res) {
  Blog.findById(req.params.postId).then((data) => {
    res.render("post", { pageHead: data.title, pageContent: data.content });
  });
});

app.get("/about", function (req, res) {
  res.render("about", { about: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contact: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const blog = new Blog({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  try {
    blog.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});

// else {
//   res.render("post", { pageHead: "Oops!", pageContent:"Post not found please contact developer." });
// }
