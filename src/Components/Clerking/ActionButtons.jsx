import { useState } from 'react';
import { jsPDF } from 'jspdf';

const ActionButtons = (id) => {
    const [isExporting, setIsExporting] = useState(false);

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
        <div className="space-x-4">
            <button 
                style={{ 
                    backgroundColor: '#22c55e',
                    color: '#ffffff'
                }}
                className={`px-4 py-2 rounded hover:opacity-90
                    ${isExporting ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleExportPDF}
                disabled={isExporting}
            >
                {isExporting ? 'Generating PDF...' : 'Export PDF'}
            </button>
            <button
                style={{ 
                    backgroundColor: '#2563eb',
                    color: '#ffffff'
                }}
                className="px-4 py-2 rounded-md hover:opacity-90"
                onClick={() => handleUpdate(id)}
            >
                Update
            </button>
            <button
                style={{ 
                    backgroundColor: '#dc2626',
                    color: '#ffffff'
                }}
                className="px-4 py-2 rounded-md hover:opacity-90"
                onClick={() => handleDelete(id)}
            >
                Delete
            </button>
        </div>
    )
}

export default ActionButtons;
