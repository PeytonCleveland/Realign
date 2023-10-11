import { Footer, Header, Page } from "@/components";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Header />
      <Page>
        <div className="w-full bg-gray-50 relative overflow-hidden">
          <span className="absolute -right-[180px] -bottom-10 h-full w-[550px] origin-bottom-right rotate-12">
            <Image src="/bg-texture.png" fill={true} alt="bg" />
          </span>
          <span className="absolute -left-[180px] -bottom-10 h-full w-[550px] origin-bottom-left -rotate-12">
            <Image
              src="/bg-texture.png"
              fill={true}
              alt="bg"
              style={{ transform: "rotateY(180deg)" }}
            />
          </span>

          <div className="mb-6 mx-auto max-w-screen-xl px-4 py-40 sm:px-6 lg:px-8 w-full flex flex-col items-center">
            <h1 className="text-xl font-bold text-gray-900 sm:text-5xl text-center mb-4">
              Realigning{" "}
              <span className="text-blue-600 relative">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
                <span className="relative">language models</span>
              </span>
            </h1>
            <h1 className="text-xl font-bold text-gray-900 sm:text-5xl text-center">
              for government use.
            </h1>

            <p className="mt-8 text-gray-500 text-center max-w">
              Together, we&apos;re making a revolution in AI learning.
              Contribute to data <br />
              crowdsourcing for training smarter language models.
            </p>

            <Link href="/sign-up">
              <button className="bg-blue-600 rounded-full shadow-sm text-white px-4 py-2 font-medium hover:bg-blue-500 mt-8">
                Get started for free
              </button>
            </Link>
          </div>
        </div>

        <section className="overflow-hidden bg-[url(/background.jpg)] bg-cover h-[120vh] relative pt-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
              <h2 className="text-3xl font-semibold text-white sm:text-4xl md:text-5xl ">
                Unleashing AI Potential with Crowdsourcing
              </h2>
              <p className="mt-6 tracking-tight text-blue-100">
                Realign harnesses the power of crowdsourcing to facilitate
                language model training for government use-cases
              </p>
            </div>
            <div className="self-start mt-20 flex flex-col gap-12 max-w-[350px]">
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl text-white font-semibold">
                  Submit Data
                </h4>
                <p className="text-sm text-gray-300 font-light">
                  Submit prompt and response pairs on any topic. Create yours
                  from scratch or use AI to come up with unique ideas.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl text-white font-semibold">
                  Rate Submissions
                </h4>
                <p className="text-sm text-gray-300 font-light">
                  Rate the submissions of other users on truthfulness,
                  helpfulness, and safety to highlight the best submissions.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-2xl text-white font-semibold">
                  Earn Rewards
                </h4>
                <p className="text-sm text-gray-300 font-light">
                  Earn points for contributing and fight for the top spot on the
                  Realign leaderboards. Top contributors can earn up to $250 in
                  rewards!
                </p>
              </div>
            </div>
            <div className="w-[60vw] h-[75vh] bg-gray-100 rounded-l-xl absolute right-0 bottom-24 overflow-hidden">
              <Image
                src="/app.png"
                fill={true}
                className="object-cover"
                alt="realign"
              />
            </div>
          </div>
        </section>

        {/* <section className="flex flex-col gap-8 mx-auto max-w-screen-xl justify-center px-4 py-48 sm:px-6 lg:px-8">
          Hi
        </section> */}

        <section className="bg-slate-900 w-full py-20">
          <div className="flex h-full w-full flex-col gap-4 mx-auto max-w-screen-xl justify-center items-center px-4 sm:px-6 lg:px-8">
            <h4 className="text-3xl font-semibold text-white sm:text-5xl text-center">
              <span className="relative">
                Join the real
                <svg
                  aria-hidden="true"
                  viewBox="0 0 418 42"
                  className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                  preserveAspectRatio="none"
                >
                  <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                </svg>
              </span>
              ignment today
            </h4>
            <Link href="/sign-up">
              <button className="bg-blue-600 mt-8 rounded-full shadow-sm text-white px-5 py-3 text-lg font-medium hover:bg-blue-500">
                Get started for free
              </button>
            </Link>
          </div>
        </section>
      </Page>
      <Footer />
    </>
  );
};

export default Home;
