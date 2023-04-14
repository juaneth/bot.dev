const Home = () => {
  return (
    <div className="content">
      <h1 className="text-2xl mb-1 text-shadow-white">Home</h1>

      <div className="opacity-50">Apha v{process.env.npm_package_version}</div>
    </div>
  )
};

export default Home;
