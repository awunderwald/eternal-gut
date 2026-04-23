import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { supabase } from '../supabase';
import type { ForumComment, ForumPost } from '../../types';

export function useForumPosts() {
  const qc = useQueryClient();

  useEffect(() => {
    const ch = supabase
      .channel('forum_posts_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'forum_posts' },
        () => qc.invalidateQueries({ queryKey: ['forum', 'posts'] })
      )
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [qc]);

  return useQuery({
    queryKey: ['forum', 'posts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      return (data ?? []) as ForumPost[];
    },
  });
}

export function usePostComments(postId: string | null) {
  return useQuery({
    queryKey: ['forum', 'comments', postId],
    enabled: !!postId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('forum_comments')
        .select('*')
        .eq('post_id', postId!)
        .order('created_at');
      if (error) throw error;
      return (data ?? []) as ForumComment[];
    },
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      title: string;
      content: string;
      category: ForumPost['category'];
    }) => {
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) throw new Error('Debes iniciar sesión para publicar.');
      const { data, error } = await supabase
        .from('forum_posts')
        .insert({ ...input, user_id: user.id })
        .select()
        .single();
      if (error) throw error;
      return data as ForumPost;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['forum', 'posts'] }),
  });
}
