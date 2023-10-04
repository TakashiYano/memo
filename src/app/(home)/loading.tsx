const Loading = () => {
  return (
    <div className="p-4">
      <ul className="space-y-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => {
          return (
            <li
              key={v}
              className="w-full animate-pulse rounded-xl bg-indigo-2 p-4 shadow dark:bg-indigodark-2"
            >
              <div className="h-3.5 w-3/4 rounded bg-indigo-3 dark:bg-indigodark-3"></div>
              <div className="mt-2.5 h-3.5 rounded bg-indigo-3 dark:bg-indigodark-3"></div>
              <div className="mt-6 h-3.5 w-16 rounded bg-indigo-3 dark:bg-indigodark-3"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Loading;
