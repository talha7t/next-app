import React from "react";

interface User {
  id: number;
  name: string;
}

const Users = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    // cache: 'no-store', // do not store data, use inase if data changes frequently

    // next is a configuration object for next js, revalidate will refetch data after specified seconds
    next: {
        revalidate: 10
    }
  });
  // the caching behaviour is onlu implemented in the fetch function, so if we use a third party library, we wont get the data cache
  const users: User[] = await res.json();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
