import React from "react";
import { useSelector } from "react-redux";

const Users = () => {
  const usersArray = useSelector((state) => state.userReducer.users);

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
        <div className="mt-8 w-full px-2 sm:px-5 md:px-7 lg:px-10">
        <div className="w-full overflow-x-auto rounded-lg border border-gray-400 shadow-sm">
          <table className="md:w-full text-sm border border-gray-400">
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
                  Number of Currently Borrowed Books
                </th>

                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  Number of Returned Books
                </th>

                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  Overdue Books
                </th>

                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  Registered On
                </th>

                <th className="px-4 py-3 text-center font-semibold text-gray-100 border border-gray-600">
                  Last Login
                </th>
              </tr>
            </thead>

            <tbody>
              {usersArray?.map((user, index) => (
                <tr
                  key={user._id}
                  className="transition-colors hover:bg-gray-300"
                >
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                    {index + 1}
                  </td>

                  <td className="px-4 py-4 font-medium text-gray-900 border-r border-gray-300">
                    {user.name}
                  </td>

                  <td className="px-4 py-4 text-gray-600 border-r border-gray-300">
                    {user.email}
                  </td>

                  <td className="px-4 py-4 text-center border-r border-gray-300">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {user.role}
                    </span>
                  </td>

                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                    {user.booksBorrowed.length}
                  </td>

                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                    {
                      user.booksBorrowed.filter(
                        (book) => book.hasReturned == false,
                      ).length
                    }
                  </td>
                   <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                    {
                      user.booksBorrowed.filter(
                        (book) => book.hasReturned,
                      ).length
                    }
                  </td>
                  <td className="px-4 py-4 text-center text-gray-600 border-r border-gray-300">
                    {
                      user.booksBorrowed.filter(
                        (book) => book.hasReturned === false && new Date(book.Duedate) < new Date() ,
                      ).length
                    }
                  </td>

                  <td className="px-4 py-4 text-center text-gray-600 whitespace-nowrap">
                    {formatDateTime(user.createdAt)}
                  </td>

                   <td className="px-4 py-4 text-center text-gray-600 whitespace-nowrap">
                    {formatDateTime(user.updatedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      </main>
    </>
  );
};

export default Users;
