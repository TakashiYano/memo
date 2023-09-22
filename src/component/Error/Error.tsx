/* eslint-disable func-style */
export const Error = () => {
  return (
    <div className="space-y-2">
      <p>
        エラーが発生しました。
        <br className="hidden sm:block" />
        更新してもうまくいかない場合は下記よりお問い合わせください。
      </p>
      <a
        className="inline-block font-bold text-blue-500"
        href="##"
        target="_blank"
        rel="noopener noreferrer"
      >
        お問い合わせ
      </a>
    </div>
  );
};
