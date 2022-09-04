import { Box } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";

import PostContent, { PostContentType } from "./post-content/PostContent";
import PostHeader, { PostHeaderType } from "./post-header/PostHeader";
import PostNavigation, {
  PostNavigationType,
} from "./post-navigation/PostNavigation";

interface IPostProps {
  children: ReactNode;
}

interface IPostComposition {
  Header: PostHeaderType;
  Content: PostContentType;
  Navigation: PostNavigationType;
}

type PostProps = FunctionComponent<IPostProps> & IPostComposition;

const Post: PostProps = ({ children }) => {
  return (
    <Box
      as="main"
      width="100%"
      maxWidth={{ md: "660px", lg: "800px" }}
      padding={5}
      margin="0 auto 20px"
    >
      {children}
    </Box>
  );
};

Post.Header = PostHeader;
Post.Content = PostContent;
Post.Navigation = PostNavigation;

export default Post;
