import Head from 'next/head'
import { tw } from 'twind'
import { Categories, PostCard, PostWidget } from '../components'
import FeaturedPosts from '../sections/featuredPosts'
import { getPosts } from '../services'


export default function Home({posts}) {
  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={tw`container h-screen mx-auto px-10 mb-8`}>
        <FeaturedPosts />
        <div className={tw`grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          <div className={tw`lg:col-span-8 col-span-1`}>
          {
            posts.map((post, i) => (
              <PostCard 
                key={post.title}
                post={post.node}
              />
            ))
          }
          </div>
          <div className={tw`lg:col-span-4 col-span-1`}>
            <div className={tw`lg:sticky relative top-8`}>
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </main>
      
    </div>
  )
}
  

export async function getStaticProps() {
  const posts = (await getPosts()) || []

  return {
    props: {posts}
  }
}