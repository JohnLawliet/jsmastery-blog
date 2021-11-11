import moment from "moment"
import { Fragment } from "react";
import { tw } from "twind"

const PostDetail = ({post}) => {
    // this function takes in all data types within a post like bold, underline text, image, gif and renders them appropriately
    // might be a good idea to replace with mdx 
    const getContentFragment = (index, text, obj, type) => {
        let modifiedText = text;
        if (obj){
            if (obj.bold)
                modifiedText= (<b key={index}>{text}</b>)
            if (obj.italic)
                modifiedText = (<em key={index}>{text}</em>)
            if (obj.underline)
                modifiedText = (<u key={index}>{text}</u>)
        }

        switch (type) {
            case 'heading-three':
              return <h3 key={index} className={tw`text-xl font-semibold mb-4`}>{modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}</h3>;
            case 'paragraph':
              return <p key={index} className={tw`mb-8`}>{modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}</p>;
            case 'heading-four':
              return <h4 key={index} className={tw`text-md font-semibold mb-4`}>{modifiedText.map((item, i) => <Fragment key={i}>{item}</Fragment>)}</h4>;
            case 'image':
              return (
                <img
                  key={index}
                  alt={obj.title}
                  height={obj.height}
                  width={obj.width}
                  src={obj.src}
                />
              );
            default:
              return modifiedText;
          }
    }

    return (
        <div className={tw`bg-white shadow-lg rounded-lg lg:p-8 pb-12 mb-8`}>
            <div className={tw`relative overflow-hidden shadow-md mb-6`}>
                <img 
                    src={post.featuredImage.url}
                    alt={post.title} 
                    className={tw`object-top h-full w-full rounded-t-lg`}
                />
            </div>
            <div className={tw`px-4 lg:px-0`}>
                <div className={tw`flex items-center mb-8 w-full`}>
                    <div className={tw`flex items-center mb-4 mr-8 w-full lg:(mb-0 w-auto)`}>
                        <img 
                            alt={post.author.name}
                            className={tw`align-middle rounded-full h-[30px] w-[30px] object-contain`}
                            src={post.author.photo.url}
                        />
                        <p className={tw`inline align-middle text(lg gray-700) ml-2`}>{post.author.name}</p>
                    </div>
                    <div className={tw`font-medium text-gray-700`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={tw`h-6 w-6 inline mr-2 text-pink-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
                        />
                        </svg>
                        <span>
                            {moment(post.createdAt).format('MMMM DD, YYYY')}
                        </span>
                    </div>
                </div>
                <h1 className={tw`mb-8 text-3xl font-semibold`}>
                {post.title}
                </h1>
                {post.content.raw.children.map((typeObj, index) => {
                    const children = typeObj.children.map((item, itemIndex) => getContentFragment(itemIndex, item.text, item))
                    return getContentFragment(index, children, typeObj, typeObj.type)
                })}
            </div>
        </div>
    )
}

export default PostDetail
