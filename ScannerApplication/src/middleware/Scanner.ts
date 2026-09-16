import type { ScannerType } from "../Types/ScannerType";

const API_URL = import.meta.env.VITE_API_URL;

// GET all scanners
export async function getScanners(): Promise<ScannerType[]> {
    const response = await fetch(`${API_URL}/api/scanner`);

    if (!response.ok) {
        throw new Error("Failed to retrieve scanners.");
    }

    return await response.json();
}


// GET scanner by ID
export async function getScanner(id: string): Promise<ScannerType> {
    const response = await fetch(`${API_URL}/api/scanner/${id}`);

    if (!response.ok) {
        throw new Error("Failed to retrieve scanner.");
    }

    return await response.json();
}


// GET scanners by checklist ID
export async function getScannersByChecklist(
    checklistId: string
): Promise<ScannerType[]> {

    const response = await fetch(
        `${API_URL}/api/scanner/checklist/${checklistId}`
    );

    if (!response.ok) {
        throw new Error("Failed to retrieve scanners.");
    }

    return await response.json();
}


// CREATE scanner
export async function createScanner(
    scanner: ScannerType
): Promise<ScannerType> {

    const response = await fetch(`${API_URL}/api/scanner`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scanner)
    });

    if (!response.ok) {
        throw new Error("Failed to create scanner.");
    }

    return await response.json();
}


// UPDATE scanner
export async function updateScanner(
    id: string,
    scanner: Partial<ScannerType>
): Promise<ScannerType> {

    const response = await fetch(`${API_URL}/api/scanner/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(scanner)
    });

    if (!response.ok) {
        throw new Error("Failed to update scanner.");
    }

    return await response.json();
}


// DELETE scanner
export async function deleteScanner(
    id: string
): Promise<void> {

    const response = await fetch(`${API_URL}/api/scanner/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete scanner.");
    }
}

