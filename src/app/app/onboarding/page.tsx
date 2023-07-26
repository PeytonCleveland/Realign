import { Page } from "@/components";

const Onboarding = () => {
  return (
    <Page>
      <div className="w-full bg-gray-50 h-full flex flex-1">
        <div className="mb-6 mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
          <div className="bg-white rounded-md shadow-sm p-8 w-[500px] flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">Profile information</h1>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                name="firstName"
                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="block font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                name="lastName"
                className="px-3 py-2 rounded-md shadow-sm border border-gray-300 text-sm"
              />
            </div>
            <button className="bg-blue-600 self-end text-white py-2 px-4 font-medium shadow-sm rounded-md w-fit flex justify-center items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2">
              Complete Profile
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Onboarding;
