import React from 'react'

const About=()=> {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 flex flex-col items-center justify-center py-10">
      {/* Container */}
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">About Us</h1>

        {/* App Introduction */}
        <section className="text-gray-700 mb-8">
          <p className="text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-indigo-600">Movies Bay</span>, your ultimate movie booking destination!
            Our platform offers a seamless experience for booking tickets for the latest films. Whether you're looking for action-packed blockbusters or heartwarming family movies, we’ve got it all.
          </p>
        </section>

        {/* Features Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li className="text-lg text-gray-700">Easy and fast movie ticket booking</li>
            <li className="text-lg text-gray-700">Real-time showtime updates</li>
            <li className="text-lg text-gray-700">Exclusive offers and discounts</li>
            <li className="text-lg text-gray-700">Seamless payment integration</li>
            <li className="text-lg text-gray-700">User-friendly interface and smooth navigation</li>
          </ul>
        </section>

        {/* Mission Statement */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-700">
            At <span className="font-semibold text-indigo-600">Movies Bay</span>, our mission is to make your movie-going experience
            as enjoyable and hassle-free as possible. We are committed to providing a reliable platform to book your favorite films,
            while offering great customer service and user-friendly features.
          </p>
        </section>
        </div>
        </div>
  )
}

export default About