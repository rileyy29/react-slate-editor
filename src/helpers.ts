import { CustomElement, ElementType } from "./types";

/**
 * Determine whether the default Slate Element is one of our Custom Controlled Elements.
 * @param element 
 * @param type 
 * @returns 
 */
export function isCustomElement(element: CustomElement, type: ElementType): boolean {
    return element?.type === type;
}

/**
 * Parse a JSON string to editor content.
 * @param json 
 * @returns 
 */
export function loadContentFromJSON(json: string) {
    return JSON.parse(json);
}

/**
 * Save editor content to a JSON string.
 * @param value 
 * @returns 
 */
export function saveContentAsJSON(value: any) {
    return JSON.stringify(value);
}