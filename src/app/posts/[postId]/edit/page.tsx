import { notFound, redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const updatePost = async (formData: FormData) => {
  'use server';

  const id = formData.get('id') as string;
  const name = formData.get('name') as string;

  await prisma.post.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  revalidatePath('/');
  redirect('/');
};

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

  return (
    <form action={updatePost}>
      <input type="hidden" name="id" value={post.id} />
      <input
        type="text"
        name="name"
        placeholder="Name"
        defaultValue={post.name}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default PostPage;
