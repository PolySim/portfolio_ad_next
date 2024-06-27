const FullArticle = ({ article }: { article: string }) => {
  return (
    <div className="flex justify-center items-center max-h-screen w-screen my-12 snap-center min-w-screen">
      <p className="w-10/12 h-fit max-h-full p-12 text-base text-gray-700 shadow overflow-y-scroll rounded-lg leading-7">
        {article}
      </p>
    </div>
  );
};

export default FullArticle;
