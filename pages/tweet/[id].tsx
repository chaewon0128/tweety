import IconBtn from "../../components/button/IconBtn";
import Profile from "../../components/Profile";
import Textarea from "../../components/Textarea";
import HeartBtn from "../../components/button/HeartBtn";
import XButton from "../../components/button/XButton";
import useSWR from "swr";
import { useRouter } from "next/router";
import Answer from "../../components/Answer";
import { useEffect } from "react";
import { AnswerType, DataType } from "../../type/type";
import dateInvert from "../../lib/dateInvert";
import DeleteBtn from "../../components/button/DeleteBtn";
import useMutation from "../../lib/useMutation";
import { Toaster, toast } from "react-hot-toast";
import lineBreak from "../../lib/lineBreak";


export default function Tweet() {
    const router = useRouter();
    const [mutation, { data: deleteData }] = useMutation("/api/post/delete")
    const { data: answerData, mutate, isValidating: isLoading } = useSWR(router?.query.id ? `/api/post/${router.query.id}/answer` : null)
    const { data, isValidating, mutate: countingMutate } = useSWR<DataType>(router?.query.id ? `/api/post/${router.query.id}` : null)

    useEffect(() => {
        if (answerData) {
            mutate();
        }
    }, [answerData]);

    useEffect(() => {
        countingMutate()

    }, [data]);

    useEffect(() => {
        if (deleteData?.status === 200) {
            toast.success(deleteData?.message)
            setTimeout(() => (router.push("/")), 1000)
        }
        if (deleteData?.status === 400) {
            toast.error(deleteData?.message)
        }
    }, [deleteData])
    const onTweetDelete = async () => {
        mutation(data, "DELETE")
    }


    return (
        <div className="w-full bg-gradient-to-br min-h-screen flex justify-center items-center">
            {isValidating ? <div className="spinner"></div> :
                <div className="bg-white w-[80%] shadow-2xl mt-14 rounded-3xl py-14 px-8 relative">
                    <Profile name={data?.post?.user.name} email={data?.post?.user.email} avatarUrl={data?.post?.user.avatarUrl} />
                    {data?.post?.tweetImg ? <img src={`https://imagedelivery.net/AknRL7Jzvc4BH3-QpgQFyQ/${data?.post.tweetImg}/public`} className="mt-5" /> : null}
                    <p className="ml-2 mt-5">
                        {lineBreak(data?.post?.content)}
                    </p>
                    <div className="text-end mt-4 text-xs">{dateInvert(data?.post?.createdAt)}</div>
                    <div className="mt-5 py-3 border-t border-b flex justify-around items-center">
                        <div className="flex flex-col items-center justify-center cursor-pointer text-sm"><HeartBtn liked={data?.isLiked} />{`${data?.post?._count?.favorite} likes`}</div>
                        <div className="flex flex-col items-center justify-center cursor-pointer text-sm"><IconBtn type="comment" />{`${data?.post?._count?.answer} comment`}</div>
                        <div className="flex flex-col items-center justify-center cursor-pointer text-sm"><IconBtn type="bookmark" />Mark</div>
                        <div className="flex flex-col items-center justify-center cursor-pointer text-sm"><DeleteBtn onClick={onTweetDelete} />Delete</div>
                    </div>
                    <Textarea />
                    {answerData?.tweets?.sort((a: AnswerType, b: AnswerType) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((tweet: AnswerType) => (
                        <Answer commentData={tweet} key={tweet.id} />
                    ))}
                    <XButton page="back" position="top-5" />
                </div>
            }
            <div><Toaster /></div>
        </div>
    );
}

