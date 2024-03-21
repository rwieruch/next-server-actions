import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';

type PostPageProps = {
  params: {
    postId: string;
  };
};

const PostPage = async ({ params }: PostPageProps) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
  });

  if (!post) {
    return notFound();
  }

  return <h2>{post.name}</h2>;
};

export default PostPage;
