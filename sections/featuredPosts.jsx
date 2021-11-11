import {useQuery} from 'react-query'
import { getFeaturedPosts } from '../services'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { tw } from 'twind';
import FeaturedPostCard from '../components/FeaturedPost';
import Loader from '../components/Loader';

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
};

const FeaturedPosts = () => {
    const {data, isLoading, isError, error} = useQuery('featured', getFeaturedPosts, {
        retry: 1
    })

    if (isLoading)
        return <div><Loader /></div>

    if (isError)
        return <div>Error : {error}</div>

    console.log("data : ",data)

    const customLeftArrow = (
        <div className={tw`absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full`}>
          <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-6 w-6 text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </div>
    );
    
    const customRightArrow = (
        <div className={tw`absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full`}>
            <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-6 w-6 text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </div>
    );
    
    return (
        <div className={tw`mb-8`}>
            <Carousel 
            infinite 
            customLeftArrow={customLeftArrow} 
            customRightArrow={customRightArrow} 
            responsive={responsive} 
            itemClass={tw`px-4`}
            >
            {data.map((post, index) => (
                <FeaturedPostCard post={post} key={index}/>
            ))}
            </Carousel>
        </div>
    );
}

export default FeaturedPosts
