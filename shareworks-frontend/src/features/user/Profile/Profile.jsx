import { useSelector } from "react-redux";

import AllPosts from "../../posts/AllPosts/AllPosts";

import "./Profile.css";

const Profile = () => {
  const user = useSelector((state) => state.profile.user);
  const posts = useSelector((state) => state.allPosts.posts);

  return (
    <div className="width-page profile">
      <div style={{ textAlign: "left" }}>
        <p className="fullname">{user.firstName + " " + user.lastName}</p>
        <div>@{user.username}</div>
        <p>{user.bio}</p>
        <p>Joined on {user.createdAt}</p>
        <p>
          {user.following.length} Follwing {user.followers.length} Followers
        </p>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <AllPosts
          posts={posts.filter((post) => post.user.username === user.username)}
        />
      </div>
    </div>
  );
};

export default Profile;
