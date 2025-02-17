import React from "react";
import { useFetch } from "../../hooks/useFetch";


const UserList = () => {

      const [userData] = useFetch("/user/profile");
    
    return (
      <div className="flex flex-wrap justify-center gap-6 py-10 bg-gray-100">
        {userData.map((user) => (
          <section
            key={user._id}
            className="bg-white p-6 rounded-lg shadow-lg w-96 text-center"
          >
          </section>
        ))}
      </div>
    );
  };

  export default UserList
  