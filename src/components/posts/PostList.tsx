'use client';

import { usePosts } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function PostList() {
  const { getPostsWithUser, deletePost } = usePosts();
  const router = useRouter();

  if (getPostsWithUser.isLoading) return <div>Loading posts...</div>;
  if (getPostsWithUser.error) return <div>Error loading posts</div>;

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost.mutateAsync(id);
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Posts</h2>
        <Button onClick={() => router.push('/posts/new')}>
          Create New Post
        </Button>
      </div>
      
      <div className="space-y-6">
        {getPostsWithUser.data?.map((post) => (
          <div key={post.id} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-600">
                  By {post.user?.user_metadata?.name || 'Anonymous'}
                </p>
                <p className="mt-2">{post.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push(`/posts/edit/${post.id}`)}
                >
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDelete(post.id)}
                  disabled={deletePost.isPending}
                >
                  {deletePost.isPending ? 'Deleting...' : 'Delete'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
