export interface StreakResult {
  currentStreak: number;
  longestStreak: number;
  lastUpdateDate: Date | null;
}

/**
 * Pure streak engine that calculates active & longest streak from log timestamps.
 * Automatically resets currentStreak to 0 if 1 or more days were missed.
 */
export function calculateStreak(dates: Date[]): StreakResult {
  if (!dates || dates.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastUpdateDate: null };
  }

  // Sort dates ascending (oldest to newest)
  const sortedDates = [...dates].sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Deduplicate dates into unique "YYYY-MM-DD" local date strings
  const uniqueDateStrings = Array.from(
    new Set(
      sortedDates.map((d) => {
        const dateObj = new Date(d);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      })
    )
  );

  const totalDays = uniqueDateStrings.length;
  if (totalDays === 0) {
    return { currentStreak: 0, longestStreak: 0, lastUpdateDate: null };
  }

  // Calculate longest streak across entire history
  let longestStreak = 1;
  let tempStreak = 1;

  for (let i = 1; i < totalDays; i++) {
    const prevDate = new Date(uniqueDateStrings[i - 1]);
    const currDate = new Date(uniqueDateStrings[i]);
    const diffInDays = Math.round(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 1) {
      tempStreak++;
    } else {
      tempStreak = 1;
    }

    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
  }

  // Check current streak relative to today
  const lastDateStr = uniqueDateStrings[totalDays - 1];
  const lastDate = new Date(lastDateStr);

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const todayDate = new Date(todayStr);

  const daysSinceLastUpdate = Math.round(
    (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let currentStreak = 0;
  if (daysSinceLastUpdate <= 1) {
    // Updated today (0) or yesterday (1) -> Streak is active!
    currentStreak = tempStreak;
  } else {
    // 1+ days missed (2+ days since last update) -> Streak reset to 0
    currentStreak = 0;
  }

  return {
    currentStreak,
    longestStreak,
    lastUpdateDate: new Date(sortedDates[sortedDates.length - 1]),
  };
}