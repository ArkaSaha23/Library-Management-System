import React from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const { users } = useSelector((state) => state.userReducer);

  const formatDateTime = (timeStamp) => {
    const date = new Date(timeStamp);

    const day = `${String(date.getDate()).padStart(2, "0")}`;
    const month = `${String(date.getMonth() + 1).padStart(2, "0")}`;
    const year = `${String(date.getFullYear())}`;
    const borrowedDate = `${day}-${month}-${year}`;

    const hours = `${String(date.getHours()).padStart(2, 0)}`;
    const minutes = `${String(date.getMinutes()).padStart(2, 0)}`;
    const seconds = `${String(date.getSeconds()).padStart(2, 0)}`;
    const borrowedTime = `${hours}:${minutes}:${seconds}`;

    return `${borrowedDate} ${borrowedTime}`;
  };

  return (
    <>
      <main className="mt-2 w-full h-full">
        {/* Heading */}
        <header className="mt-5 md:mt-8 flex w-full h-full justify-center items-center">
          <div className="flex justify-center text-xl font-medium md:text-3xl md:font-semiold text-gray-800">
            Registered Users List
          </div>
        </header>

        {/* list of users */}
        {/* list of users */}
        <div className="w-full overflow-x-auto md:overflow-x-visible md:flex justify-center">
          <table className="m-5 w-full md:w-10/11 min-w-[800px] text-sm border border-gray-400">
            <thead>
              <tr className="bg-gray-700 border">
                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  ID
                </th>

                <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                  Name
                </th>

                <th className="px-4 py-3 text-left font-semibold text-gray-100 border border-gray-600">
                  Email
                </th>

                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  Role
                </th>

                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  Number Of Books Borrowed
                </th>

                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  Registered On
                </th>
              </tr>
            </thead>

            <tbody>
              {users?.map((user, index) => (
                <tr
                  key={user._id}
                  className="transition-colors hover:bg-gray-300"
                >
                  <td className="px-4 py-4 text-center text-gray-600">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4 font-medium text-gray-900">
                    {user.name}
                  </td>

                  <td className="px-4 py-4 text-gray-600">{user.email}</td>

                  <td className="px-4 py-4 text-center">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center text-gray-600">
                    {user.borrowedBooks?.length || 0}
                  </td>

                  <td className="px-4 py-4 text-center text-gray-600 whitespace-nowrap">
                    {formatDateTime(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default Users;
