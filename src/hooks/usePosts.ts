import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/postService';
import { Post, PostInsert, PostUpdate } from '@/types/post';

export function usePosts() {
  const queryClient = useQueryClient();

  // Get all posts
  const getPosts = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
  });

  // Get posts with user info
  const getPostsWithUser = useQuery({
    queryKey: ['posts', 'with-user'],
    queryFn: postService.getPostsWithUser,
  });

  // Get single post by ID
  const getPostById = (id: string) =>
    useQuery<Post>({
      queryKey: ['posts', id],
      queryFn: () => postService.getPostById(id),
      enabled: !!id,
    });

  // Create new post
  const createPost = useMutation({
    mutationFn: (post: PostInsert) => postService.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Update post
  const updatePost = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: PostUpdate }) =>
      postService.updatePost(id, updates),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', id] });
    },
  });

  // Delete post
  const deletePost = useMutation({
    mutationFn: (id: string) => postService.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  return {
    getPosts,
    getPostsWithUser,
    getPostById,
    createPost,
    updatePost,
    deletePost,
  };
}
