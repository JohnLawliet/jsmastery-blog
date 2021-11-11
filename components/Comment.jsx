import moment from 'moment'
import parse from 'html-react-parser'
import { getComments } from '../services'
import { useQuery } from 'react-query'
import { tw } from 'twind'
import { Loader } from '.'

const Comment = ({slug}) => {
    const {data, isLoading, isError, error} = useQuery('comments',() => getComments(slug))

    if (isLoading){
        return <div><Loader /></div>
    }

    if (isError){
        return <div>ERRORED : {error}</div>
    }

    return (
        <div className={tw`bg-white shadow-lg rounded-lg p-8 pb-12 mb-8`}>
            <h3 className={tw`text-xl mb-8 font-semibold border-b pb-4`}>
                {data.length} Comments
            </h3>
            {
                data.map(comment => (
                    <div 
                    key={comment.createdAt}
                    className={tw`border(b gray-100) mb-4 pb-4`}
                    >
                        <p className={tw`mb-4`}>
                            <span className={tw`font-semibold`}>
                            {comment.name} on {moment(comment.createdAt).format('MMM DD, YYYY')}
                            </span>
                        </p>
                        <p className={tw`whitespace-pre-line text-gray-600 w-full`}>
                        {parse(comment.comment)}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}

export default Comment
