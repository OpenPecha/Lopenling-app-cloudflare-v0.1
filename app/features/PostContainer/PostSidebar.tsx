import { useEffect } from 'react';
import PostForm from '~/features/Post/PostForm';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import Posts from '~/features/Post/Posts';
import uselitteraTranlation from '~/locales/useLitteraTranslations';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { openFilterState, selectedPostThread as selectedPostThreadState, showLatest, showSidebar } from '~/states';
import { GrClose } from 'react-icons/gr';
import { FaFilter } from 'react-icons/fa';

export default function PostSidebar({ createPost }: { createPost: any }) {
  const data = useLoaderData();
  let [, setParams] = useSearchParams();
  let [selectedPostThread, setSelectedThread] = useRecoilState(selectedPostThreadState);
  useEffect(() => {
    let selectedThread = data.threadId;
    if (selectedThread && selectedThread !== '') {
      setTimeout(() => {
        document.getElementById('p_' + selectedThread)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
        document.getElementById(selectedThread)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }, 2000);
      setParams('', { preventScrollReset: true });

      let timer = setTimeout(() => {
        setSelectedThread({ id: selectedThread });
      }, 1000);
      return () => {
        if (timer && selectedPostThread.id) {
          clearTimeout(timer);
        }
      };
    }
  }, []);
  const setOpenFilter = useSetRecoilState(openFilterState);
  const setOpenContent = useSetRecoilState(showSidebar);

  const translation = uselitteraTranlation();
  const handleClose = () => {
    setOpenContent(false);
  };
  if (data.posts?.error) return <div className="mt-2 p-3 text-red-700">Error:{data.posts.error}</div>;
  return (
    <>
      <PostForm createPost={createPost} />

      <div className="sticky top-0 z-50  flex  w-full items-center justify-between gap-2 bg-white dark:bg-gray-700 ">
        <div className="z-30 flex flex-1 items-center  justify-between  py-2">
          <div className="flex">
            <LatestFilter />
            <button
              id="filterButton"
              onClick={() => setOpenFilter((prev) => !prev)}
              className="flex items-center justify-center space-x-2 rounded-lg border border-gray-200 px-3 py-2 filter"
            >
              <FaFilter className="text-gray-500" />
              <span className="text-sm font-medium leading-tight text-gray-500 dark:text-gray-50">
                {translation.filter}
              </span>
            </button>
          </div>
          <button onClick={handleClose} className="mr-2 bg-white" style={{ padding: 10, borderRadius: 20 }}>
            <GrClose size={14} className="cursor-pointer" />
          </button>
        </div>
      </div>
      <hr />

      <Posts posts={data.posts} />
    </>
  );
}

const LatestFilter = () => {
  const [isLatest, setIsLatestPost] = useRecoilState(showLatest);
  const options = ['Latest', 'Earliest'];
  const toggleLatest = () => {
    setIsLatestPost((prev) => !prev);
  };
  return (
    <div
      className="cursor-pointer p-3 text-sm font-medium leading-tight text-gray-500 dark:text-gray-50"
      onClick={toggleLatest}
    >
      {isLatest ? options[0] : options[1]}
    </div>
  );
};