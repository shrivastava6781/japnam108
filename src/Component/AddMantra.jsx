// import React, { useState } from "react";

// export const AddMantra = () => {
//     const [description, setDescription] = useState("");
//     const [taskList, setTaskList] = useState(
//         localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
//     );

//     function saveData(newObj) {
//         let newTask = [...taskList, newObj];
//         setTaskList(newTask);
//         localStorage.setItem("tasks", JSON.stringify(newTask));
//     }

//     function submitHandler(e) {
//         e.preventDefault();
//         if (!description.trim()) return; // Prevent adding empty tasks

//         let newObj = {
//             id: Date.now(), // More reliable than milliseconds
//             taskName: description,
//             isDone: false,
//         };

//         saveData(newObj);
//         setDescription(""); // Reset input field
//     }

//     return (
//         <div className="rounded-lg shadow-lg max-w-md mx-auto mt-3">
//             <form onSubmit={submitHandler} className="space-y-1">
//                 <textarea
//                     className="w-full bg-transparent border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-black-500"
//                     rows="3"
//                     placeholder="📿 Add Your Mantra"
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                     required
//                 ></textarea>
//                 <button
//                     type="submit"
//                     className="bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-indigo-800 transition duration-300"
//                 >
//                     Add
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddMantra;












































import React, { useState, useEffect } from "react";

export const AddMantra = () => {
    const [description, setDescription] = useState("");
    const [taskList, setTaskList] = useState(
        localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
    );
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }, [taskList]);

    function saveData(newObj) {
        const newTask = [...taskList, newObj];
        setTaskList(newTask);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (!description.trim()) return;

        let newObj = {
            id: Date.now(),
            taskName: description,
            isDone: false,
        };

        saveData(newObj);
        setDescription("");
    }

    function showNextMantra() {
        if (taskList.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % taskList.length);
            setDescription(taskList[(currentIndex + 1) % taskList.length].taskName);
        }
    }

    function updateMantra() {
        let updatedTasks = taskList.map((task, index) =>
            index === currentIndex ? { ...task, taskName: description } : task
        );
        setTaskList(updatedTasks);
    }

    return (
        <div className="rounded-lg shadow-lg max-w-md mx-auto mt-3">
            <form onSubmit={submitHandler} className="">
                <textarea
                    className="w-full bg-transparent border border-gray-300 rounded-lg p-1 focus:outline-none focus:ring-2 focus:ring-black-500"
                    rows="3"
                    placeholder="📿 Add Your Mantra"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <div>
                <button
                    type="submit"
                    className="bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-indigo-800 transition duration-300"
                >
                    Add
                </button>
                <button
                    type="button"
                    onClick={showNextMantra}
                    className="bg-green-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-green-800 transition duration-300"
                >
                    Show Next
                </button>
                <button
                    type="button"
                    onClick={updateMantra}
                    className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-yellow-700 transition duration-300"
                >
                    Update
                </button>
                </div>
                
            </form>
        </div>
        // <div className="rounded-lg shadow-lg max-w-md mx-auto mt-3 p-4 bg-white">
        //     <form onSubmit={submitHandler} className="space-y-2">
        //         <textarea
        //             className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
        //             rows="3"
        //             placeholder="📿 Add Your Mantra"
        //             value={description}
        //             onChange={(e) => setDescription(e.target.value)}
        //             required
        //         ></textarea>
        //         <div className="flex space-x-2">
        //             <button
        //                 type="submit"
        //                 className="bg-indigo-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-indigo-800 transition duration-300"
        //             >
        //                 Add
        //             </button>
        //             <button
        //                 type="button"
        //                 onClick={showNextMantra}
        //                 className="bg-green-600 text-white font-bold py-1 px-3 rounded-lg hover:bg-green-800 transition duration-300"
        //             >
        //                 Show Next
        //             </button>
        //             <button
        //                 type="button"
        //                 onClick={updateMantra}
        //                 className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-yellow-700 transition duration-300"
        //             >
        //                 Update
        //             </button>
        //         </div>
        //     </form>
        // </div>
    );
};

export default AddMantra;
