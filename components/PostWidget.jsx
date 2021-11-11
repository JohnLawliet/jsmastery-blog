import moment from 'moment'
import {useState, useEffect} from 'react'
import { tw } from 'twind'
import { getRecentPosts, getSimilarPosts } from '../services'
import Link from 'next/link'


const PostWidget = ({slug, categories}) => {
    const [relatedPosts, setRelatedPosts] = useState([])


    useEffect(() => {
        if (slug){
            getSimilarPosts(categories, slug)
            .then(res => setRelatedPosts(res))
        }
        else{
            getRecentPosts()
            .then(result => setRelatedPosts(result))
        }
    }, [slug])

    return (
        <div className={tw`bg-white shadow-lg rounded-lg p-8 mb-8`}>
            <h3 className={tw`text-xl font-semibold mb-8 border-b pb-4`}>
                {slug? 'Related Posts' : 'Recent Posts'}
            </h3>
            {
                relatedPosts.map(post => (
                    <div 
                        key={post.title}
                        className={tw`flex items-center w-full mb-4`}
                    >
                        <div className={tw`w-16 flex-none`}>
                            <img src={post.featuredImage.url} alt={post.title}
                                className={tw`h-[60px] w-[60px] align-middle rounded-full`}
                            />
                        </div>
                        <div className={tw`flex-grow ml-4`}>
                            <p className={tw`text-gray-500 font-xs`}>
                            {moment(post.createdAt).format('MMM DD, YYYY')}
                            </p>
                            <Link
                                href={`/post/${post.slug}`}
                                className={tw`text-md`}
                            >
                            {post.title}
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostWidget
