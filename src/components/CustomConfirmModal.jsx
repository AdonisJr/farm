import React from 'react';

export default function CustomConfirmModal({ message, onConfirm, onCancel, selected, logout }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        <div className="bg-white p-8 rounded shadow-md">
          <p className="mb-4">{message}</p>
          {logout ? "" : <p className="mb-4">ID: {selected}</p>}
          <div className="flex justify-end">
            <button
              onClick={onConfirm}
              className="bg-red-500 text-white px-4 py-2 mr-2 rounded hover:bg-red-600"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </div>
      <div className='w-full h-full bg-indigo-900 opacity-20 fixed top-0 left-0'></div>
    </>

  )
}