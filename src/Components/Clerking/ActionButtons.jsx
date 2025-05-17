import { useState } from 'react';
import { jsPDF } from 'jspdf';
import { useNavigate } from 'react-router';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const ActionButtons = ({ id, clerking }) => {
    const [isExporting, setIsExporting] = useState(false);
    const navigate = useNavigate();
    const { accessToken } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);


    // handle update
    const handleUpdate = async () => {
        navigate(`/clerkings/${id}/update`, { state: { clerking } });
    }

    // handle delete
    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            // Validate required parameters
            if (!id) {
                throw new Error('Clerking ID is required for deletion');
            }

            // Send delete request to the server
            const response = await api.delete(`/clerkpad/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            // Check response status
            if (response.status === 200) {
                // Success - navigate to clerkings page
                navigate('/clerkings');
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }

        } catch (error) {
            // Handle specific error types
            if (error.response) {
                // Server responded with error status
                console.error('Server error:', error.response.data);
                throw new Error(error.response.data.message || 'Failed to delete clerking');
            } else if (error.request) {
                // Request made but no response received
                console.error('Network error:', error.request);
                throw new Error('Network error - please check your connection');
            } else {
                // Other errors
                console.error('Error deleting clerking:', error.message);
                throw new Error(error.message || 'Failed to delete clerking');
            }
        } finally {
            setIsDeleting(false);
        }
    }

    // pdf export function
    const handleExportPDF = async () => {
        try {
            setIsExporting(true);
            
            // Create new jsPDF instance
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            // Get the content element
            const content = document.getElementById('content');
            if (!content) {
                throw new Error('Content element not found');
            }

            // Configure text settings
            doc.setFont('helvetica');
            doc.setFontSize(12);

            // Add hospital header (you can customize this)
            doc.setFontSize(16);
            doc.text('Clerking Note', 20, 20);
            doc.setFontSize(12);

            // Get all text content
            const sections = content.children;
            let yPosition = 30;
            const margin = 20;
            const lineHeight = 7;

            Array.from(sections).forEach((section, index, array) => {
                // Get heading and content
                const heading = section.querySelector('h2')?.textContent;
                const text = section.querySelector('p')?.textContent;

                // Check if adding this section would exceed page height
                const estimatedHeight = (heading ? lineHeight : 0) + 
                    (text ? (doc.splitTextToSize(text, 170).length * lineHeight) : 0) + 5;

                if (yPosition + estimatedHeight > 270 && index !== array.length - 1) {
                    doc.addPage();
                    yPosition = 20;
                }

                if (heading) {
                    // Add section heading
                    doc.setFont('helvetica', 'bold');
                    doc.text(heading, margin, yPosition);
                    yPosition += lineHeight;
                }

                if (text) {
                    // Add section content with word wrap
                    doc.setFont('helvetica', 'normal');
                    const splitText = doc.splitTextToSize(text, 170); // 170mm is the wrapping width
                    doc.text(splitText, margin, yPosition);
                    yPosition += (splitText.length * lineHeight);
                }

                // Add spacing between sections
                yPosition += 5;
            });

            // Generate the PDF as a blob
            const pdfBlob = doc.output('blob');

            // Check if the File System Access API is supported
            if ('showSaveFilePicker' in window) {
                try {
                    // Configure file picker options
                    const opts = {
                        suggestedName: 'clerking-note.pdf',
                        types: [{
                            description: 'PDF Document',
                            accept: {'application/pdf': ['.pdf']},
                        }],
                    };

                    // Show the file picker
                    const handle = await window.showSaveFilePicker(opts);
                    
                    // Create a FileSystemWritableFileStream
                    const writable = await handle.createWritable();
                    
                    // Write the blob to the file
                    await writable.write(pdfBlob);
                    await writable.close();
                } catch (err) {
                    // Handle if user cancels the save dialog
                    if (err.name !== 'AbortError') {
                        throw err;
                    }
                }
            } else {
                // Fallback for browsers that don't support File System Access API
                const filename = window.prompt('Enter a name for the PDF file', 'clerking-note');
                if (filename) {
                    doc.save(`${filename}.pdf`);
                }
            }
        } catch (error) {
            console.error('PDF generation failed:', error);
            // You might want to show an error notification to the user here
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-2 sm:gap-4">
            <button 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-gray-600 text-white text-sm sm:text-base font-medium
                    transition duration-200 ease-in-out
                    hover:bg-gray-700 hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50
                    ${isExporting ? 'opacity-50 cursor-not-allowed hover:bg-gray-600' : ''}`}
                onClick={handleExportPDF}
                disabled={isExporting}
            >
                {isExporting ? 'Generating PDF...' : 'Export PDF'}
            </button>
            <button
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-blue-800 text-white text-sm sm:text-base font-medium
                    transition duration-200 ease-in-out
                    hover:bg-blue-900 hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                onClick={() => handleUpdate(id)}
            >
                Update
            </button>
            <button
                disabled={isDeleting}
                className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600 text-white text-sm sm:text-base font-medium
                    transition duration-200 ease-in-out
                    hover:bg-red-700 hover:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                onClick={() => handleDelete(id)}
            >
                {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
        </div>
    )
}

export default ActionButtons;
