const invalidEntry = "Invalid Entry, Try again.";
const blogAlreadyExist = "Your input already exist.";
const exitBlogApp = "You exited the blog app.";
const nameInputMsg = "İptal: Exist\n\nEnter name:";
const lastNameInputMsg = "İptal: Exist\n\nEnter last name:";
const blogHeaderInputMsg = "İptal: Exist\n\nEnter blog header:";
const blogTextInputMsg = "İptal: Exist\n\nEnter blog text:";
const continueMsg = "İptal: Exist\n\nDo you want to continue: (Y/N)";
const continueOptionMsg = "Continue:    Y\nExist:           N or İptal";
const transactionOptionsMsg = "Select an action:\n1 - Add Blog\n2 - Read Blog";
const selectOption = "Select an option";
const transactionOptions = ["1", "2"];
const continueOptions = ["y", "n"];
const successful = "Successful";
const turkish = "tr";

let blogs = [];

if (localStorage.blogs) {
  blogs = JSON.parse(localStorage.blogs);
}

function inputValue(msg) {
  let value = prompt(msg);

  if (value === null) {
    return false;
  }

  value = value.toLocaleLowerCase(turkish).trim();
  if (!value) {
    alert(invalidEntry);
    return inputValue(msg);
  }

  return value;
}

function getBlogHeader() {
  let header = inputValue(blogHeaderInputMsg);
  if (header === false) {
    return false;
  }

  if (blogs.length > 0) {
    if (blogs.some(b => b.header === header)) {
      alert(blogAlreadyExist);
      return getBlogHeader();
    }
  }

  return header;
}

function optionTaking(msg, ...options) {
  let value = inputValue(msg);
  if (value === false) {
    return false;
  }

  if (!options.includes(value)) {
    alert(invalidEntry);
    return optionTaking(msg, ...options);
  }

  return value;
}

function setBlog() {
  let firstName = inputValue(nameInputMsg);
  if (firstName === false) {
    return false;
  }

  let lastName = inputValue(lastNameInputMsg);
  if (lastName === false) {
    return false;
  }

  let header = getBlogHeader();
  if (header === false) {
    return false;
  }

  let blogText = inputValue(blogTextInputMsg);
  if (blogText === false) {
    return false;
  }

  blogs.push({
    firstName,
    lastName,
    header,
    blogText
  });

  localStorage.blogs = JSON.stringify(blogs);
}

function readBlog() {
  const headers = blogs.map((b, index) => `${index + 1} - Blog Title: ${b.header}`);
  const headerIndex = blogs.map((_, index) => index.toString());

  const option = optionTaking(`Select:\n\n ${headers.join("\n")}`, ...headerIndex);

  const blogTextView = `Title: ${blogs[option - 1].header}\nText: ${blogs[option - 1].blogText}`;
  alert(blogTextView);
  return;
}

function isContinue() {
  let isContinue = optionTaking(continueOptionMsg, ...continueOptions);
  if (isContinue === continueOptions[1] || isContinue === false) {
    return false;
  }
  mainMenu();
}

function mainMenu() {

  let selection = optionTaking(transactionOptionsMsg, ...transactionOptions);
  if (selection === false) {
    alert(exitBlogApp);
    return;
  }

  if (selection === transactionOptions[0]) {
    let result = setBlog();
    if (result === false) {
      alert(exitBlogApp);
      return;
    }

    if (!isContinue()) {
      alert(exitBlogApp);
      return;
    }
    return;
  }

  if (selection === transactionOptions[1]) {
    let result = readBlog();
    if (result === false) {
      alert(exitBlogApp);
      return;
    }

    if (!isContinue()) {
      alert(exitBlogApp);
      return;
    }
    return;
  }

}

mainMenu();