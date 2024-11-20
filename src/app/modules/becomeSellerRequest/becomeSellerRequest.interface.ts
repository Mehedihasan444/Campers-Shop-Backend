export const becomeSellerRequestStatus = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REJECTED: "REJECTED",
  CANCELED: "CANCELED",
} as const;
export type TBecomeSellerRequest = {
  name: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  status?: keyof typeof becomeSellerRequestStatus;
  rejectionReason?: string;
  isDeleted?: boolean;
};
