let commentsArray = [
  [
    "Name1",
    "Surname1",
    "Job title1",
    `This is comment 1,
  this is second line of the comment`,
    "./images/About us/Headshot1.png",
  ],
  [
    "Name2",
    "Surname2",
    "Job title2",
    `This is comment 2,
  this is second line of the comment`,
    "./images/About us/Headshot2.png",
  ],
  [
    "Name3",
    "Surname3",
    "Job title3",
    `This is comment 3,
  this is second line of the comment`,
    "./images/About us/Headshot3.png",
  ],
  [
    "Name4",
    "Surname4",
    "Job title4",
    `This is comment 4,
  this is second line of the comment`,
    "./images/About us/Headshot4.png",
  ],
  [
    "Name5",
    "Surname5",
    "Job title5",
    `This is comment 5,
  this is second line of the comment`,
    "./images/About us/Headshot5.png",
  ],
  [
    "Name6",
    "Surname6",
    "Job title6",
    `This is comment 6,
  this is second line of the comment`,
    "./images/About us/Headshot6.png",
  ],
  [
    "Name7",
    "Surname7",
    "Job title7",
    `This is comment 7,
  this is second line of the comment`,
    "./images/About us/Headshot7.png",
  ],
  [
    "Name8",
    "Surname8",
    "Job title8",
    `This is comment 8,
  this is second line of the comment`,
    "./images/About us/Headshot8.png",
  ],
  [
    "Name9",
    "Surname9",
    "Job title9",
    `This is comment 9,
  this is second line of the comment`,
    "./images/About us/Headshot9.png",
  ],
  [
    "Name10",
    "Surname10",
    "Job title10",
    `This is comment 10,
  this is second line of the comment`,
    "./images/About us/Headshot10.png",
  ],
  [
    "Name11",
    "Surname11",
    "Job title11",
    `This is comment 11,
  this is second line of the comment`,
    "./images/About us/Headshot11.png",
  ],
];

class Comment {
  constructor(name, surname, jobTitle, commentText, imagePath) {
    this.name = name;
    this.surname = surname;
    this.jobTitle = jobTitle;
    this.commentText = commentText;
    this.imagePath = imagePath;
  }
}

let commentObjectsArray = [];

for (let i = 0; i < commentsArray.length; i++) {
  commentObjectsArray[i] = new Comment(...commentsArray[i]);
}
// console.log(commentObjectsArray);

export { commentObjectsArray };
