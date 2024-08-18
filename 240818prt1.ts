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

const url: string = "https://jsonplaceholder.typicode.com";

async function getPostData() {
  const rawPostData = await axios.get(`${url}/posts`);
  const postData: PostDb[] = rawPostData.data;
  return postData;
}

async function getCommentData() {
  const rawCommentData = await axios.get(`${url}/comments`);
  const commentData = rawCommentData.data;
  return commentData;
}

async function postMatchComments() {
  const playtime: string = "총 구동 시간";
  console.time(playtime);
  const posts: PostDb[] = await getPostData();
  const commentData: CommentDb[] = await getCommentData();

  const postMatchComments: PostMatchCommentsDb[] = posts.map((post) => {
    const result = {
      ...post,
      comments: commentData.filter((comments) => {
        return comments.postId === post.id;
      }),
    };
    return result;
  });

  console.log(JSON.stringify(postMatchComments, null, 2));
  console.timeEnd(playtime);
}

postMatchComments();
