// utils/pdfUtils.js
import { PDFDocument } from 'pdf-lib';

// ✅ Read PDF form fields
export const readPdfFormFields = async (pdfUrl) => {
  try {
    const res = await fetch(pdfUrl);
    if (!res.ok) throw new Error('Failed to fetch PDF');

    const existingPdfBytes = await res.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const form = pdfDoc.getForm();
    const fields = form.getFields();

    const data = {};

    fields.forEach((field) => {
      const name = field.getName();
      const type = field.constructor.name;

      switch (type) {
        case 'PDFTextField':
          data[name] = field.getText() || '';
          break;

        case 'PDFCheckBox':
          data[name] = field.isChecked();
          break;

        case 'PDFRadioGroup':
          data[name] = field.getSelected();
          break;

        case 'PDFDropdown':
          data[name] = field.getSelected();
          break;

        default:
          data[name] = null;
      }
    });

    return data;
  } catch (error) {
    console.error('Error reading PDF:', error);
    return {};
  }
};

// ✅ Fill PDF and return bytes
export const fillAndGetPdfBytes = async (pdfUrl, formData) => {
  try {
    const res = await fetch(pdfUrl);
    if (!res.ok) throw new Error('Failed to fetch PDF');

    const existingPdfBytes = await res.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const form = pdfDoc.getForm();

    Object.entries(formData).forEach(([fieldName, value]) => {
      try {
        const field = form.getField(fieldName);
        const type = field.constructor.name;

        if (type === 'PDFTextField') {
          field.setText(String(value || ''));
        } else if (type === 'PDFCheckBox') {
          value ? field.check() : field.uncheck();
        } else if (type === 'PDFRadioGroup') {
          if (value) field.select(value);
        } else if (type === 'PDFDropdown') {
          if (value) field.select(value);
        }
      } catch (e) {
        // Skip fields not present in PDF
      }
    });

    // ✅ VERY IMPORTANT: Flatten so values become permanent
    form.flatten();

    return await pdfDoc.save();
  } catch (error) {
    console.error('Error filling PDF:', error);
    return null;
  }
};