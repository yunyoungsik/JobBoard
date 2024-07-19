export default function Hero() {
  return (
    <section className="container my-16">
      <h1 className="text-4xl font-bold text-center">Fin your next dream job</h1>
      {/* <p className="text-center text-gray-600 mt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque recusandae dolorum voluptate
        laudantium vel, aspernatur eligendi quae fugit ducimus enim dolores et culpa quo assumenda.
      </p> */}

      <form className="flex gap-2 mt-4 max-w-md mx-auto">
        <input type="search" placeholder="Search phrase..." className="border border-gray-400 w-full py-2 px-3 rounded-md" />

        <button className="bg-blue-600 text-white py-2 px-4 rounded-md">Search</button>
      </form>
    </section>
  );
}
