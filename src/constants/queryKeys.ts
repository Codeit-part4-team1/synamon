export const queryKey = {
  usersMe: ["usersMe"],
  activity: ["activity"],
  reservation: (activitiesId: number, year: number, month: string) => [
    "activities",
    activitiesId,
    year,
    month
  ],
  myActivities: ["myActivities"]
};
