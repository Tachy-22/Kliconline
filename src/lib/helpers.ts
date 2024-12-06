"use server";
import { fetchCollection } from "@/actions/fettchCollection";

function getCurrentTimestamp() {
  return new Date();
}

export async function getPendingTestimoniesCount() {
  const result = await fetchCollection("testimonies", {
    whereClause: [["approved", "==", false]],
  });

  return "items" in result ? result.count : 0;
}

export async function getPendingMessagesCount() {
  const result = await fetchCollection("contact-messages", {
    whereClause: [["replied", "==", false]],
  });

  return "items" in result ? result.count : 0;
}

export async function getPostsCount() {
  const result = await fetchCollection("blogs");
  return "items" in result ? result.count : 0;
}

export async function getEventsCount() {
  const currentDate = getCurrentTimestamp();
  currentDate.setHours(0, 0, 0, 0); // Set to start of day

  const result = await fetchCollection("events", {
    whereClause: [["date", ">=", currentDate as unknown as string]],
  });
  return "items" in result ? result.count : 0;
}

export async function getDashboardStats() {
  const [posts, events, messages, testimonies] = await Promise.all([
    getPostsCount(),
    getEventsCount(),
    getPendingMessagesCount(),
    getPendingTestimoniesCount(),
  ]);

  return { posts, events, messages, testimonies };
}

export async function getNearestBranch(
  lat: number,
  lng: number,
  branches: BranchT[]
) {
  // Calculate distances and find nearest branch
  return branches.reduce(
    (nearest, branch) => {
      const distance = calculateDistance(
        lat,
        lng,
        branch.latitude,
        branch.longitude
      );
      return distance < nearest.distance ? { branch, distance } : nearest;
    },
    { branch: branches[0], distance: Infinity }
  ).branch;
}

export async function getAllBranches() {
  const result = await fetchCollection<BranchT>("branches");
  if ("items" in result) {
    return result.items;
  }
  throw new Error(result.message);
}

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Haversine formula implementation
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number) {
  return deg * (Math.PI / 180);
}
