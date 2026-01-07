/**
 * Formats a date string to US format (Month Day, Year)
 * Handles invalid dates gracefully
 * 
 * @param dateString - Date string from database (can be ISO string, timestamp, etc.)
 * @param fallbackDate - Optional fallback date string if primary date is invalid
 * @returns Formatted date string in US format (e.g., "January 15, 2024") or "Date not available" if date is invalid
 */
export function formatDateUS(dateString: string | null | undefined, fallbackDate?: string | null): string {
  // Try primary date first
  let dateToFormat = dateString;
  
  // If primary date is invalid, try fallback
  if (!dateToFormat || dateToFormat.trim() === '') {
    dateToFormat = fallbackDate || null;
  }

  if (!dateToFormat || dateToFormat.trim() === '') {
    return "Date not available";
  }

  try {
    const date = new Date(dateToFormat);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // If primary date failed, try fallback
      if (fallbackDate && dateString !== fallbackDate) {
        try {
          const fallbackDateObj = new Date(fallbackDate);
          if (!isNaN(fallbackDateObj.getTime())) {
            return fallbackDateObj.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
          }
        } catch (e) {
          // Fallback also failed
        }
      }
      console.warn('Invalid date string:', dateToFormat);
      return "Date not available";
    }

    // Format in US format: "Month Day, Year"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', error, 'Date string:', dateToFormat);
    return "Date not available";
  }
}

/**
 * Formats a date string to short US format (MM/DD/YYYY)
 * 
 * @param dateString - Date string from database
 * @returns Formatted date string in short US format (e.g., "01/15/2024")
 */
export function formatDateUSShort(dateString: string | null | undefined): string {
  if (!dateString) {
    return "N/A";
  }

  try {
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) {
      return "N/A";
    }

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return "N/A";
  }
}

