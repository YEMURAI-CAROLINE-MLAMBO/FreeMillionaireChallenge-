import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format date to readable string
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

// Calculate time remaining until target date
export function calculateTimeRemaining(targetDate: string | Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  // Return all zeros if the date has passed
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

// Convert status to proper case with first letter capitalized
export function formatStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Determine text color based on background for better contrast
export function getContrastTextColor(hexColor: string): "white" | "black" {
  // Remove # if present
  const color = hexColor.replace("#", "");
  
  // Convert to RGB
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? "black" : "white";
}

// Get status color for badges and indicators
export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "approved":
      return "bg-success/10 text-success";
    case "pending":
      return "bg-warning/10 text-warning";
    case "rejected":
      return "bg-destructive/10 text-destructive";
    case "completed":
      return "bg-success/10 text-success";
    default:
      return "bg-muted/10 text-muted-foreground";
  }
}

// Convert category ID to display name
export function getCategoryName(category: string): string {
  const categories: Record<string, string> = {
    design: "Design Services",
    crypto: "Cryptocurrency",
    business: "Business Services",
    technology: "Technology",
    education: "Education",
  };
  
  return categories[category] || category;
}
