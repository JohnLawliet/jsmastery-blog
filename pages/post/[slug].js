import {getPostDetails, getPosts} from '../../services'
import {
    PostDetail,
    Categories,
    PostWidget,
    Author,
    Comment,
    CommentsForm,
    Loader
} from '../../components'
import { tw } from 'twind'
import { useRouter } from 'next/router'


const PostDetails = ({post}) => {
    const router = useRouter()

    if (router.isFallback){
        return <Loader />
    }
    
    return (
        <div className={tw`container mx-auto px-10 mb-8`}>
            <div className={tw`grid grid-cols-1 lg:grid-cols-12 gap-12`}>
                <div className={tw`col-span-1 lg:col-span-8`}>
                    <PostDetail post={post} />
                    <Author author={post.author} />
                    <CommentsForm slug={post.slug} />
                    <Comment slug={post.slug} />
                </div>
                <div className={tw`col-span-1 lg:col-span-4`}>
                    <div className={tw`relative lg:sticky top-8`}>
                        <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />
                        <Categories />
                    </div>
                </div>
            </div>            
        </div>
    )
}

export default PostDetails

export async function getStaticProps({params}) {
    const data = await getPostDetails(params.slug)
    return {
        props: { post: data }
    }
}

export async function getStaticPaths(){
    const posts = await getPosts()
    return {
        paths: posts.map(({node: {slug} }) => {
                return {
                    params: { slug }
                }            
            }
        ),
        fallback:true
    }
}