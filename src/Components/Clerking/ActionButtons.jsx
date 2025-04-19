

const ActionButtons = (id) => {
    return (
        <div className="space-x-4">
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                onClick={() => handleUpdate(id)}
            >
                Update
            </button>
            <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                onClick={() => handleDelete(id)}
            >
                Delete
            </button>
        </div>
    )
}

export default ActionButtons;
