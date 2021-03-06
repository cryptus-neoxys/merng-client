import { useQuery } from "@apollo/client";
import { useContext } from "react";
import { Grid, Dimmer, Loader, Transition, Segment } from "semantic-ui-react";

import PostCard from "../components/PostCard";
import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  let posts = null;

  if (data) {
    posts = data.getPosts;
  }

  return (
    <Grid columns={3} doubling stackable style={{ marginTop: 20 }}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      {user && !loading && (
        <Grid.Column>
          <Segment>
            <PostForm />
          </Segment>
        </Grid.Column>
      )}
      {loading ? (
        <Dimmer active inverted style={{ marginTop: 45 }}>
          <Loader inverted size="massive" content="Loading Posts" />
        </Dimmer>
      ) : (
        <Transition.Group>
          {posts &&
            posts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <Segment>
                  <PostCard post={post} />
                </Segment>
              </Grid.Column>
            ))}
        </Transition.Group>
      )}
    </Grid>
  );
};

export default Home;
