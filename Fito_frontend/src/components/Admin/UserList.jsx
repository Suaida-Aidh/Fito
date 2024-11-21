import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slices/userSlice'; // Adjust the import as necessary

const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    console.log(users,"print the users stare")

    useEffect(() => {
        dispatch(fetchUsers());
        
    }, [dispatch]);

    return (
        <div className="flex">
            <div className="flex-1">
                <div className="p-4">
                    {loading && <div>Loading users...</div>}
                    {error && <div className="text-red-500">{error}</div>}

                    <div className="mt-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-black sm:pl-0">Username</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-orange-500">Email</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-orange-500">Status</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{user.username}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{user.email}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-black">{user.is_active}</td>
                                                
                                            </tr>
                                        ))}
                                        {users.length === 0 && (
                                            <tr>
                                                <td colSpan="3" className="py-4 text-center text-sm text-gray-500">No users available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserList;
