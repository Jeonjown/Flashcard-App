// Loading.jsx
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loading;
