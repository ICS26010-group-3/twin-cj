import * as XLSX from "xlsx";
import path from "path";
import appAssert from "../utils/appAssert";
import { BAD_REQUEST } from "../constants/http";

/**
 * Load FAQ data from an Excel file.
 */
export const loadFAQsFromExcel = () => {
  const filePath = path.join(__dirname, "../../data/faqs.xlsx");

  const workbook = XLSX.readFile(filePath);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert the sheet to JSON
  const faqs = XLSX.utils.sheet_to_json(sheet, {
    header: ["question", "answer"],
    defval: "",
  });

  console.log("Loaded FAQs:", faqs);

  return faqs.slice(1);
};

/**
 * Search FAQs based on a user query.
 * @param query - The user's search query.
 */
export const searchFAQs = (query: string) => {
  appAssert(query, BAD_REQUEST, "Query parameter is required.");

  // Load FAQs from the Excel file
  const faqs = loadFAQsFromExcel();

  // Filter FAQs based on the query
  const results = faqs.filter(
    (faq: any) =>
      faq.question.toLowerCase().includes(query.toLowerCase()) ||
      faq.answer.toLowerCase().includes(query.toLowerCase())
  );

  return results;
};
