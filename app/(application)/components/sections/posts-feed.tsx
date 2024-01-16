"use client";
import { createFeed } from "@communalapp/scripts";
import { Avatar, Body, Box, Flex, Grid, LikeButton, ShareButton, Stack } from "craftbook";
import { useEffect, useState } from "react";

import Markdown from 'react-markdown';

export interface PostInterface {
  content: string;
  username: string;
  id: string;
  community_name: string;
  profile_picture: string;
}

export function PostsFeed() {
  const [posts, setPosts] = useState<PostInterface[] & any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      let response = await createFeed();
      setPosts(response);
    }
    fetchPosts();
  }, []);

  return (
    <Stack rowGap={0}>
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            content={post.content}
            username={post.username}
            community_name={post.community_name}
            id={post.id}
            profile_picture={post.profile_picture}
          />
        )
      })}
    </Stack>
  )
}

export function Post({ content, username, community_name, profile_picture, id }: PostInterface) {
  console.log("avatar", profile_picture);
  return (
    <Box
      className="px-6 py-3 border-b hover:bg-black/5"
    >
      <Grid alignItems="start">
        <Flex>
          <Avatar
            fallback={username[0]}
            image={profile_picture}
            size="sm"
          />
          <Body size="xs">{username}</Body>
        </Flex>
        <Box>
          <Box className="post-content-wrapper mt-2">
            <Markdown className={"md-content"}>{content}</Markdown>
          </Box>
          <Flex justifyContent="between" className="mt-6">
            <LikeButton count={12} isLiked={false} />
            <ShareButton />
          </Flex>
        </Box>
      </Grid>
    </Box>
  )
}