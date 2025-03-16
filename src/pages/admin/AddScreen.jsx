import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E'];
    const seatsPerRow = 10;
    const seats = rows.map(row => {
        return Array.from({ length: seatsPerRow }, (_, index) => `${row}${index + 1}`);
    });
    return seats;
};

const AddScreen = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        city: '',
        seats: generateSeats(), // Generate seats from A1 to E10
        screenType: '',
        price: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
     const [loading, setLoading] = useState(true);
     const [screens, setScreens] = useState([]);
     const navigate =useNavigate()



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSeatChange = (rowIndex, seatIndex, value) => {
        const newSeats = [...formData.seats];
        newSeats[rowIndex][seatIndex] = value;
        setFormData((prevData) => ({
            ...prevData,
            seats: newSeats,
        }));
    };

    const addSeatRow = () => {
        setFormData((prevData) => ({
            ...prevData,
            seats: [...prevData.seats, ['']],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await axiosInstance({
                method :"POST",
                url :"/screen/add-screen",
                data :formData
            });
            toast.success(response.data.message)
            setSuccess(response.data.message);
            setFormData({
                name: '',
                location: '',
                city: '',
                seats: generateSeats(), // Reset to generated seats
                screenType: '',
                price: '',
            });
        } catch (err) {
            toast.error(err.response.data.message || 'An error occurred')
            setError(err.response.data.message || 'An error occurred');
        }
    };


    const fetchScreens = async () => {
                try {
                    const response = await axiosInstance({
                      method : 'GET',
                      url :"/screen/get-screenById"
                    }); // Adjust the URL as needed
                    console.log(response)
                    setScreens(response.data.data);
                } catch (err) {
                    setError(err.response ? err.response.data.message : 'An error occurred');
                } finally {
                    setLoading(false);
                }
            };
            useEffect(() => {
            fetchScreens();
        }, []);
    
      if (loading) return <div className="text-center text-2xl">Loading theatres...</div>;

      if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-700 p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Theatres</h1>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Screen</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Screen Type</label>
                    <input
                        type="text"
                        name="screenType"
                        value={formData.screenType}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
 <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Seats</label>
                    {formData.seats.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex mb-2">
                            {row.map((seat, seatIndex) => (
                                <input
                                    key={seatIndex}
                                    type="text"
                                    value={seat}
                                    onChange={(e) => handleSeatChange(rowIndex, seatIndex, e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 mr-2"
                                    required
                                />
                            ))}
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addSeatRow}
                        className="mt-2 bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600"
                    >
                        Add Seat Row
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
                >
                    Add Screen
                </button>
            </form>
        </div>
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mt-4 mb-4 text-blue-600">Screens Details</h1>
            {screens.length === 0 ? (
                <div className="text-center">No screens found for this admin.</div>
            ) : (
                <ul className="space-y-4">
                    {screens.map(screen => (
                        <li key={screen._id} className="bg-gray-700 text-white dark:text-black dark:bg-slate-300 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out">
                            <h2 className="text-2xl font-semibold  text-white dark:text-black mb-2">{screen.name}</h2>
                            <p className="text-white dark:text-black">Screen ID: {screen._id}</p>
                            <p className="text-white dark:text-black mb-2">Theatre Admin ID: {screen.theatre_admin}</p>
                            <p className="text-white dark:text-black mb-2">Location: {screen.location}</p>
                            <p className="text-white dark:text-black">City: {screen.city}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        <button type="button"onClick={()=>navigate('/admin/screens')}
        className="w-full bg-blue-500 text-white font-bold py-2 mt-4 rounded hover:bg-blue-600" >
        Go to Screen </button>
        </div>
    );
};

export default AddScreen;