import React from "react";

const Users = ({ users }) => {
  return (
    <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 lg:px-8 py-6 border-b border-gray-200 bg-linear-to-r from-white to-gray-50">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
              All Users
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Manage and view all registered users.
            </p>
          </div>

          <div className="px-4 py-2 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-sm font-semibold text-blue-600">
              Total Users: {users.length}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                Name
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                Email
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                Role
              </th>

              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                Registration Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map((user) => {
              return (
                <tr
                  key={user._id}
                  className="group hover:bg-blue-50/40 transition duration-200"
                >
                  {/* Name */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                          {user.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          User ID: {user._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-5">
                    <p className="text-sm text-gray-600">
                      {user.email}
                    </p>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Registration Date */}
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(user.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-gray-500 font-medium">
            No users found.
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Registered users will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Users;
