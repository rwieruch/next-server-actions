import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

const createPost = async (formData: FormData) => {
  'use server';

  const name = formData.get('name') as string;

  await prisma.post.create({
    data: {
      name,
    },
  });

  revalidatePath('/');
};

const deletePost = async (formData: FormData) => {
  'use server';

  const id = formData.get('id') as string;

  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath('/');
};

const Home = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <h2>Home</h2>

      <form action={createPost} className="flex flex-col gap-y-2">
        <input type="text" name="name" placeholder="Name" />
        <button type="submit">Create</button>
      </form>

      <ul className="flex flex-col gap-y-2">
        {posts.map((post) => (
          <li key={post.id} className="flex items-center gap-x-4">
            <div>{post.name}</div>
            <div className="flex items-center">
              <Link href={`/posts/${post.id}`}>Go To</Link> |{' '}
              <Link href={`/posts/${post.id}/edit`}>Edit</Link> |{' '}
              <form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
