// import React from 'react';

// const formatDate = (dateString) => {
//     if (!dateString) return '-'; // Handle case where date is not available
//     const date = new Date(dateString);
//     return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
//   };

// export default function RecordsTable({ rows, viewType, totalPages, currentPage, onPageChange }) {
//   return (
//     <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//       <table className="w-full text-left">
//         <thead>
//           <tr className="bg-gray-200">
//             {viewType === 'sales' ? (
//               <>
//                 <th className="p-2">Bill No</th>
//                 <th className="p-2">Bill</th>
//                 <th className="p-2">Amount</th>
//                 <th className="p-2">Balance</th>
//                 <th className="p-2">Payment Type</th>
//               </>
//             ) : (
//               <>
//                 <th className="p-2">Receiver</th>
//                 <th className="p-2">Amount</th>
//                 <th className="p-2">Purpose</th>
//                 <th className="p-2">Method</th>
//                 <th className="p-2">Date</th>
//               </>
//             )}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.length > 0 ? (
//             rows.map((row, idx) => (
//               <tr key={idx} className="border-t">
//                 {viewType === 'sales' ? (
//                   <>
//                     <td className="p-2">{row.billNumber || '-'}</td>
//                     <td className="p-2">{row.totalBill || '-'}</td>
//                     <td className="p-2">{row.paidAmount || 0}</td>
//                     <td className="p-2">{row.balance || '-'}</td>
//                     <td className="p-2">{row.paymentType || '-'}</td>
//                   </>
//                 ) : (
//                   <>
//                     <td className="p-2">{row.payee || '-'}</td>
//                     <td className="p-2">{row.paidAmount || 0}</td>
//                     <td className="p-2">{row.reason || '-'}</td>
//                     <td className="p-2">{row.paymentType || '-'}</td>
//                     <td className="p-2">{formatDate(row.date)}</td>
//                   </>
//                 )}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={viewType === 'sales' ? 3 : 5} className="p-4 text-center">
//                 No records found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-center items-center mt-4 space-x-4">
//         <button
//           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//           disabled={currentPage === 1}
//           className={`px-3 py-1 rounded ${
//             currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-orange-500 text-white'
//           }`}
//         >
//           Previous
//         </button>
//         <span className="text-orange-500">
//           Page {currentPage} of {totalPages || 1}
//         </span>
//         <button
//           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//           disabled={currentPage === totalPages || totalPages === 0}
//           className={`px-3 py-1 rounded ${
//             currentPage === totalPages || totalPages === 0 ? 'bg-gray-300 text-gray-500' : 'bg-orange-500 text-white'
//           }`}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }


import React from 'react';

// Utility function to format the date
const formatDate = (dateString) => {
  if (!dateString) return '-'; // Handle case where date is not available
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Format to YYYY-MM-DD
};

export default function RecordsTable({
  rows,
  viewType,
  totalPages,
  currentPage,
  onPageChange,
}) {
  // Calculate summary values for sales view
  const getSalesSummary = () => {
    if (viewType !== 'sales') return null;

    const totalBills = rows.length;
    const totalBillAmount = rows.reduce(
      (sum, row) => sum + parseFloat(row.totalBill || 0),
      0
    );
    const totalPaid = rows.reduce(
      (sum, row) => sum + parseFloat(row.paidAmount || 0),
      0
    );
    const totalDebit = rows.reduce(
      (sum, row) => sum + parseFloat(row.balance || 0),
      0
    );

    return { totalBills, totalBillAmount, totalPaid, totalDebit };
  };

  const salesSummary = getSalesSummary();

  return (
    <div>
      {/* Display summary for sales records */}
      {salesSummary && (
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">No. of Bills:</p>
            <p>{salesSummary.totalBills}</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">Total Bill:</p>
            <p>{salesSummary.totalBillAmount}</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">Total Paid:</p>
            <p>{salesSummary.totalPaid}</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg">
            <p className="font-semibold">Debit:</p>
            <p>{salesSummary.totalDebit}</p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-200">
              {viewType === 'sales' ? (
                <>
                  <th className="p-2">Bill No</th>
                  <th className="p-2">Bill</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Balance</th>
                  <th className="p-2">Payment Type</th>
                </>
              ) : (
                <>
                  <th className="p-2">Receiver</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Purpose</th>
                  <th className="p-2">Method</th>
                  <th className="p-2">Date</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, idx) => (
                <tr key={idx} className="border-t">
                  {viewType === 'sales' ? (
                    <>
                      <td className="p-2">{row.billNumber || '-'}</td>
                      <td className="p-2">{row.totalBill || '-'}</td>
                      <td className="p-2">{row.paidAmount || 0}</td>
                      <td className="p-2">{row.balance || '-'}</td>
                      <td className="p-2">{row.paymentType || '-'}</td>
                    </>
                  ) : (
                    <>
                      <td className="p-2">{row.payee || '-'}</td>
                      <td className="p-2">{row.paidAmount || 0}</td>
                      <td className="p-2">{row.reason || '-'}</td>
                      <td className="p-2">{row.paymentType || '-'}</td>
                      <td className="p-2">{formatDate(row.date)}</td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={viewType === 'sales' ? 5 : 5} className="p-4 text-center">
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-orange-500 text-white'
            }`}
          >
            Previous
          </button>
          <span className="text-orange-500">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages || totalPages === 0 ? 'bg-gray-300 text-gray-500' : 'bg-orange-500 text-white'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
