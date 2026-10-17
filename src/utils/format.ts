// "2026-10-16T00:00:00.000000Z" -> "2026-10-16"
export const onlyDate = (value?: string | null) => (value ?? "").split("T")[0];

// 12 -> "12.00"
export const money = (value?: string | number | null) =>
  Number(value ?? 0).toFixed(2);

// Local date "YYYY-MM-DD"
export const todayLocal = () => new Date().toLocaleDateString("en-CA");

// "2026-10-17T09:30:00.000000Z" / "2026-10-17 09:30:00" -> "2026-10-17T09:30" (datetime-local input-er jonno)
export const toInputDateTime = (value?: string | null) =>
  value ? value.replace(" ", "T").slice(0, 16) : "";

// "2026-10-17T09:30:00" -> "2026-10-17 09:30" (dekhanor jonno)
export const formatDateTime = (value?: string | null) =>
  value ? value.replace("T", " ").slice(0, 16) : "";

// ekhonkar local date-time, datetime-local input-er format-e
export const nowLocalInput = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};
