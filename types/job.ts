export interface Job {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;

  status:
    | "OPEN"
    | "IN_PROGRESS"
    | "DONE"
    | "CLOSED";

  user: string;

  bookedBy?: string | null;

  createdAt?: string;
  updatedAt?: string;
}