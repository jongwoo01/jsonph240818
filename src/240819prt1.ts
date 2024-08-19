import axios from "axios";

type PostDb = {
  userID: number;
  id: number;
  title: string;
  body: string;
};

type CommentDb = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type PostMatchCommentsDb = PostDb & { comments: CommentDb[] };

type AllPostCommentsDb = [postDb: PostDb[], commentDb: CommentDb[]];

const url: string = "https://jsonplaceholder.typicode.com";

async function getPost() {
  return await axios.get(`${url}/posts`).then((posts) => posts.data);
}

async function getComment() {
  return await axios.get(`${url}/comments`).then((comments) => comments.data);
}

async function print(){
    const post = getPost;
    console.log(post);
}

print();
