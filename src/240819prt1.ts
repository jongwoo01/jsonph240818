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
  return axios.get(`${url}/posts`).then((posts) => posts.data);
}

async function getComment() {
  return axios.get(`${url}/comments`).then((comments) => comments.data);
}

async function getAllatOnce(): Promise<AllPostCommentsDb> {
  const posts = getPost();
  const comments = getComment();
  return await Promise.all([posts, comments]);
}

async function postMatchComments() {
  const playtime: string = "총 구동 시간";
  console.time(playtime);
  const [postsdata, commentsdata]: AllPostCommentsDb = await getAllatOnce();

  const postMatchComments: PostMatchCommentsDb[] = postsdata.map((post) => {
    const result = {
      ...post,
      comments: commentsdata.filter((comments) => {
        return comments.postId === post.id;
      }),
    };
    return result;
  });

  console.log(JSON.stringify(postMatchComments, null, 2));
  console.timeEnd(playtime);
}

postMatchComments();
