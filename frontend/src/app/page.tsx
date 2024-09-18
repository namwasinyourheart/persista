import Head from 'next/head';
import Quiz from './components/Quiz';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>MCQ Quiz App</title>
        <meta name="description" content="MCQ Quiz App using Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">MCQ Quiz App</h1>
        <Quiz />
      </main>
    </div>
  );
};

export default Home;
