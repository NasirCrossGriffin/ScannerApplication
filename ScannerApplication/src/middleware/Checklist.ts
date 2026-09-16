import type { ChecklistType  } from "../Types/ChecklistType";
const API_URL = import.meta.env.VITE_API_URL;

// GET all checklists
export async function getChecklists(): Promise<ChecklistType[]> {
    const response = await fetch(`${API_URL}/api/checklist`);

    if (!response.ok) {
        throw new Error("Failed to retrieve checklists.");
    }

    return await response.json();
}


// GET checklist by MongoDB ID
export async function getChecklist(
    id: string
): Promise<ChecklistType> {

    const response = await fetch(`${API_URL}/api/checklist/${id}`);

    if (!response.ok) {
        throw new Error("Failed to retrieve checklist.");
    }

    return await response.json();
}


// GET checklist by date
export async function getChecklistByDate(
    date: string
): Promise<ChecklistType> {

    const response = await fetch(
        `${API_URL}/api/checklist/date/${date}`
    );

    if (!response.ok) {
        throw new Error("Failed to retrieve checklist.");
    }

    return await response.json();
}


// CREATE checklist
export async function createChecklist(
    checklist: ChecklistType
): Promise<ChecklistType> {
    console.log("Entered create checklist");

    const response = await fetch(`${API_URL}/api/checklist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(checklist)
    });

    if (!response.ok) {
        throw new Error("Failed to create checklist.");
    }

    return await response.json();
}


// UPDATE checklist
export async function updateChecklist(
    id: string,
    checklist: Partial<ChecklistType>
): Promise<ChecklistType> {

    const response = await fetch(`${API_URL}/api/checklist/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(checklist)
    });

    if (!response.ok) {
        throw new Error("Failed to update checklist.");
    }

    return await response.json();
}


// DELETE checklist
export async function deleteChecklist(
    id: string
): Promise<void> {

    const response = await fetch(`${API_URL}/api/checklist/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete checklist.");
    }
}