const Loading = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col items-center  space-y-4">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
      <div className="font-bold">ローディング中</div>
    </div>
  );
};

export default Loading;
