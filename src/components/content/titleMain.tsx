const TitleMain = ({ text = "", sub = "" }) => {
  return (
    <div className="my-10 pt-20">
      <h1 className="className=scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl text-main">
        {text}
      </h1>
      <h2 className="text-sm font-medium pt-4 text-slate-600">{sub}</h2>
    </div>
  );
};

export default TitleMain;
